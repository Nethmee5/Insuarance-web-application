import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Metadata from "./Metadata";
import get from "lodash/get";

const Layout = ({
  data,
  children,
  metaTitle = null,
  metaDescription = "",
  twitterTitle = null,
  twitterDescription = "",
  facebookTitle = null,
  facebookDescription = "",
  metaImage = "",
}) => { 
  return (
    <>
      <Metadata
        metadata={{
          metaTitle: metaTitle || get(data, "meta_title", ""),
          metaDescription: metaDescription || get(data, "meta_description", ""),
          metaImage: metaImage || get(data, "meta_image", ""),
          facebookTitle: facebookTitle || get(data, "facebook_title", ""),
          facebookDescription: facebookDescription || get(data, "facebook_description", ""),
          twitterTitle: twitterTitle || get(data, "twitter_title", ""),
          twitterDescription: twitterDescription || get(data, "twitter_description", ""),
        }}
      />
      <Header />
        {children}
        <div id="contact-us">
        </div>
      <Footer />
    </>
  );
};

export default Layout;
