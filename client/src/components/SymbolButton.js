import React from 'react';
export default class SymbolButton extends React.Component {
  state = {
    mouse_over: false
  };
  onClicked = (e) => {
    this.props.onClick();
  };
  onMouseEnter = (e) => {
    this.setState( {mouse_over:true});
  };
  onMouseLeave = (e) => {
    this.setState( {mouse_over:false});
  };
  render = () => {
    const {style} = this.props;
    const sstyle = {...style,
      backgroundColor: this.state.mouse_over?"khaki":"transparent",
      borderRadius: "25%"
    };
    return (
      <div style={sstyle} onClick={this.onClicked}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}>
        {this.props.children}
      </div>
    );
  };
};
