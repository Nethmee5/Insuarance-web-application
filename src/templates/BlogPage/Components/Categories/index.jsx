import React from "react";
import cx from "classnames";
import * as s from "./index.module.scss";

const Categories = ({
  categories = [],
  setActiveCategory = () => null,
  activeCategory = "All",
}) => {
  return (
    <div className={s.categories}>
      <h2>Categories</h2>
      <ul className={"list-unstyled m-0 p-0"}>
        <li className={"d-inline-block d-xxl-block"}>
          <button
            onClick={() => setActiveCategory("All")}
            className={cx({
              "btn btn-link px-0 me-4": true,
              [s.isActive]: activeCategory === "All",
            })}
          >
            All
          </button>
        </li>
        {categories.map((category) => (
          <li className={"d-inline-block d-xxl-block"} key={category}>
            <button
              onClick={() => setActiveCategory(category)}
              className={cx({
                "btn btn-link px-0 me-4 mx-xxl-0": true,
                [s.isActive]: activeCategory === category,
              })}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
