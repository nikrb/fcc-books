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
    requests: [],
    show_my_requests: false,
    show_requests_to_me: false,
    limit: 6,
    current_page_no: 0,
    total_rows: 0
  };
  componentWillMount = () => {
    TradeActions.getMyRequests( {_id:Auth.get_id()})
    .then( (requests) => {
      console.log( "get my requests:", requests);
      this.setState( {requests});
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
    const trade = { source_user: Auth.get_id(), target_user: book.owner._id,
      book:book._id, status:"requested"};
    TradeActions.saveTrade( trade)
    .then( (response) => {
      console.log( "save trade response:", response);
      this.setState( {requests: this.state.requests.concat( response)});
    });
  };

  onCancelTrade = ( trade) => {
    if( trade.source_user._id === Auth.get_id()){
      trade.status = "cancelled";
    } else {
      trade.status = "rejected";
    }
    this.saveTrade( trade)
    .then( (response) => {
      console.log( "save trade response:", response);
      const requests = this.state.requests.filter( t => t._id !== response._id);
      this.setState( { requests});
    });
  };
  onAcceptTrade = ( trade) => {
    trade.status = "accepted";
    this.saveTrade( trade)
    .then( (response) => {
      console.log( "accept trade response:", response);
    });
  };
  saveTrade = (trade) => {
    // FIXME: do we need to use the _id or can we just pass the whole object?
    return TradeActions.saveTrade( trade);
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
    const {show_my_requests,show_requests_to_me} = this.state;
    const my_requests_style = {
      display: show_my_requests?"block":"none",
      margin: "0 auto 1em"
    };
    const requests_to_me_style = {
      display: show_requests_to_me?"block":"none",
      margin: "0 auto 1em"
    };
    const my_id = Auth.get_id();
    const my_requests = this.state.requests
      .filter(r => r.source_user._id === my_id && r.status !== "cancelled")
      .map( (r, i) => {
        return <RequestCard key={i} data={r} text={r.book.title}
          onCrossClicked={this.onCancelTrade} />;
      });
    const requests_to_me = this.state.requests
      .filter( r => r.target_user._id === my_id && r.status !== "cancelled")
      .map( (r, i) => {
        return (<RequestToMeCard key={i} data={r} text={r.book.title}
          onCrossClicked={this.onCancelTrade}
          onTickClicked={this.onAcceptTrade}
          />
        );
      });
    const request_wrapper = {
      display: "flex",
      flexDirection: "row",
      margin: "0px auto 1em"
    };
    const btn = {
      fontSize: "1em"
    };
    const up_arrow = String.fromCharCode( 9650);
    const down_arrow = String.fromCharCode( 9660);
    return (
      <div className="App">
        <h1>Trade</h1>
        <div style={request_wrapper}>
          <button type="button" style={btn} onClick={this.onMyTradeRequestsClicked}>
            My Trade Requests {show_my_requests?down_arrow:up_arrow}
          </button>
          <button type="button" style={btn} onClick={this.onTradeRequestsToMeClicked}>
            Trade Requests to me {show_requests_to_me?down_arrow:up_arrow}
          </button>
        </div>
        <div style={my_requests_style}>
          {my_requests.length?my_requests:"No Requests"}
        </div>
        <div style={requests_to_me_style} >
          {requests_to_me.length?requests_to_me:"No Requests"}
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
