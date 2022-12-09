import * as React from "react";
import { withPrismicUnpublishedPreview } from "gatsby-plugin-prismic-previews";
import RightArrow from '../images/Icons/right_arrow_black.svg';
import InMe from '../images/Icons/404_inme.svg'
import { Link } from "gatsby";
import * as s from './index.module.scss';
import Layout from "../components/Layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <section className={s.f0f}>
        <article className="section-center">
          <div>
            <h2>
              Oops!
            </h2>
            <h3 className="title-one">
              404 - PAGE NOT FOUND
            </h3>
            <p className="st-two">
              Something is wrong here. It seems like what you are looking for cannot be found. 
            </p>
            <Link to="/" className="secondary-btn">
              <img src={RightArrow} alt="Right Arrow" />
              Go to home
            </Link>
            <div className={s.inme}>
              <img src={InMe} alt="InMe Image" />
            </div>
          </div>
        </article>
      </section>
    </Layout>
  );
};

export default withPrismicUnpublishedPreview(NotFoundPage);
