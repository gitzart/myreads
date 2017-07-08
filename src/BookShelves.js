import React from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

const shelves = ['currentlyReading', 'wantToRead', 'read']

function BookShelves(props) {
  const { books, onMoveShelf } = props

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

BookShelves.propTypes = {
  onMoveShelf: PropTypes.func.isRequired
}

export default BookShelves
