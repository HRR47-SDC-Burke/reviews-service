import React from 'react';
import styled from 'styled-components';


const StyledReviewCategory = styled.div`
  display: inline-grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  margin: 5px 50px 10px 10px;
`;

const RatingFiller = styled.img`
  border-radius: 5px;
  height: 5px;
  width: ${props => (props.rating/5) * 100}%;
  margin: -5px;
`;

const RatingBucket = styled.img`
  border-radius: 5px;
  height: 5px;
  width: 100%;
  margin: -5px;
`;

const CategoryName = styled.div`
  margin-right: 50px;
  margin-left: 10px;
  grid-column-start: 1;
  grid-column-end: 2;
`;

const RatingsBar = styled.div`
  display: grid;
`;

const Rating = styled.div`
  margin-left: 10px;
  font-size: 14px;
  font-weight: 600;
`;

const Score = styled.div`
  display: flex;
  width: auto;
  align-items:center;
  grid-column-start: 2;
  grid-column-end: 3;
  justify-content: flex-end;
  margin-right: 30px;
`;


let ReviewCategory = (props) => (
  <StyledReviewCategory evenOrOdd={props.evenOrOdd}>
    <CategoryName>{props.category}</CategoryName>
    <Score>
      <RatingsBar>
        <RatingBucket src={'https://sdc-user-images.s3.us-east-2.amazonaws.com/ratingscontainer.png'}></RatingBucket>
        <RatingFiller rating={props.rating} src={'https://sdc-user-images.s3.us-east-2.amazonaws.com/ratingsbar.png'} ></RatingFiller>
      </RatingsBar>
      <Rating>{props.rating}</Rating>
    </Score>
  </StyledReviewCategory>
);

export default ReviewCategory;