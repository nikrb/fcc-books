import React from 'react';
import Auth from '../modules/Auth';
import {BookGridSelect} from '../components/book';
import BookActions from './BookActions';
import TradeActions from './TradeActions';
import {TradeList} from '../components/trade';
import Pager from '../components/Pager';

export default class TradePage extends React.Component {
  state = {
    books: [],
    requests: [],
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
    BookActions.getBooks( {offset:page_no*limit, limit, owner: Auth.get_id()})
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
  onSelectBook = (e, book) => {
    console.log( "book selected for trade:", book);
    e.target.disabled = true;
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
      const requests = this.state.requests.map( (r) => {
        if( r._id === trade._id){
          return trade;
        }
        return r;
      });
      this.setState( {requests});
    });
  };
  saveTrade = (trade) => {
    return TradeActions.saveTrade( trade);
  };
  render = () => {
    return (
      <div className="App">
        <h1>Trade</h1>
        <TradeList my_id={Auth.get_id()} requests={this.state.requests} />

        <Pager handlePageSelect={this.handlePageSelected} page_no={this.state.current_page_no}
          total_rows={this.state.total_rows} display_count={this.state.limit}
          is_loading={this.state.is_loading} />
        <BookGridSelect books={this.state.books} onSelectBook={this.onSelectBook} >
          Trade
        </BookGridSelect>
        <Pager handlePageSelect={this.handlePageSelected} page_no={this.state.current_page_no}
          total_rows={this.state.total_rows} display_count={this.state.limit}
          is_loading={this.state.is_loading} />
      </div>
    );
  };
}
