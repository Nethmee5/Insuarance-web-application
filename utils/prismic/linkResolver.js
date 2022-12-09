const linkResolver = (doc) => {

  if (doc.type === "blog_page") {
    return `/blog`;
  }

  if (doc.type === "blog_post") {
    return `/blog/${doc.uid}`;
  }


  if (doc.type === "business_insurance_page") {
    return `/corporate`;
  }

  if (doc.type === "career") {
    return `/careers/${doc.uid}`;
  }

  if (doc.type === "careers_-_team_page") {
    return `/careers/categories`;
  }

  if (doc.type === "common_page") {
    return `/${doc.uid}`;
  }

  if (doc.type === "partnerscollaborators") {
    return `/partners-and-collaborators/${doc.uid}`;
  }

  // Backup for all the other types
  return "/";
};

module.exports = linkResolver;
