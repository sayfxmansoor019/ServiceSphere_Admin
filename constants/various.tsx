const recordsPerPageData = [
  { id: "1", name: "5" },
  { id: "2", name: "10" },
  { id: "3", name: "15" },
  { id: "4", name: "20" },
  { id: "5", name: "25" },
  { id: "6", name: "30" },
];

const genderData = [
  { id: "1", name: "Male" },
  { id: "2", name: "Female" },
  { id: "3", name: "Others" },
];

const smartMessageTypeData = [
  { id: "1", name: "info" },
  { id: "2", name: "others" },
];

const languagesData = [
  {
    id: "1",
    name: "German",
    lang: "de",
  },
  {
    id: "2",
    name: "English",
    lang: "en",
  },
];

const BOOK_SERVICE_STATUS_LABEL = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  ASSIGNED: "assigned",
  IN_PROGRESS: "inprogress",
  MAKE_PAYMENT: "awaiting payment",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  EXPIRED: "expired",
};

const BOOK_SERVICE_STATUS_COLOR = {
  PENDING: "#bc620e",
  ACCEPTED: "#851ab3",
  ASSIGNED: "#851ab3",
  IN_PROGRESS: "#105b97",
  MAKE_PAYMENT: "#f58106",
  COMPLETED: "#109614",
  CANCELLED: "#bd0d0d",
  EXPIRED: "#706e71",
};

const GENERAL_STATUS_LABEL = {
  Active: "Active",
  Inactive: "Inactive",
  Rejected: "Rejected",
  Deleted: "Deleted",
  Blocked: "Blocked",
};

const GENERAL_STATUS_LABEL_COLOR = {
  Active: "#0c8e4d",
  Inactive: "#d97706",
  Rejected: "#e11d48",
  Deleted: "#495057",
  Blocked: "#991b1b"
};

const NOTIFICATION_PREFERRENCES_LABEL = {
  SCHEDULED: "SCHEDULED",
  SENT: "SENT",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
};


const REVIEW_STATUS_LABEL = {
  NEEDS_INFO: "needs info"
};


const REVIEW_STATUS_COLOR = {
  NEEDS_INFO: "#105b97"
};

const reviewStatusData = Object.keys(REVIEW_STATUS_LABEL).map((key) => ({
  id: key,
  name: REVIEW_STATUS_LABEL[key as keyof typeof REVIEW_STATUS_LABEL],
}));

const imageFileSizeLimit = 5;
const videoFileSizeLimit = 50;

export {
  recordsPerPageData,
  imageFileSizeLimit,
  videoFileSizeLimit,
  genderData,
  smartMessageTypeData,
  languagesData,
  BOOK_SERVICE_STATUS_LABEL,
  BOOK_SERVICE_STATUS_COLOR,
  GENERAL_STATUS_LABEL,
  GENERAL_STATUS_LABEL_COLOR,
  NOTIFICATION_PREFERRENCES_LABEL,
  REVIEW_STATUS_LABEL,
  REVIEW_STATUS_COLOR,
  reviewStatusData
};
