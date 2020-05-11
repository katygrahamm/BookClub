import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import * as actions from '../actions';


class BookCarousel extends Component {
    constructor(props) {
        super(props)

    } 

    componentDidMount(){
        this.props.getCarouselBooks()
    }

    render () {
      if(this.props.books === undefined) {
        return (
          <div>
            Loading...
          </div> 
        )
      } else {
          const settings = {
            infinite: true,
            slidesToShow: 4,
            autoplay: true,
            slidesToScroll: 1,
            speed: 2000,
            arrows: false,
            autoplaySpeed: 2000,
            cssEase: "linear"
          }

          return (      
            <div className="background">
                <Slider {...settings} className="carousel-background">
                {
                this.props.books.map(book => (
                      <div key={book.rank}>
                         <img className="book-image" alt="image" src={book.book_image} />
                      </div>
                  ))
                }
                </Slider>
            </div>
      )
    }
  }
}

  function mapStateToProps(state) {
    return ({
      books: state.books
    })
  }
  
  export default connect(
    mapStateToProps, 
    actions
  )(BookCarousel);