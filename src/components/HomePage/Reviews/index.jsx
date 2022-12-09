import React from "react";
import "./index.scss";
import { graphql, useStaticQuery } from "gatsby";
import get from "lodash/get";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { AiFillStar } from "react-icons/ai";
import { PrismicRichText } from "@prismicio/react";
import Google from "../../../images/Icons/Google.svg";
import GoogleWord from "../../../images/Icons/google_word.png";
import reviewsArray from './reviews'

const Reviews = ({ data }) => {
  const handleClick = (e, review) => {
    if (e.currentTarget.textContent == "Read More") {
      e.currentTarget.textContent = "Show Less";
      e.currentTarget.previousElementSibling.textContent = review;
    } else {
      e.currentTarget.textContent = "Read More";
      e.currentTarget.previousElementSibling.textContent = review.substring(
        0,
        80
      );
    }
  };

  const { googleReviews, allPrismicHomePage } = useStaticQuery(graphql`
    query {
      googleReviews {
        url
        total
        rating
        placeId
        items {
          author_name
          author_url
          language
          profile_photo_url
          rating
          relative_time_description
          text
          time
        }
      }
      allPrismicHomePage {
        nodes {
          data {
            google_reviews_section_title {
              richText
            }
          }
        }
      }
    }
  `);

  const titleNode = get(allPrismicHomePage, "nodes", []);
  const titleNodeData = get(titleNode, "[0].data", {});

  // @asitha review url: https://search.google.com/local/writereview?placeid=ChIJo7FLYNNb4joRmIJIhCbS0-E

  // const reviewArray = get(googleReviews, "items", []);
  // const reviewArrayStars = get(googleReviews, "items", []);
  // const reviews = reviewArrayStars.filter(({rating})=> {return rating >= 4})

  return (
    <section className="review-container section-center ch2">
      <article className="review-wrapper">
        <PrismicRichText
          field={get(
            titleNodeData,
            "google_reviews_section_title.richText",
            []
          )}
        />

        <div className="review-container">
          <div className="title">
            <h3>
              <img src={GoogleWord} alt="Google" loading={"lazy"} />
              Rating
            </h3>
            <a
              href="https://www.google.com/search?hl=en-LK&gl=lk&q=InsureMe.lk,+14A+Boyd+Pl,+Colombo+00300&ludocid=16272580941489668760&lsig=AB86z5X09fbwURFbkT3tATfy1xE6#lrd=0x3ae25bd3604bb1a3:0xe1d3d22684488298,1,,,"
              className="bt-two"
              target="_blank"
            >
              {get(googleReviews, "total", 0)} reviews
            </a>
          </div>
          <div className="write-review">
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJo7FLYNNb4joRmIJIhCbS0-E"
              target="_blank"
              className="primary-btn-sm"
            >
              Write a Review
            </a>
          </div>
        </div>

        <div className="reviews-slider-wrapper">
          <Swiper
            spaceBetween={20}
            slidesPerView={"auto"}
            // autoHeight={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: true,
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            modules={[Autoplay, Pagination]}
          >
            {reviewsArray.map((item, idx) => {
              const ratings = Array.apply(null, Array(get(item, "rating", 0)));
              const review = get(item, "text", "");
              const limit = review.length > 80;
              return (
                <SwiperSlide key={idx}>
                  <div className="single-review">
                    <div className="profile">
                      <div className="image">
                        <img
                          src={get(item, "profile_photo_url", "")}
                          alt="Profile Photo"
                          loading={"lazy"}
                        />
                      </div>
                      <div className="profile-info">
                        <h3 className="name st-two">
                          {get(item, "author_name", "")}
                        </h3>
                        <div className="ratings">
                          {ratings.map((rating, idx) => {
                            return <AiFillStar key={idx} />;
                          })}
                        </div>
                        <p>{get(item, "relative_time_description", "")}</p>
                      </div>
                    </div>
                    <div className="review-text">
                      <h3 className="bt-one">
                        {limit ? (
                          <span>
                            <p>{review.substring(0, 80)}</p>
                            <button
                              className="read-more"
                              onClick={(e) => {
                                handleClick(e, review, limit);
                              }}
                            >
                              Read More
                            </button>
                          </span>
                        ) : (
                          review
                        )}
                      </h3>
                    </div>
                    <div className="google">
                      <div className="g-image">
                        <img src={Google} alt="Google Icon" loading={"lazy"} />
                      </div>
                      <div>
                        <p className="bt-two">Posted on</p>
                        <a href="https://www.google.com/" target="_blank">
                          Google
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </article>
    </section>
  );
};

export default Reviews;
