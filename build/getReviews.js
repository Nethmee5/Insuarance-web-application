const axios = require("axios");
const get = require("lodash/get");

const reviewUrl = (id) =>
  `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=AIzaSyB8rQrTnRDRUOhQjlf5F8Y-Ph_94Sttc1U`;

const getReviews = async (id) => {
  const reviews = await axios
    .get(reviewUrl(id))
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      return {};
    });

  return {
    rating: get(reviews, "result.rating", ""),
    items: get(reviews, "result.reviews", []),
    total: get(reviews, "result.user_ratings_total", ""),
    url: get(reviews, "result.url", ""),
    placeId: get(reviews, "result.place_id", ""),
  };
};

module.exports = getReviews;
