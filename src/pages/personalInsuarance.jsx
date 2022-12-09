import React from "react";
import './index.scss';
import Layout from "../components/Layout";
import HeroImage from "../images/PersonalInsuarancePage/team_photo_1.png";
import CommonPageHeroSection from "../components/CommonPage/HeroSection";
import ContentSection from "../components/SEO pages/PersonalInsuarancePage/Content";
import CommonPageAccordionSection from "../components/CommonPage/AccordionSection";
import CardsSection from "../components/SEO pages/PersonalInsuarancePage/cards";

const personalInsuarance = () => {
  const data = {
    subtitle: "Personal Insurance",
    page_title: [
      {
        type: "heading1",
        text: "Get the Best Insurance Deals",
        spans: Array(0),
      },
    ],
    image: {
      url: HeroImage,
    },
  };

  const sliceData = {
    primary: {
      title: [
        {
          type: "heading2",
          text: "Why Personal Insurance Matters",
          spans: Array(0),
        },
      ],
      description: [
        {
          type: "paragraph",
          text: "Curabitur vehicula ipsum nibh. Curabitur eleifend augue at nisi porta, in finibus lorem egestas. Proin porttitor, nisl sed venenatis suscipit, ante tellus sodales magna, sed sollicitudin nisi sem sed libero",
          spans: Array(0),
        },
      ],
    },
    items: [
      {
        accordion_title: [
          {
            type: "heading4",
            text: "Worry less on “What if”",
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
          { type: "heading4", text: "Easy payment plans", spans: Array(0) },
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
            text: "Investment plans + insurance",
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
            text: "100% insurance coverage",
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
          { type: "heading4", text: "Transport allowances", spans: Array(0) },
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
      <div className="personal-insuarance-page">
        <Layout>
          <CommonPageHeroSection data={data} />
          <ContentSection />
          <CardsSection />
          <CommonPageAccordionSection slice={sliceData} />
        </Layout>
      </div>
    </>
  );
};
export default personalInsuarance;
