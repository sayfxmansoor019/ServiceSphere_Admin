import moment from "moment";

export const formatDate = (data: any) => {
  return moment(data).format("MMM DD, YYYY");
};
