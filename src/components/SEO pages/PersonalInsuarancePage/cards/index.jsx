import React from "react";
import "../cards/index.scss";
import data from "../cards/utils/data";

const CardsSection = () => {
  return (
    <div className="cards">
      <div className="section-center">
        <div className="Container">
          <div className="row">
            {data.map((item, idx) => {
              return (
                <div className="col-sm-6 col-xl-4" key={item.id}>
                  <div className="card-container ">
                    <img src={item.img} class="card-img " />

                    <p class="st-two">{item.title}</p>
                    <p class="content">{item.content}</p>
                    <button class="primary-btn" type="submit">
                      {item.btnname}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsSection;
