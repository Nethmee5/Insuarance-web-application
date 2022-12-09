import React from "react";
import get from "lodash/get";
import { PrismicRichText } from "@prismicio/react";

const RichText = ({ slice }) => {
  return (
    <div className={"container"}>
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xxl-9">
          <PrismicRichText field={get(slice, "primary.rich_text", [])} />
        </div>
      </div>
    </div>
  );
};

export default RichText;
