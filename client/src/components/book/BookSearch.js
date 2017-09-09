import React from 'react';

export default class BookSearch extends React.Component {
  render = () => {
    return (
      <div>
        <input type="text" value={this.props.book_title}
          onChange={this.props.onBookTitleChange}/>
        <button type="button" onClick={this.props.onFindBook} >Find</button>
      </div>
    );
  };
}
