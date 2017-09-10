import React from 'react';
import {BookSearch,BookGrid,BookGridSelect} from '../components/book';
import BookActions from './BookActions';
import Auth from '../modules/Auth';
import Loader from '../images/loader.gif';

export default class MyBooksPage extends React.Component {
  state = {
    my_books: [],
    // books returned from open library search
    books: [],
    book_title: "",
    is_loading: false,
    is_first_time: true
  };
  componentWillMount = () => {
    BookActions.getMyBooks()
    .then( (response) => {
      if( response.success){
        this.setState( {my_books: response.books, is_first_time:false});
      } else {
        console.error( "get my books failed:", response);
      }
    });
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
    const owner = {
      email: Auth.getEmail(),
      name: Auth.getUsername(),
      full_name: Auth.getFullName()
    };
    BookActions.addBook( {...book, owner})
    .then( (res) => {
      console.log( "add book response:", res);
    });
    this.setState( {my_books, books:[]});
  };
  onClearSearch = () => {
    this.setState( {books: [], is_loading:false});
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
          onFindBook={this.onFindBook}
          onClear={this.onClearSearch}
          disabled={this.state.is_loading}/>
        {this.state.is_loading?
          <p><img src={Loader} alt="Please wait ...." /></p>
          :<BookGridSelect books={this.state.books} onSelectBook={this.onSelectBook}/>
        }
        { // only show my books if I have books and not currently searching
          this.state.my_books.length && this.state.books.length === 0?
          <BookGrid books={this.state.my_books} />
          :null
        }
      </div>
    );
  };
}
