import React from 'react';
import Auth from '../modules/Auth';
import {BookGridSelect} from '../components/book';
import BookActions from './BookActions';
import TradeActions from './TradeActions';
import {RequestCard,RequestToMeCard} from '../components/trade';
import Pager from '../components/Pager';
import loader from '../images/loader.gif';

export default class TradePage extends React.Component {
  state = {
    books: [],
    my_requests: [],
    requests_to_me: [],
    show_my_requests: false,
    show_requests_to_me: false,
    limit: 3,
    current_page_no: 0,
    total_rows: 0
  };
  componentWillMount = () => {
    TradeActions.getMyRequests( {email:Auth.getEmail()})
    .then( (response) => {
      console.log( "get my requests:", response);
      const requests = response.reduce((acc, trade) => {
        if( trade.source_user.email === Auth.getEmail()){
          acc.my_requests.push( trade);
        }
        // FIXME: testing
        if( trade.target_user.email === Auth.getEmail()) {
          acc.requests_to_me.push( trade);
        }
        return acc;
      }, {my_requests:[],requests_to_me:[]});
      this.setState( {...requests});
    });
    this.getPagedBooks(0);
  };
  getPagedBooks = ( page_no) => {
    const {limit} = this.state;
    BookActions.getBooks( {offset:page_no*limit, limit})
    .then( (response) => {
      console.log( "get paged books response:", response);
      const {total_rows} = response;
      let books = response.books || [];
      this.setState( {current_page_no:page_no, books, total_rows:total_rows});
    })
    .catch( (err) => {
      console.error( "get paged books failed:", err);
    });
  };
  handlePageSelected = ( page_no) => {
    this.getPagedBooks( page_no);
  };
  // create a trade request
  onSelectBook = (book) => {
    console.log( "book selected for trade:", book);
    const me = {email: Auth.getEmail(), name: Auth.getUsername(), full_name:Auth.getFullName()};
    const trade = { source_user: me, target_user: book.owner, book, status:"requested"};
    TradeActions.saveTrade( trade)
    .then( (response) => {
      console.log( "save trade response:", response);
    });
  };
  onCancelTrade = ( trade) => {
    trade.status = "cancelled";
    this.saveTrade( trade);
  };
  onAcceptTrade = ( trade) => {
    trade.status = "accepted";
    this.saveTrade( trade);
  };
  saveTrade = (trade) => {
    TradeActions.saveTrade( trade)
    .then( (response) => {
      console.log( "cancel trade response:", response);
    });
  };
  onMyTradeRequestsClicked = (e) => {
    const {show_my_requests} = this.state;
    this.setState( {show_my_requests:!show_my_requests, show_requests_to_me:false});
  };
  onTradeRequestsToMeClicked = (e) => {
    const {show_requests_to_me} = this.state;
    this.setState( {show_my_requests:false, show_requests_to_me: !show_requests_to_me});
  };
  render = () => {
    const my_requests_style = {
      display: this.state.show_my_requests?"block":"none"
    };
    const requests_to_me_style = {
      display: this.state.show_requests_to_me?"block":"none"
    };
    const my_requests = this.state.my_requests.map( (mr, i) => {
      return <RequestCard key={i} data={mr} text={mr.book.title}
        onCrossClicked={this.onCancelTrade} />;
    });
    const requests_to_me = this.state.requests_to_me.map( (rtm, i) => {
      return (<RequestToMeCard key={i} data={rtm} text={rtm.book.title}
        onCrossClicked={this.onCancelTrade}
        onTickClicked={this.onAcceptTrade}
        />
      );
    });
    const request_wrapper = {
      display: "flex",
      flexDirection: "row",
      margin: "0px auto 2em"
    };
    console.log( "requests to me count:", requests_to_me_style);
    return (
      <div className="App">
        <h1>Trade</h1>
        <div style={request_wrapper}>
          <button type="button" onClick={this.onMyTradeRequestsClicked}>
            My Trade Requests
          </button>
          <button type="button" onClick={this.onTradeRequestsToMeClicked}>
            Trade Requests to me
          </button>
        </div>
        <div style={my_requests_style}>
          {my_requests}
        </div>
        <div style={requests_to_me_style} >
          {requests_to_me}
        </div>

        {this.state.total_rows?
          this.state.is_loading?
            <img src={loader} alt="" />
            :
            <Pager handlePageSelect={this.handlePageSelected} page_no={this.state.current_page_no}
              total_rows={this.state.total_rows} display_count={this.state.limit} />
          :null
        }
        <BookGridSelect books={this.state.books} onSelectBook={this.onSelectBook} >
          Trade
        </BookGridSelect>
        {this.state.total_rows?
          this.state.is_loading?
            <img src={loader} alt="" />
            :
            <Pager handlePageSelect={this.handlePageSelected} page_no={this.state.current_page_no}
              total_rows={this.state.total_rows} display_count={this.state.limit} />
          :null
        }
      </div>
    );
  };
}
