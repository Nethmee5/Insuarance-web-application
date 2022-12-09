import React from "react";
import get from "lodash/get";
import { format, isValid, parse } from "date-fns";

const LastUpdatedDate = ({ slice }) => {
  const date = get(slice, "primary.date", null);
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  if (!isValid(parsedDate)) return null;
  return (
    <div className={"container text-center mt-3 mb-4"}>
      Last updated {format(parsedDate, "MMMM d, yyyy")}
    </div>
  );
};

export default LastUpdatedDate;
