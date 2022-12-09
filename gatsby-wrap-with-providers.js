import * as React from "react";
import { PrismicPreviewProvider } from "gatsby-plugin-prismic-previews";
import previewConfig from "./utils/prismic/previewConfig";

import "./src/styles/bootstrap/index.scss";
import "./src/styles/default.scss";

const WrappedComponent = ({ children }) => (
  <PrismicPreviewProvider repositoryConfigs={previewConfig}>
    {children}
  </PrismicPreviewProvider>
);

export default WrappedComponent;
