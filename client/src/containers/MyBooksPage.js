import React from 'react';
import {BookSearch,BookGrid} from '../components/book';
import BookActions from './BookActions';

export default class MyBooksPage extends React.Component {
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
    const wrapper = {
      margin: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    };
    return (
      <div style={wrapper}>
        <h1>My Books</h1>
        <BookSearch book_title={this.state.book_title}
          onBookTitleChange={this.onBookTitleChange}
          onFindBook={this.onFindBook}/>
        <BookGrid books={this.state.books} onSelectBook={this.onSelectBook}/>
      </div>
    );
  };
}
