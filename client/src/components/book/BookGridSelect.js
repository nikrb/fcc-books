import React from 'react';
import BookCover from './BookCover';
import BookSelect from './BookSelect';

export default class BookGridSelect extends React.Component {
  onSelectButton = (e, book) => {
    this.props.onSelectBook( e, book);
  };
  render = () => {
    const book_covers = this.props.books.map( (b,i) => {
      return (
        <BookCover key={i} data={b}>
          <BookSelect onClick={this.onSelectButton} data={b} >{this.props.children}</BookSelect>
        </BookCover>
      );
    });
    const book_grid = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      flex: "0 0 100%"
    };
    return (
      <div style={book_grid}>
        {book_covers}
      </div>
    );
  };
};
