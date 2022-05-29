import { Rating } from "@mui/lab";
import React from "react";
import profilePng from "../../Imgs/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <div className="left">
        <div className="img">
          <img src={profilePng} width="100" alt="User" />
        </div>
        <p>{review.name}</p>
        <Rating {...options} />
      </div>
      <div className="right">
        <span className="reviewCardComment">  <q>{review.comment}</q> </span>
      </div>
    </div>
  );
};

export default ReviewCard;
