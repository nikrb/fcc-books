import React from 'react';
import BookActions from './BookActions';
import BookCover from '../components/BookCover';

export default class BookPage extends React.Component {
  state = {
    books: [],
    book_title: ""
  };
  onBookTitleChange = (e) => {
    this.setState( {book_title: e.target.value});
  };
  onFindBook = (e) => {
    BookActions.findBook( {title: this.state.book_title})
    .then( (response) => {
      this.setState( {books: [...this.state.books, ...response]});
    });
  };
  onSelectBook = (book) => {
    console.log( "book cover selected:", book);
  };
  render = () => {
    console.log( "book response:", this.state.books);
    const book_covers = this.state.books.map( (b,i) => {
      return <BookCover key={i} data={b} onSelectBook={this.onSelectBook}/>;
    });
    return (
      <div>
        <h1>Find Books</h1>
        <div>
          <input type="text" value={this.state.book_title}
            onChange={this.onBookTitleChange}/>
          <button type="button" onClick={this.onFindBook} >Find</button>
        </div>
        <div>
          {book_covers}
        </div>
      </div>
    );
  };
}
