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
      position: "relative",
      width: "20em",
      backgroundColor: "linen",
      padding: "0.7em",
      borderRadius: "1em"
    };
    const cross_box = {
      cursor: "pointer",
      position: "absolute",
      top: "0.5em",
      right: "0.5em",
      fontSize: "1.2em",
      color: "tomato"
    };
    const tick_box = {
      cursor: "pointer",
      position: "absolute",
      top: "0.5em",
      right: "1.5em",
      fontSize: "1.2em",
      color: "springgreen"
    };
    const tick_mark = String.fromCharCode( 10004);
    const cross_mark = String.fromCharCode( 10008);
    return (
      <div style={wrapper} >
        {this.props.text}
        <div style={cross_box} onClick={this.onCrossClicked}>{cross_mark}</div>
        <div style={tick_box} onClick={this.onTickClicked}>{tick_mark}</div>
      </div>
    );
  };
};
