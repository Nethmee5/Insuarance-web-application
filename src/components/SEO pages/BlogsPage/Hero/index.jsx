import React from "react";
import "../../../../styles/global.scss";
import "../Hero/index.scss";
import Layer_2 from "../../../../images/BlogsPage/Layer_2.png";
import Form from "../Form/Form";

const BlogsPage = () => {
  return (
    <>
      <section className="hero-container">
        <div class="Container section-center">
          <div class="row justify-content-between align-items-xl-center">
            <div class="col-xl-4 title-points-container">
              <h1>Get The Best Medical Insurance Plan With InsureMe</h1>

              <div class="sub-points">
                <div class="list">
                  <p>
                    <span></span> Support on claims
                  </p>
                  <p>
                    <span></span> Expert advice
                  </p>
                  <p>
                    <span></span> Compare 15+ quotes
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-4">
              <img class="bg-image" src={Layer_2} alt="Layer 2" />
            </div>

            <div class="col-md-6 col-xl-4">
              <Form />
            </div>
          </div>

          <div class="line1"></div>
        </div>
      </section>
  
    </>
  );
};

export default BlogsPage;
