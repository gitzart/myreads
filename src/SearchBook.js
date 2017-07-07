import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class SearchBook extends Component {
  static propTypes = {
    onMoveShelf: PropTypes.func.isRequired
  }

  state = {
    results: []
  }

  clearResults = () => (
    this.setState({ results: [] })
  )

  searchBook = (query) => (
    BooksAPI.search(query).then(
      books => {
        // Result exists and it's not an error
        if (books && (!books.error)) {
          this.setState({ results: books })
        }
      }
    )
  )

  render () {
    const { results } = this.state
    const { onMoveShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
            onClick={this.clearResults}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.searchBook(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks
            books={results}
            onMoveShelf={onMoveShelf}
          />
        </div>
      </div>
    )
  }
}

export default SearchBook
