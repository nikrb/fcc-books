import React from 'react';

export default class BookSelect extends React.Component {
  onClick = (e) => {
    this.props.onClick( e, this.props.data);
  };
  render = () => {
    return (
      <button type="button" onClick={this.onClick} >{this.props.children}</button>
    );
  };
};
