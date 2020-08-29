import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import ReviewRatings from './reviewRatings.jsx';
import UserReviews from './individualReviews.jsx';
import styled from 'styled-components';
import Modal from 'react-modal';
import ModalApp from './modal.jsx';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif']
  }
});

const Button = styled.button `
  margin: 5px;
  cursor: pointer;
  text-align: center;
  padding-top: 13px !important;
  padding-bottom: 13px !important;
  padding-left: 23px !important;
  padding-right: 23px !important;
  line-height: 20px !important;
  font-weight: 600 !important;
  border: 1px solid black;
  border-radius: 8px;
  background: white;
  font-size: 16px;
`;

const TotalReviews = styled.h2`
  font-weight: 600;
  padding: 10px;
`;

const NormalView = styled.div`
  column-count: 2;
  font-size: 16px;
`;

const NormalViewUsers = styled.div`
  column-count: 2;
  font-size: 16px;
  margin-top: 20px;
  height: auto;
`;

const modalStyling = {
  content: {
    maxWidth: '60%',
    position: 'absolute',
    left: '15%',
    borderRadius: '16px',
    padding: '0px',
    margin: '0px',
    fontFamily: 'Roboto'
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)'
  }
};

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: {},
      totalNumber: 0,
      userReviews: [],
      totalAvg: 0,
      showReviews: false
    };

  }

  componentDidMount() {
    const urlID = window.location.href.split('/')[3];
    this.fetchListingInfo(urlID);
  }

  fetchListingInfo(urlID) {
    //get review rating categories
    $.ajax({
      url: `/api/overall_reviews/${urlID}`,
      method: 'GET',
      success: (reviews) => {
        console.log(reviews);
        this.setState({
          reviews: reviews[0],
          totalNumber: reviews[1],
          totalAvg: reviews[2]
        });
      }
    });
    //get individual reviews
    $.ajax({
      url: `/api/individual_reviews/${urlID}`,
      method: 'GET',
      success: (reviews) => {
        console.log(reviews);
        this.setState({
          userReviews: reviews
        });
      }
    });
  }

  handleClose() {
    this.setState({
      showReviews: false
    });
  }
  handleShow() {
    this.setState({
      showReviews: true
    });
  }

  render() {
    return (
      <div style={{
        fontFamily: 'Roboto'
      }}>
        <div className='review-header'>
          <TotalReviews>
            <div style={{
              display: 'inline-block',
              color: 'red'}}>★</div>{this.state.totalAvg} ({this.state.totalNumber} reviews)
          </TotalReviews>
        </div>
        <NormalView>
          <ReviewRatings reviews={this.state.reviews} />
        </NormalView>
        <NormalViewUsers>
          <UserReviews reviews={this.state.userReviews.slice(0, 6)}/>
        </NormalViewUsers>
        <Modal isOpen={this.state.showReviews} onRequestClose={this.handleClose.bind(this)} style={modalStyling}>
          <ModalApp
            onRequestClose={this.handleClose.bind(this)}
            categoryReviews={this.state.reviews}
            totalAvg={this.state.totalAvg}
            totalReviews={this.state.totalNumber}
            userReviews={this.state.userReviews} />
        </Modal>
        <Button onClick={this.handleShow.bind(this)}>Show all {this.state.totalNumber} reviews</Button>
      </div>
    );
  }
}


ReactDOM.render(<Reviews />, document.getElementById('reviews'));
