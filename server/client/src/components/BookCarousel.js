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

    sliders() {
      if(this.props.books === undefined) {
        return (
          <div>
            Loading...
          </div> 
        )
      } else {
      return this.props.books.map(book => {
          return (
              <div key={book.rank}>
                  <img alt="image" src={book.book_image} />
              </div>
          )
        });
      }
    }

    render () {
          const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3
          }

          return (      
            <div >
                <Slider {...settings}>
                    {this.sliders()}
                </Slider>
            </div>
      )
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