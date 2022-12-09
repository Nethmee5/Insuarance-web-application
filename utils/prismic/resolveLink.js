import linkResolver from "./linkResolver";

const resolvePrismicLink = (ctaLinkObject) => {
  let link = null;
  let target = "_self";
  let external = false;

  if (ctaLinkObject) {
    switch (ctaLinkObject.link_type) {
      case "Web":
        link = ctaLinkObject.url;
        target = ctaLinkObject.target || "_self";
        external = true;
        break;
      case "Document":
        link = linkResolver(ctaLinkObject);
        target = ctaLinkObject.target || "_self";
        break;
      case "Media":
        link = ctaLinkObject.url;
        break;
      default:
        link = null;
    }
  }

  return { link, target, external };
};

export default resolvePrismicLink;
