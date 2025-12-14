import { getCountryCallingCode } from "libphonenumber-js";
import Avatar from "../../assets/images/avatar.png";

type TCustomerInfoCardValues = {
  data: any;
};

const CustomerInfoCard = ({ data }: TCustomerInfoCardValues) => {
  return (
    <div className="card bordered info-card my-4">
      <div className="card-body">
        <h5>Customer Information</h5>
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <div className="image">
                <img src={data?.image ? data.image : Avatar} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="fw-medium">
                  {data?.firstName} {data?.lastName}
                </h6>
                <p className="mt-1 text-slate-500">{data?.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-4">
            <p className="text-slate-900 fw-medium">Primary Addreess</p>
            <p className="mt-1 text-slate-500">
              {data?.primaryAddress?.flat || data?.primaryAddress?.street
                ? `${data?.primaryAddress?.flat || ""}${
                    data?.primaryAddress?.flat && data?.primaryAddress?.street
                      ? ", "
                      : ""
                  }${data?.primaryAddress?.street || ""}`
                : "-"}
            </p>
          </div>
          <div className="col-md-4">
            <p className="text-slate-900 fw-medium">Phone Number</p>
            <p className="mt-1 text-slate-500">
              {data?.phoneNumber ? (
                <>
                  +{getCountryCallingCode(data["countryCode"])}{" "}
                  {data?.phoneNumber}
                </>
              ) : (
                "-"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
