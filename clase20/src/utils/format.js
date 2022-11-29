import moment from "moment";

export const formatTimeStamp = () => {
  return { timestamp: moment().format() };
};
