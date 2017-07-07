import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: [],
    query: ''
  }

  componentDidMount = () => {
    BooksAPI.getAll().then(
      books => this.setState({ books: books })
    )
  }

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
    BooksAPI.update(book, newShelf)
    this.removeBook(book)
    book.shelf = newShelf
    this.addBook(book)
  }

  searchBook = (query) => {
    BooksAPI.search(query).then(
      books => this.setState({ searchedBooks: books })
    )
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
                  onChange={e => {
                    this.setState({ query: e.target.value })
                    this.searchBook(this.state.query)
                  }}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ListBooks
                books={this.state.searchedBooks}
                onMoveShelf={this.moveShelf}
              />
            </div>
          </div>
        )}>
        </Route>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ListBooks
                      books={this.state.books.filter(
                        book => book.shelf === 'currentlyReading'
                      )}
                      onMoveShelf={this.moveShelf}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks
                      books={this.state.books.filter(
                        book => book.shelf === 'wantToRead'
                      )}
                      onMoveShelf={this.moveShelf}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks
                      books={this.state.books.filter(
                        book => book.shelf === 'read'
                      )}
                      onMoveShelf={this.moveShelf}
                    />
                  </div>
                </div>
              </div>
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
