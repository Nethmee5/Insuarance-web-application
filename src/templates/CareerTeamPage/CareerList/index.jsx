import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import get from "lodash/get";
import uniq from "lodash/uniq";
import * as s from "../index.module.scss";

const CareerList = () => {
  const data = useStaticQuery(graphql`
    {
      allPrismicCareer {
        nodes {
          data {
            team
            title {
              text
            }
          }
          uid
          url
        }
      }
    }
  `);

  const careerList = get(data, "allPrismicCareer.nodes", []);

  const teams = uniq(careerList.map((career) => get(career, "data.team", ""))); 

  return (
    <section>
      <div className="section-center">
        <div className={`${s.team_role} row`}>
          <div className="d-none d-md-block col-md-4 div-col-xl-5">Team</div>
          <div className="d-none d-md-block col-md-8 col-xl-7">Role</div>
        </div>
        {teams.map((team, idx) => (
          <div className="row" key={team}>
            {idx === 0 && (
              <div className="col-12">
                <hr className={s.blue_divider} />
              </div>
            )}
            <div className="col-md-4 div-col-xl-5">
              <h3 className={s.team_title}>{team}</h3>
            </div>
            <div className="col-md-8 col-xl-7">
              <ul className={s.list}>
                {careerList
                  .filter((career) => career.data.team === team)
                  .map((career) => (
                    <li key={career.uid}>
                      <Link 
                        to={career.url}
                        >
                          {career.data.title.text}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-12">
              <hr className={s.blue_divider} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CareerList;
