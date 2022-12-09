import React from "react";
import SCurve from "../../../images/s_curve.svg";
import * as styles from "./index.module.scss";

const Header = () => {
  return (
    <nav>
      <section className={styles.nav_container}>
        <article className={styles.background_img_curve_container}></article>
        <article className={styles.background_img_curve}>
          <img src={SCurve} alt="Nav Background" />
        </article>
        <article></article>
      </section>
    </nav>
  );
};

export default Header();
