import React from 'react';

export default class BookSearch extends React.Component {
  onFocus = (e) => {
    e.target.select();
  };
  render = () => {
    return (
      <div>
        Title&nbsp;
        <input type="text" value={this.props.book_title}
          name="book_title" placeholder="Search text ..."
          onChange={this.props.onBookChange}
          onFocus={this.onFocus} />
        Author&nbsp;
        <input type="text" value={this.props.book_author}
          name="book_author" placeholder="Search text ..."
          onChange={this.props.onBookChange}
          onFocus={this.onFocus} />
        <button type="button" onClick={this.props.onFindBook}
          disabled={this.props.disabled} >Find</button>
        <button type="button" onClick={this.props.onClear} >Clear</button>
      </div>
    );
  };
}
