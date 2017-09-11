import React from 'react';
export default class RequestCard extends React.Component {
  onCrossClicked = (e) => {
    this.props.onCrossClicked( this.props.data);
  };
  render = () => {
    let bg_colour;
    switch( this.props.data.status){
      case 'accepted':
        bg_colour = "lightgreen";
        break;
      case 'rejected':
        bg_colour = "tomato";
        break;
      default:
        bg_colour = "linen";
        break;
    }
    const wrapper = {
      position: "relative",
      width: "20em",
      backgroundColor: bg_colour,
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
    const cross_mark = String.fromCharCode( 10008);
    return (
      <div style={wrapper}>
        {this.props.text}
        <div style={cross_box} onClick={this.onCrossClicked}>{cross_mark}</div>
      </div>
    );
  };
};
