import React from "react";
import './index.scss';
import Hero from "../components/SEO pages/BlogsPage/Hero";
import Layout from "../components/Layout";
import Carousal from "../components/SEO pages/BlogsPage/Carousal";
import BoxesSection from "../components/SEO pages/BlogsPage/BoxesSection";
import CTA_Section from "../components/SEO pages/BlogsPage/CTASection";
import CommonPageAccordionSection from "../components/CommonPage/AccordionSection";
import CardsSectionBottom from "../components/SEO pages/BlogsPage/CardsSectionBottom";
import CommonPageDetailsSection from "../components/CommonPage/DetailsSection";

const blogs = () => {

  const data = {
    primary: {
      title: [
        {
          type: "heading3",
          text: "What is motor vehicle insurance?",
          spans: Array(0),
        },
      ],
      description: [
        {
          type: "paragraph",
          text: "Nunc ultrices ligula nec arcu euismod posuere. Maecenas tempus diam vel leo tincidunt congue. Fusce tellus massa, tristique eget sagittis ac, aliquam eu lorem. Proin venenatis metus ac eleifend cursus. Aliquam venenatis sem ac dui pharetra egestas. Nullam fermentum pellentesque lectus, eu finibus magna lobortis eu. Sed gravida magna a pharetra commod  Maecenas tempus diam vel leo tincidunt congue. Fusce tellus massa, tristique eget sagittis ac, aliquam eu lorem. Proin venenatis metus ac eleifend cursus. Aliquam venenatis sem ac dui pharetra egestas. Types of motor insuranceSed gravida magna a pharetra commodo. Maecenas tempus diam vel leo tincidunt congue.Fusce tellus massa, tristique eget sagittis ac, aliquam eu lorem. ",
          spans: Array(0),
        },
      ],
    },
    

  };
  const dataSet = {
    primary: {
      title: [
        {
          type: "heading3",
          text: "Why chose InsureMe for Motor insurance.",
          spans: Array(0),
        },
      ],
      description: [
        {
          type: "paragraph",
          text: "Nunc ultrices ligula nec arcu euismod posuere. Maecenas tempus diam vel leo tincidunt congue. Fusce tellus massa, tristique eget sagittis ac, aliquam eu lorem. Proin venenatis metus ac eleifend cursus. Aliquam venenatis sem ac dui pharetra egestas. Nullam fermentum pellentesque lectus, eu finibus magna lobortis eu. Sed gravida magna a pharetra commodo. Maecenas tempus diam vel leo tincidunt congue. Fusce tellus massa, tristique eget sagittis ac, aliquam eu lorem.  Proin venenatis metus ac eleifend cursus. Aliquam venenatis sem ac dui pharetra egestas. ",
          spans: Array(0),       
        },
      ],
    },
    

  };



  const sliceData = {
    primary: {
      title: [
        {
          type: "heading2",
          text: "Frequently Asked Questions",
          spans: Array(0),
        },
      ],
    },
    items: [
      {
        accordion_title: [
          {
            type: "heading4",
            text: "Quisque ultricies ex in tempor dapibus. ”",
            spans: Array(0),
          },
        ],
        accordion_description: [
          {
            type: "paragraph",
            text: "For assertive self-starters, the opportunities to contribute are limitless.",
            spans: Array(0),
          },
        ],
      },
      {
        accordion_title: [
          {
            type: "heading4",
            text: "Maecenas ultrices sem eget ante volutpat, at dictum nulla gravida. ",
            spans: Array(0),
          },
        ],
        accordion_description: [
          {
            type: "paragraph",
            text: "For assertive self-starters, the opportunities to contribute are limitless.",
            spans: Array(0),
          },
        ],
      },
      {
        accordion_title: [
          {
            type: "heading4",
            text: "Praesent sed lacus sit amet justo eleifend aliquam a a risus.",
            spans: Array(0),
          },
        ],
        accordion_description: [
          {
            type: "paragraph",
            text: "For assertive self-starters, the opportunities to contribute are limitless.",
            spans: Array(0),
          },
        ],
      },
      {
        accordion_title: [
          {
            type: "heading4",
            text: "Gravida Maecenas ultrices sem eget ante volutpat, at dictum nulla. ",
            spans: Array(0),
          },
        ],
        accordion_description: [
          {
            type: "paragraph",
            text: "For assertive self-starters, the opportunities to contribute are limitless.",
            spans: Array(0),
          },
        ],
      },
    ],
  };

  return (
    <>
 
      <Layout>
        <Hero />
        <div className="blogs-page">
          <CommonPageDetailsSection slice={data} />
          <Carousal />
          <BoxesSection />
          <CTA_Section />
          <CommonPageDetailsSection slice={dataSet} />
          <CommonPageAccordionSection slice={sliceData} seoBlog={true} />
          <CardsSectionBottom />
        </div>
      </Layout>

    </>
  );
};

export default blogs;
