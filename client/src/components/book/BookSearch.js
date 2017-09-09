import React from 'react';

export default class BookSearch extends React.Component {
  onFocus = (e) => {
    e.target.select();
  };
  render = () => {
    return (
      <div>
        <input type="text" value={this.props.book_title}
          onChange={this.props.onBookTitleChange}
          onFocus={this.onFocus} />
        <button type="button" onClick={this.props.onFindBook}
          disabled={this.props.disabled} >Find</button>
        <button type="button" onClick={this.props.onClear} >Clear</button>
      </div>
    );
  };
}
