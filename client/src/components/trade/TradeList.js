import React from 'react';
import RequestCard from './RequestCard';
import RequestToMeCard from './RequestToMeCard';

export default class TradeList extends React.Component {
  state = {
    show_my_requests: false,
    show_requests_to_me: false
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
    const {my_id, requests} = this.props;
    const my_requests_style = {
      display: show_my_requests?"block":"none",
      margin: "0 auto 1em"
    };
    const requests_to_me_style = {
      display: show_requests_to_me?"block":"none",
      margin: "0 auto 1em"
    };
    let my_highlight = false;
    let to_me_highlight = false;
    const my_requests = requests
      .filter(r => r.source_user._id === my_id && r.status !== "cancelled")
      .map( (r, i) => {
        if( r.status === "requested") my_highlight = true;
        return <RequestCard key={i} data={r} text={r.book.title}
          onCrossClicked={this.props.onCancelTrade}
          highlight={r.status==='requested'} />;
      });
    const requests_to_me = requests
      .filter( r => r.target_user._id === my_id && r.status !== "cancelled")
      .map( (r, i) => {
        if( r.status === "requested") to_me_highlight = true;
        return (<RequestToMeCard key={i} data={r} text={r.book.title}
          onCrossClicked={this.props.onCancelTrade}
          onTickClicked={this.props.onAcceptTrade}
          highlight={r.status==="requested"}/>
        );
      });
    const wrapper = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    };
    const request_wrapper = {
      display: "flex",
      flexDirection: "row",
      margin: "0px auto 1em"
    };
    const btn = { fontSize: "1em" };
    const highlight_style = { color: "red"};
    const up_arrow = String.fromCharCode( 9650);
    const down_arrow = String.fromCharCode( 9660);
    return (
      <div style={wrapper}>
        <div style={request_wrapper}>
          <button type="button" style={btn} onClick={this.onMyTradeRequestsClicked}>
            {my_highlight? <span style={highlight_style}> * </span>:null }
            My Trade Requests {show_my_requests?down_arrow:up_arrow}
          </button>
          <button type="button" style={btn} onClick={this.onTradeRequestsToMeClicked}>
            {to_me_highlight? <span style={highlight_style}> * </span>:null}
            Trade Requests to me {show_requests_to_me?down_arrow:up_arrow}
          </button>
        </div>
        <div style={my_requests_style}>
          {my_requests.length?my_requests:"No Requests"}
        </div>
        <div style={requests_to_me_style} >
          {requests_to_me.length?requests_to_me:"No Requests"}
        </div>
      </div>
    );
  };
};
