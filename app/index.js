import 'style.scss'

import React, { Component } from 'react'
import { Router, Route,  browserHistory } from 'react-router'
import { render } from 'react-dom'
import Product from './components/product'

// import data
import data from './data'

class ProductList extends Component {
  
  constructor ( props ) {
    super( props )

    this._handleProductVote = ::this._handleProductVote
    this.mapBooks = ::this.mapBooks
    this._updateState = ::this._updateState
    this._changeAnim = ::this._changeAnim

    this.state = {
      books: data.books
    }
  }

  componentDidMount () {
    // add a key named 'flag' to each book element
    this.state.books.forEach( ( el ) => {
      el.flag = false
    } )
    this._updateState()
  }

  _updateState () {
    // reorder state by number of votes
    const books = this.state.books.sort( ( a, b ) => {
      return b.votes - a.votes
    } )
    setTimeout( () => {
      this.setState( { books:books } )
    }, 100 )
  }

  _changeAnim ( data, el, value ) {
      /* sends true/false if the votes of the current clicked book
      are higher than the previous book listed on
      */
      const prev_data = data[ data.indexOf( el ) - 1 ] || data[ 0 ]

      if ( el.votes > prev_data.votes ) {
        el.flag = true
      } else {
        el.flag = false
      }   
  }

  _handleProductVote ( productId, calc ) {
    // update the votes
    const books = this.state.books
    books.forEach( ( el ) => {
      if ( el.id === productId ) {
        if ( calc == '+' ) {       
          el.votes = el.votes + 1
          this._changeAnim( books, el, true )
          return
        } else if ( calc == '-' ) {
          el.votes = el.votes - 1
          this._changeAnim( books, el, false )
          return
        }
      }
    } )
    this._updateState()
  }

  mapBooks ( book ) {
    return (
      <Product
        key={'product_' + book.id}
        id={book.id}
        title={book.title}
        description={book.description}
        url={book.url}
        votes={book.votes}
        submitter_avatar_url={book.submitter_avatar_url}
        product_image_url={book.product_image_url}
        onVote={this._handleProductVote}
        changeFlag={book.flag}
      />
    )
  }

  render () {
    const books = this.state.books
    return (
      <div className="row small-up-1 medium-up-2 large-up-2  mv-20">
        {books.map( this.mapBooks )}
      </div>
    )
  }
}

render(
  (
  <Router >
    <Route path="/">
      <Route path="list" component={ProductList}/>
    </Route>
  </Router>
  ),
  document.getElementById( 'app' )
)
