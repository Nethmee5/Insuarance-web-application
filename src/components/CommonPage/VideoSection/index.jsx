import React, { useState } from "react";
import * as s from "./index.module.scss";
import { PrismicRichText } from "@prismicio/react";
// import Play from "../../../images/Icons/Play.svg";
import get from "lodash/get";
// import {GrClose} from 'react-icons/gr'

const CommonPageVideoSection = ({ slice = {}, index }) => {
  const [modal, setModal] = useState(false);

  const youtubeVideoId = get(slice, "primary.youtube_video_id", "");
  const image = get(slice, "primary.image1.url", "");

  return (
    <div className={s.video_container} id="founders">
      <div className={`${s.video_wrapper} section-center`}>
        <div className={s.video_grid}>
          <div className={s.founder_text}>
            <PrismicRichText field={get(slice, "primary.title", [])} />
            <PrismicRichText field={get(slice, "primary.description", [])} />
          </div>
          <div className={s.youtube_video_wrapper}>
            {youtubeVideoId ? (
              <iframe
                title={`video-section-youtube-video-${index}`}
                src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0`}
                loading="lazy"
              />
            ) : (
              <img src={image} alt="" />
            )}
          </div>
        </div>
      </div>
      {/* MODAL IF NEEDED*/}
      {/* <img src={Play} alt="Plat Icon" className={s.play_icon} onClick={()=>{setModal(true)}}/>
      <article className={`modal-container ${modal? "" : "modal-hide"}`} onClick={()=>setModal(false)}>
        <div className="modal-wrapper">
          <div>
            <iframe src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}${modal? '?autoplay=1': ''}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
          </div>
          <p onClick={()=>setModal(false)}>
            <GrClose/>
          </p>
        </div>
      </article> */}
    </div>
  );
};

export default CommonPageVideoSection;
