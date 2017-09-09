import React from 'react';

export default class BookCover extends React.Component {
  render = () => {
    const book = this.props.data;
    const wrapper = {
      display: "flex",
      flexDirection: "column",
      flexBasis: "170px",
      margin: "5px",
      border: "1px solid lightgrey"
    };
    const text_style = {
      display:"flex",
      flexDirection:"row",
      justifyContent: "center",
      flexWrap: "wrap"
    };
    const image_url = book.cover_olid?book.cover_url_m:"http://via.placeholder.com/180x180?text=noimage";
    return (
      <div style={wrapper}>
        {this.props.children}
        <span style={text_style}>{book.title}</span>
        <img src={image_url} alt='no img' />
      </div>
    );
  };
};
