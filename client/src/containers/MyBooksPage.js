import React from 'react';
import {BookSearch,BookGrid,BookGridSelect} from '../components/book';
import BookActions from './BookActions';
import Loader from '../images/loader.gif';

export default class MyBooksPage extends React.Component {
  state = {
    my_books: [],
    // books returned from open library search
    books: [],
    book_title: "",
    is_loading: false
  };
  onBookTitleChange = (e) => {
    this.setState( {book_title: e.target.value});
  };
  onFindBook = (e) => {
    this.setState( {is_loading: true});
    BookActions.findBook( {title: this.state.book_title})
    .then( (response) => {
      this.setState( {books: [...response], is_loading:false});
    });
  };
  onSelectBook = (book) => {
    console.log( "book cover selected:", book);
    const my_books = [...this.state.my_books, book];
    this.setState( {my_books, books:[]});
  };
  render = () => {
    const wrapper = {
      margin: "10px",
      display: "flex",
      flexDirection: "column",

      alignItems: "center"
    };
    return (
      <div style={wrapper}>
        <h1>My Books</h1>
        <BookSearch book_title={this.state.book_title}
          onBookTitleChange={this.onBookTitleChange}
          onFindBook={this.onFindBook}/>
        {this.state.is_loading?
          <p><img src={Loader} alt="Please wait ...." /></p>
          :this.state.books.length?
            <BookGridSelect books={this.state.books} onSelectBook={this.onSelectBook}/>
            :<p>No Results</p>
        }
        <BookGrid books={this.state.my_books} />
      </div>
    );
  };
}