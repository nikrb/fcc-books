import React from 'react';

export default class RequestToMeCard extends React.Component {
  onCrossClicked = ( e) => {
    this.props.onCrossClicked( this.props.data);
  };
  onTickClicked = (e) => {
    this.props.onTickClicked( this.props.data);
  };
  render = () => {
    const wrapper = {
      position: "relative"
    };
    const cross_box = {
      position: "absolute",
      top: "0px",
      right: "2em"
    };
    const tick_box = {
        position: "absolute",
        top: "0px",
        right: "2em"
    };
    const cross_mark = String.fromCharCode( 10003);
    const tick_mark = String.fromCharCode( 10060);
    return (
      <div style={wrapper}>
        {this.props.data.title}
        <div style={cross_box} onClick={this.onCrossClicked}>{cross_mark}</div>
        <div style={tick_box}>{tick_mark} onClick={this.onTickClicked}</div>
      </div>
    );
  };
};
