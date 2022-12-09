import React from "react";
import * as s from "./index.module.scss";
import { PrismicRichText } from "@prismicio/react";
import get from "lodash/get";
import { graphql, useStaticQuery } from "gatsby";

const CommonPageTeamSection = ({ slice = {} }) => {
  const globalData = useStaticQuery(graphql`
    query {
      prismicGlobalData {
        dataRaw
      }
    }
  `);

  const teamSlice = get(globalData, "prismicGlobalData.dataRaw.body1").find(
    (item) => item.slice_type === "team"
  );

  const team = get(teamSlice, "items", []).map((item) => ({
    image: get(item, "image.url"),
    name: get(item, "name", ""),
    position: get(item, "title", ""),
  }));

  return (
    <div className={s.team_container} id="team">
      <div className={`${s.team_wrapper} section-center`}>
        <div className={s.title}>
          <PrismicRichText field={get(slice, "primary.title", [])} />
        </div>

        <div className={s.team_grid}>
          {team.map(({ name, position, image }, idx) => (
            <div className={s.single_member} key={idx}>
              <div className={s.img_container}>
                <img src={image} alt="Team Member Image" />
              </div>
              <div className={s.body}>
                <h2 className="st-two">{name}</h2>
                <h3 className="">{position}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonPageTeamSection;
