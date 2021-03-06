import React from 'react';

export default class BookCover extends React.Component {
  render = () => {
    const book = this.props.data;
    const wrapper = {
      display: "flex",
      flexDirection: "column",
      flex: "0 1 10%",
      margin: "5px",
      border: "1px solid lightgrey"
    };
    const text_style = {
      textAlign: "center"
    };
    const image_url = book.cover_olid?book.cover_url_m
                          :"http://via.placeholder.com/180x180?text=noimage";
    // FIXME: remove the owner name after testing
    // started book.owner.name for testing, but there is no owner for open library
    // book search
    return (
      <div style={wrapper}>
        {this.props.children}
        <span style={text_style}>{book.title}</span>
        <span style={text_style}>{book.author}</span>
        {book.owner?<span style={text_style}>{book.owner.name}</span>:null}
        <img src={image_url} alt='no img' />
      </div>
    );
  };
};
