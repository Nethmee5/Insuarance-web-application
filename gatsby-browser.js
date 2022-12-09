import React from "react";
import get from "lodash/get";
import WrappedComponent from "./gatsby-wrap-with-providers";

import "swiper/css";
import "swiper/css/pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./src/fonts/HelveticaNeue/stylesheet.css";
import "./src/fonts/Avenir/avenir.css";
import "./src/styles/global.scss";

export const wrapRootElement = ({ element }) => (
  <WrappedComponent>{element}</WrappedComponent>
);

export const shouldUpdateScroll = ({ pathname, prevRouterProps }) => {
  // this is to prevent page jump when query params are changed
  const prevPathname = get(prevRouterProps, "location.pathname", null);
  return pathname !== prevPathname;
};
