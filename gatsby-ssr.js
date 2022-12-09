import React from "react";
import WrappedComponent from "./gatsby-wrap-with-providers";

export const wrapRootElement = ({ element }) => (
  <WrappedComponent>{element}</WrappedComponent>
);
