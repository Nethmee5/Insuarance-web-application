import { id } from "date-fns/locale";
import React from "react";
import '../BoxesSection/index.scss';
import data from "./utills/data";

const BoxesSection = () => {


  return (
    <div className="boxes-section">
     <div className="">
          <h3>Find the cheapest motor full insurance in <p>3 steps.</p></h3>
        <div className="Container">
            <div className="box-container row g-0">
              {
                data.map((item, idx) => {
                    return(
                      <div className={`col-md-4 ${(idx == 0 ? 'column-1': (idx==1) ? 'column-2' : 'column-3')} single-box-card`} key={item.id} >
                          <div className="number">
                            {item.number}
                          </div>
                          <div className="title-1">
                            {item.title}
                          </div>
                          <div className="txt">
                            {item.text}
                          </div>
                      </div>
                    );
                })
              }
            </div>
        </div>
        </div>
        
    </div>
   
  );
};

export default BoxesSection;
