import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

class BookShelves extends Component {
  static propTypes = {
    onMoveShelf: PropTypes.func.isRequired
  }

  state = {
    shelves: ['currentlyReading', 'wantToRead', 'read'],
  }

  render () {
    const { shelves } = this.state
    const { books, onMoveShelf } = this.props

    return (
      <div>
        {shelves.map(shelf => (
          <div key={shelf} className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <div className="bookshelf-books">
              <ListBooks
                books={books.filter(
                  book => book.shelf === shelf
                )}
                onMoveShelf={onMoveShelf}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default BookShelves
