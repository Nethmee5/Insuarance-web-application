import { graphql, useStaticQuery } from "gatsby";
import get from "lodash/get";

const usePreparedData = () => {
  const partnerSectionData = useStaticQuery(graphql`
    query {
      prismicGlobalData {
        dataRaw
      }
      allPrismicPartnerscollaborators {
        nodes {
          url
          data {
            title {
              text
            }
            logo {
              url
            }
            category
          }
        }
      }
    }
  `);

  const sectionData = get(partnerSectionData, "prismicGlobalData.dataRaw", {});

  const pc = get(
    partnerSectionData,
    "allPrismicPartnerscollaborators.nodes",
    []
  );

  const sections = get(sectionData, "body2", []).filter(
    (item) => item.slice_type === "p_c_section"
  );

  const data = sections.map((section) => {
    return {
      title: get(section, "primary.title", ""),
      description: get(section, "primary.description", ""),
      images: pc
        .filter(
          (item) =>
            item.data.category.indexOf(get(section, "primary.title", "")) > -1
        )
        .map((item) => ({
          image: get(item, "data.logo.url", ""),
          url: get(item, "url", ""),
        })),
    };
  });

  return {
    title: get(sectionData, "partners_section_title[0].text", ""),
    data,
  };
};

export default usePreparedData;
