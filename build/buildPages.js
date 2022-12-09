const path = require("path");
const get = require("lodash/get");

const buildPages = (pages = [], templatePath = "", createPage) => {
  if (!pages || pages.length === 0 || !templatePath) return;

  pages.forEach((page, idx) => {
    const prevPage = idx === 0 ? pages[pages.length - 1] : pages[idx - 1];
    const nextPage = idx === pages.length - 1 ? pages[0] : pages[idx + 1];

    createPage({
      path: page.url,
      component: path.resolve(templatePath),
      context: {
        id: page.id,
        lang: page.lang,
        uid: page.uid,
        prevPage,
        nextPage,
        reviews: page.reviews,
      },
    });
  });
};

module.exports = buildPages;
