import React from 'react';

export default class BookCover extends React.Component {
  onSelectButton = (e) => {
    this.props.onSelectBook( this.props.book);
  };
  render = () => {
    console.log( "book cover data:", this.props.data);
    const book = this.props.data;
    const wrapper = {
      display: "flex",
      flexDirection: "column",
      margin: "5px",
      border: "1px solid lightgrey"
    };
    const image_url = book.cover_olid?book.cover_url_m:"http://via.placeholder.com/180x180";
    return (
      <div style={wrapper}>
        <button type="button" onClick={this.onSelectButton} >select</button>
        <img src={image_url} alt='no img' />
      </div>
    );
  };
};
