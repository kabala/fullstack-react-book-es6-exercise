import React, { Component } from 'react'

class Product extends Component {

  constructor ( props ) {
    super( props )

    //this.handleVote = ::this.handleVote
    this.upVote = ::this.upVote
    this.downVote = ::this.downVote
  }

  handleVote = ( calc ) => {
    this.props.onVote( this.props.id, calc )
  }

  upVote () {
    this.handleVote( '+' )
  }

  downVote () {
    this.handleVote( '-' )
  }

  render () {
    const thumbnail = require( '../../static/img/' + this.props.product_image_url )
    const avatar = require( '../../static/img/' + this.props.submitter_avatar_url )
    let description = this.props.description
    if ( description.length > 100 ) description = description.substring( 0, 100 ).concat( '...' )
    const changeFlag = this.props.changeFlag == true ? 'change-anim' : ''

    return (
      <div className="column card">
        <div className={'cardInner ' + changeFlag}>
          <div className="thumbnail">
            <img src={thumbnail} />
          </div>
          <div className="middle aligned content">
            <div className="votes">
              <i onClick={this.upVote} className="zmdi zmdi-hc-2x zmdi-caret-up"></i>
              <span className="vote">{this.props.votes}</span>
              <i onClick={this.downVote} className="zmdi zmdi-hc-2x zmdi-caret-down"></i>
            </div>
            <div className="description">
              <a href={this.props.url}>
                {this.props.title}
              </a>
              <p>{description}</p>
            </div>
            <div className="extra">
              <span>Submitted by:</span>
              <img
              className="avatar"
              src={avatar}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Product
