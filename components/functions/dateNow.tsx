import moment from "moment";

export const dateNow = (data: any) => {
  return <span>{moment(data).fromNow()}</span>;
};