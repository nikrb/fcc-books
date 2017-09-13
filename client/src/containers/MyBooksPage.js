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
    // our search texts
    search_book: {
      book_title: "",
      book_author: ""
    },
    is_loading: false
  };
  componentWillMount = () => {
    BookActions.getMyBooks( )
    .then( (response) => {
      if( response.success){
        console.log( "get my books response:", response);
        this.setState( {my_books: response.books});
      } else {
        console.error( "get my books failed:", response);
      }
    });
  };
  onBookChange = (e) => {
    const {name,value} = e.target;
    const {search_book} = this.state;
    search_book[name] = value;
    this.setState( {search_book});
  };
  onFindBook = (e) => {
    this.setState( {is_loading: true});
    const {book_title,book_author} = this.state.search_book;
    const payload = {};
    if( book_title) payload.title = book_title;
    if( book_author) payload.author = book_author;
    BookActions.findBook( payload)
    .then( (response) => {
      this.setState( {books: [...response], is_loading:false});
    });
  };
  onSelectBook = (e, book) => {
    console.log( "book cover selected:", book);
    const my_books = [...this.state.my_books, book];
    const owner = Auth.get_id();
    BookActions.addBook( {...book, owner})
    .then( (res) => {
      console.log( "add book response:", res);
    });
    // clear the find book list
    this.setState( {my_books, books:[]});
  };
  onClearSearch = () => {
    this.setState( {books: [], is_loading:false});
  };
  render = () => {
    return (
      <div className="App">
        <h1>My Books</h1>
        <BookSearch book_title={this.state.search_book.book_title}
          book_author={this.state.search_book.book_author}
          onBookChange={this.onBookChange}
          onFindBook={this.onFindBook}
          onClear={this.onClearSearch}
          disabled={this.state.is_loading}/>
        {this.state.is_loading?
          <p><img src={Loader} alt="Please wait ...." /></p>
          : <BookGridSelect books={this.state.books} onSelectBook={this.onSelectBook}>
              Add Book
            </BookGridSelect>
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
