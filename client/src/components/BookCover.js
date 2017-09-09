import React from 'react';

export default class BookCover extends React.Component {
  onSelectButton = (e) => {
    this.props.onSelectBook( this.props.book);
  };
  render = () => {
    console.log( "book cover data:", this.props.data);
    const book = this.props.data;
    return (
      <div>
        <img src={book.cover_url} alt='no img' />
        <button type="button" onClick={this.onSelectButton} >select</button>
      </div>
    );
  };
};
