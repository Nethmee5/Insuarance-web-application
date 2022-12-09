import React from "react";
import { Link } from "gatsby";
import resolvePrismicLink from "../../../utils/prismic/resolveLink";

const CustomPrismicLink = ({
  label = "",
  prismicLink = {},
  className = "",
  children,
  ...props
}) => {
  const { link, target, external } = resolvePrismicLink(prismicLink);

  if (external) {
    return (
      <a href={link} target={target} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={link} target={target} className={className} {...props}>
      {children}
    </Link>
  );
};

export default CustomPrismicLink;
