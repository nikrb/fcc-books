import React from 'react';
export default class RequestCard extends React.Component {
  onCrossClicked = (e) => {
    this.props.onCrossClicked( this.props.data);
  };
  render = () => {
    const wrapper = {
      position: "relative"
    };
    const cross_box = {
      position: "absolute",
      top: "0px",
      right: "0px"
    };
    const cross_mark = String.fromCharCode( 10003);
    return (
      <div style={wrapper}>
        {this.props.data.title}
        <div style={cross_box} onClick={this.onCrossClicked}>{cross_mark}</div>
      </div>
    );
  };
};
