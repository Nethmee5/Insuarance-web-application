import React, { useEffect, useState } from "react";
import get from "lodash/get";
import * as styles from "./index.module.scss";
import CountUp from "react-countup";

const ClientsServed = ({ data }) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const values = document.querySelectorAll(".val");

    let options = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.intersectionRatio > 0) {
          setStart(true);
        }
      });
    }, options);

    values.forEach((value) => {
      observer.observe(value);
    });
  }, []); 

  return (
    <section className={styles.clients_served}>
      <article
        className={`${styles.stats_wrapper} section-center d-flex flex-wrap justify-content-center align-items-start`}
      >
        {get(data, "stat", []).map(
          ({ label, value, prefix = "", suffix = "" }, idx) => {
            let i = 0;
            return (
              <div key={idx}>
                <h3 className="text-center val" data-delay={value}>
                  {start && (
                    <CountUp delay={0} start={0} end={value} separator="," />
                  )}{" "}
                  {suffix}
                </h3>
                <p className="st-one text-center">{label}</p>
              </div>
            );
          }
        )}
      </article>
    </section>
  );
};

export default ClientsServed;
