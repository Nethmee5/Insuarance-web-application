const query = `
    {
      allPrismicHomePage {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicBlogPage {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicBlogPost {
        nodes {
          id
          lang
          url
          uid
        }
      }
      allPrismicBusinessInsurancePage {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicCareer {
        nodes {
          id
          lang
          url
          uid
        }
      }
      allPrismicCareersTeamPage {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicCommonPage {
        nodes {
          id
          lang
          url
          uid
        }
      }
      allPrismicPartnerscollaborators {
        nodes {
          id
          lang
          url
          uid
        }
      }
    }`;

module.exports = query;
