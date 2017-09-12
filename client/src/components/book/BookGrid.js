import React from 'react';
import BookCover from './BookCover';

export default class BookGrid extends React.Component {
  render = () => {
    const book_covers = this.props.books.map( (b,i) => {
      return <BookCover key={i} data={b} />;
    });
    const book_grid = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "stretch",
      flexWrap: "wrap"
    };
    return (
      <div style={book_grid}>
        {book_covers}
      </div>
    );
  };
};
