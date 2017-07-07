import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelves from './BookShelves'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  // Get all the books which belong to shelves
  getBooks = () => (
    BooksAPI.getAll().then(
      books => this.setState({ books: books })
    )
  )

  componentDidMount = () => this.getBooks()

  addBook = (book) => (
    this.setState(
      state => ({ books: state.books.concat([ book ]) })
    )
  )

  removeBook = (book) => (
    this.setState(
      state => ({ books: state.books.filter(b => b.id !== book.id) })
    )
  )

  moveShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(() => this.getBooks())
    // BooksAPI.update(book, newShelf)
    // this.removeBook(book)
    // book.shelf = newShelf
    // this.addBook(book)
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBook onMoveShelf={this.moveShelf} />
        )}>
        </Route>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <BookShelves
                books={this.state.books}
                onMoveShelf={this.moveShelf}
              />
            </div>

            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp
