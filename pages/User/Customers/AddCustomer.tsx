import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { ListBulletIcon } from "@heroicons/react/24/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { toast } from "react-toastify";

import { useFormik } from "formik";
import _ from "underscore";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

import Breadcrumb from "../../../components/Common/Breadcrumb";
import SearchDropdown from "../../../components/Common/SearchDropdown";
import Loader from "../../../components/Common/Loader";

import api from "../../../../api";
import SubmitButton from "../../../components/Common/SubmitButton";
import { GENERAL_STATUS_LABEL } from "../../../constants/various";
import StatusSwitch from "../../../components/Common/StatusSwitch";

type TAddSubAdminValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  street: string;
  flat: string;
  pincode: string;
  phoneNumber: string;
  countryCode: string;
  countryId: string;
  stateId: string;
  cityId: string;
  status: string;
  addressId: string;
};

const AddCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [availableCountries, setAvailableCountries] = useState([]);
  const [fetchedStates, setFetchedStates] = useState([]);
  const [fetchedCities, setFetchedCities] = useState([]);

  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [availablePincodes, setAvailablePincodes] = useState([]);

  const [isStateAvailable, setStateAvailable] = useState(false);
  const [isCityAvailable, setCityAvailable] = useState(false);
  const [isPincodeAvailable, setPincodeAvailable] = useState(false);

  const [isStatus, setStatus] = useState(GENERAL_STATUS_LABEL.Active);

  const [editId, setEditId] = useState<any>(null);

  const [entryData, setEntryData] = useState<any>({});

  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isError, setError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [selectedCountryCode, setSelectedCountryCode] = useState("DE");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<any>("");

  const [isFormSubmitted, setFormSubmiited] = useState(false);

  const didSetInitialValues = useRef(false);

  const initialValues: TAddSubAdminValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    street: "",
    flat: "",
    pincode: "",
    phoneNumber: "",
    countryCode: "",
    countryId: "",
    stateId: "",
    cityId: "",
    status: "Active",
    addressId: "",
  };

  const validate = (values: TAddSubAdminValues) => {
    let errors: Record<string, any> = {};

    if (!values.firstName) {
      errors.firstName = "First name is required!";
    }

    if (!values.lastName) {
      errors.lastName = "Last name is required!";
    }

    if (!values.email && !editId) {
      errors.email = "Email is required";
    } else if (
      !/^[a-z0-9][a-z0-9._+-]*@([a-z0-9-]+\.)+[a-z]{2,5}$/i.test(values.email)
    ) {
      errors.email = "Enter a valid email address";
    }

    if (!values.password && !editId) {
      errors.password = "Password is required!";
    } else if (values.password.length < 7) {
      errors.password = "Password should contain minimum 7 characters!";
    }

    if (!values.street) {
      errors.street = "Street is required!";
    }

    if (!values.flat) {
      errors.flat = "Flat is required!";
    }

    if (!values.pincode) {
      errors.pincode = "Pincode is required!";
    } else if (!/^\d{5}$/.test(values.pincode)) {
      errors.pincode = "Pincode must be a 5-digit number!";
    }

    if (!values.countryId) {
      errors.countryId = "Country is required!";
    }

    if (!values.stateId) {
      errors.stateId = "State is required!";
    }

    if (!values.cityId) {
      errors.cityId = "City is required!";
    }

    return errors;
  };

  const onSubmit = async (values: TAddSubAdminValues) => {
    setFormSubmiited(true);

    let formData = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      countryCode: selectedCountryCode,
      phoneNumber: formattedPhoneNumber,
      countryId: values.countryId,
      stateId: values.stateId,
      cityId: values.cityId,
      status: isStatus,
      isVerified: true,
    };

    if (!editId) {
      try {
        const response = await api.post("/admin/addcustomer", formData);

        if (response.data) {
          //create primary address

          const customerData = response.data.newCustomerData;

          let addressData = {
            type: "office",
            primary: true,
            flat: values.flat,
            street: values.street,
            pincode: values.pincode,
            countryId: values.countryId,
            stateId: values.stateId,
            cityId: values.cityId,
            userId: customerData.id,
          };

          try {
            const addressResponse = await api.post(
              "/customer/addaddress",
              addressData
            );

            if (addressResponse.data) {
              formik.resetForm();
              setFormSubmiited(false);
              toast.success(response.data.message);
              navigate("/customers");
            }
          } catch (error: any) {
            setFormSubmiited(false);
            if (error.response) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Network Error");
            }
          }
        }
      } catch (error: any) {
        setFormSubmiited(false);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Network Error");
        }
      }
    } else {
      let editData = {
        id: editId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        countryCode: selectedCountryCode,
        phoneNumber: formattedPhoneNumber,
        countryId: formData.countryId,
        stateId: formData.stateId,
        cityId: formData.cityId,
        status: isStatus,
        isVerified: formData.isVerified,
      };

      try {
        const response = await api.put("/admin/updatecustomer", editData);

        if (response.data) {
          try {
            let addressData = {
              id: entryData.addressId,
              type: "office",
              primary: true,
              flat: values.flat,
              street: values.street,
              pincode: values.pincode,
              countryId: values.countryId,
              stateId: values.stateId,
              cityId: values.cityId,
              userId: editId,
            };

            const addressResponse = await api.put(
              "/customer/updateaddress",
              addressData
            );

            if (addressResponse.data) {
              formik.resetForm();
              setFormSubmiited(false);
              toast.success(response.data.message);
              navigate("/customers");
            }
          } catch (error: any) {
            setFormSubmiited(false);
            if (error.response) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Network Error");
            }
          }
        }
      } catch (error: any) {
        setFormSubmiited(false);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Network Error");
        }
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const handleStatus = (event: any) => {
    setStatus(event)
  };

  const fetchCountries = async () => {
    try {
      const response = await api.get("/admin/locations/by-country");
      if (response.data) {
        setAvailableCountries(response.data.fetchedData);
      }
    } catch (error) {}
  };

  const fetchStates = async () => {
    try {
      const response = await api.get("/admin/locations/by-state");

      if (response.data) {
        setFetchedStates(response.data.fetchedData);
      }
    } catch (error) {}
  };

  const fetchCities = async () => {
    try {
      const response = await api.get("/admin/locations/by-city");

      if (response.data) {
        setFetchedCities(response.data.fetchedData);
      }
    } catch (error) {}
  };

  const fetchPincodes = async (cityId: string) => {
    try {
      const response = await api.get(`/admin/pincodes/by-city/${cityId}`);
      if (response.data) {
        setAvailablePincodes(response.data.fetchedData);
        setPincodeAvailable(true);
      }
    } catch (error) {}
  };

  const fetchDataById = async (id: string) => {
    try {
      const response = await api.get(`/admin/customers/${id}`);

      if (response.data) {
        const customerData = response.data.fetchedData;
        const addressResponse = await api.get(
          `/customer/addresses/by-user/by-primary/${id}`
        );

        try {
          if (addressResponse.data) {
            if (!_.isEmpty(addressResponse.data.fetchedData)) {
              setEntryData({
                ...customerData,
                ...addressResponse.data.fetchedData[0],
                addressId: addressResponse.data.fetchedData[0].id,
              });
            } else {
              setEntryData(customerData);
            }

            setDataLoaded(true);
            setError(false);
          }
        } catch (error) {
          setDataLoaded(true);
          setError(true);
        }
      }
    } catch (error) {
      setDataLoaded(true);
      setError(true);
    }
  };

  const handleCountry = (item: any) => {
    formik.setFieldValue("countryId", item["id"]);
    formik.setFieldValue("countryName", item["name"]);
    setTimeout(() => {
      formik.setTouched({ ...formik.touched, countryId: true });
    });
  };

  const handleState = (item: any) => {
    formik.setFieldValue("stateId", item["id"]);
    formik.setFieldValue("stateName", item["name"]);
    setTimeout(() => {
      formik.setTouched({ ...formik.touched, stateId: true });
    });
  };

  const handleCity = (item: any) => {
    formik.setFieldValue("cityId", item["id"]);
    formik.setFieldValue("cityName", item["name"]);
    setTimeout(() => {
      formik.setTouched({ ...formik.touched, cityId: true });
    });
  };

  const handlePincode = (item: any) => {
    formik.setFieldValue("pincode", item["id"]);
    setTimeout(() => {
      formik.setTouched({ ...formik.touched, cityId: true });
    });
  };

  const handlePhoneChange = (value: string, countryData: any) => {
    const parsedNumber: any = parsePhoneNumberFromString("+" + value);
    formik.setFieldValue("phoneNumber", value);
    setFormattedPhoneNumber(parsedNumber?.nationalNumber);
  };

  useEffect(() => {
    if (!_.isEmpty(formik.values.countryId)) {
      let newData = fetchedStates.filter((stateItem: any) => {
        return stateItem["countryId"] == formik.values.countryId;
      });
      setAvailableStates(newData);
      setStateAvailable(true);
    } else {
      setAvailableStates([]);
      setStateAvailable(false);
    }

    if (!_.isEmpty(formik.values.stateId)) {
      let newData = fetchedCities.filter((cityItem: any) => {
        return cityItem["stateId"] == formik.values.stateId;
      });
      setAvailableCities(newData);
      setCityAvailable(true);
    } else {
      setAvailableCities([]);
      setCityAvailable(false);
    }

    if (!_.isEmpty(formik.values.cityId)) {
      fetchPincodes(formik.values.cityId);
      setPincodeAvailable(true);
    } else {
      setAvailablePincodes([]);
      setPincodeAvailable(false);
    }
  }, [formik.values, editId, fetchedStates, fetchedCities]);

  useEffect(() => {
    if (!_.isEmpty(entryData) && !didSetInitialValues.current) {
      didSetInitialValues.current = true;
      for (let key in formik.values) {
        if (Object.keys(entryData).includes(key)) {
          formik.setFieldValue(key, entryData[key]);

          if (key == "status") {
            setStatus(entryData[key])
          }

          let callingCode;
          let fullNumber = "";
          if (!_.isEmpty(entryData["countryCode"])) {
            callingCode = getCountryCallingCode(entryData["countryCode"]);
            fullNumber = `+${callingCode} ${entryData["phoneNumber"]}`;
            formik.setFieldValue("phoneNumber", fullNumber);
          } else {
            setSelectedCountryCode("DE");
            formik.setFieldValue("phoneNumber", "");
          }
        }
      }

      // address addition
      const address = entryData.address[0];

      if (address) {
        formik.setFieldValue("street", address.street);
        formik.setFieldValue("flat", address.flat);
        formik.setFieldValue("services", address.services);
        formik.setFieldValue("addressId", address.id);
      }
    }
  }, [entryData]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("id");
    if (query) {
      setEditId(query);
      setDataLoaded(false);
      setError(false);
      fetchDataById(query);
    } else {
      setDataLoaded(true);
      setError(false);
      setEditId(null);
    }
  }, [location]);

  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchCities();
  }, []);

  return (
    <div className="add-subadmin-container">
      <div className="top-box mt-4">
        <Breadcrumb noLastIndex={false} />
      </div>

      <div className="add-subdmin-area page-area">
        <div className="head d-flex align-items-center">
          <div className="title-box">
            <h4 className="text-slate-900">
              {editId ? "Edit Customer" : "Add Customer"}
            </h4>
            <p className="text-slate-500 mt-2 fw-medium">
              {editId
                ? "Edit the below fields to update a customer"
                : "Fill the below fields to add a customer"}
            </p>
          </div>
          <div className="ms-auto">
            <Link
              to="/customers"
              className="btn btn-secondary text-white mw-auto"
            >
              <ListBulletIcon className="icon text-white" />
              <span className="ms-2 d-none d-md-inline-block">List</span>
            </Link>
          </div>
        </div>

        <div className="content">
          {!isDataLoaded && editId && <Loader />}

          <div className="card">
            <div className="card-body">
              <div className="form-area">
                <form
                  className="sign-in-form"
                  name="signInForm"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="row">
                    {formik.values.status == GENERAL_STATUS_LABEL.Deleted && (
                      <div className="col-sm-12">
                        <div
                          className="alert alert-danger d-flex align-items-center mb-4"
                          role="alert"
                        >
                          <div className="icon ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="bi flex-shrink-0 me-2"
                              viewBox="0 0 16 16"
                              role="img"
                              aria-label="Warning:"
                            >
                              <path
                                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <div> This account has been deleted by user</div>
                        </div>
                      </div>
                    )}

                    {formik.values.status == GENERAL_STATUS_LABEL.Blocked && (
                      <div className="col-sm-12">
                        <div
                          className="alert alert-danger d-flex align-items-center mb-4"
                          role="alert"
                        >
                          <div className="icon ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="bi flex-shrink-0 me-2"
                              viewBox="0 0 16 16"
                              role="img"
                              aria-label="Warning:"
                            >
                              <path
                                d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <div> This account has been blocked by admin</div>
                        </div>
                      </div>
                    )}

                    <div className="col-sm-12 col-md-6">
                      <div className="input-box">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="Enter First Name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.firstName}
                        />

                        {formik.touched.firstName &&
                          formik.errors.firstName && (
                            <p className="mt-2 text-sm text-danger">
                              {formik.errors.firstName}
                            </p>
                          )}
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="input-box">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter Last Name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.lastName}
                        />

                        {formik.touched.lastName && formik.errors.lastName && (
                          <p className="mt-2 text-sm text-danger">
                            {formik.errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="input-box">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter email"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          disabled={editId}
                        />

                        {formik.touched.email && formik.errors.email && (
                          <p className="mt-2 text-sm text-danger">
                            {formik.errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {!editId && (
                      <div className="col-sm-12 col-md-6">
                        <div className="input-box">
                          <label htmlFor="password" className="form-label">
                            Password
                          </label>
                          <div className="input-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              id="password"
                              placeholder="Enter password"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              value={formik.values.password}
                            />
                            <div
                              className="input-group-text"
                              onClick={() => {
                                setShowPassword(!showPassword);
                              }}
                            >
                              <span className="icon d-flex align-items-center icon-md pointer text-slate-700">
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                              </span>
                            </div>
                          </div>

                          {formik.touched.password &&
                            formik.errors.password && (
                              <p className="mt-2 text-sm text-danger">
                                {formik.errors.password}
                              </p>
                            )}
                        </div>
                      </div>
                    )}

                    <div className="col-sm-12 col-md-6">
                      <div className="input-box phone-box">
                        <label htmlFor="phoneNumber" className="form-label">
                          Contact Details
                        </label>
                        <PhoneInput
                          country={selectedCountryCode.toLowerCase()}
                          enableAreaCodes={false}
                          disableDropdown={true}
                          countryCodeEditable={false}
                          value={formik.values.phoneNumber}
                          onChange={(value, countryData) => {
                            handlePhoneChange(value, countryData);
                          }}
                        />
                        {formik.touched.phoneNumber &&
                          formik.errors.phoneNumber && (
                            <p className="mt-2 text-sm text-danger">
                              {formik.errors.phoneNumber}
                            </p>
                          )}
                      </div>
                    </div>

                    {formik.values.status !== GENERAL_STATUS_LABEL.Deleted && (
                      
                      <div className="col-sm-12 col-md-6">
                        <div className="input-box">
                          <StatusSwitch typeId={2} status={isStatus} onStatusChange={handleStatus} />
                        </div>
                      </div>
                      
                    )}

                  </div>

                  <div className="liner"></div>

                  <div className="row">
                    <div className="col-md-12 col-lg-6">
                      <h6 className="sub-head text-slate-500 fw-medium">
                        Primary Address
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="input-box">
                        <label htmlFor="flat" className="form-label">
                          Flat
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="flat"
                          placeholder="Enter address"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.flat}
                        />

                        {formik.touched.flat && formik.errors.flat && (
                          <p className="mt-2 text-sm text-danger">
                            {formik.errors.flat}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="input-box">
                        <label htmlFor="street" className="form-label">
                          Street
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="street"
                          placeholder="Enter address"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.street}
                        />

                        {formik.touched.street && formik.errors.street && (
                          <p className="mt-2 text-sm text-danger">
                            {formik.errors.street}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-12 col-md-6">
                      <div className="input-box">
                        <SearchDropdown
                          id="locationCountries"
                          label="Country"
                          placeholder="Search"
                          input={formik.values.countryId}
                          field="name"
                          field_id="id"
                          list={availableCountries}
                          onChange={handleCountry}
                        />
                        {formik.touched.countryId &&
                          formik.errors.countryId && (
                            <p className="mt-2 text-sm text-danger">
                              {formik.errors.countryId}
                            </p>
                          )}
                      </div>
                    </div>

                    {isStateAvailable && (
                      <div className="col-sm-12 col-md-6">
                        <div className="input-box">
                          <SearchDropdown
                            id="locationStates"
                            label="State"
                            placeholder="Search"
                            input={formik.values.stateId}
                            field="name"
                            field_id="id"
                            list={availableStates}
                            onChange={handleState}
                          />
                          {formik.touched.stateId && formik.errors.stateId && (
                            <p className="mt-2 text-sm text-danger">
                              {formik.errors.stateId}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {isCityAvailable && (
                      <div className="col-sm-12 col-md-6">
                        <div className="input-box">
                          <SearchDropdown
                            id="locationCities"
                            label="City"
                            placeholder="Search"
                            input={formik.values.cityId}
                            field="name"
                            field_id="id"
                            list={availableCities}
                            onChange={handleCity}
                          />
                          {formik.touched.cityId && formik.errors.cityId && (
                            <p className="mt-2 text-sm text-danger">
                              {formik.errors.cityId}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="col-sm-12 col-md-6">
                      <div className="input-box">
                        <SearchDropdown
                          id="pincode"
                          label="Pincode"
                          placeholder="Search"
                          input={formik.values.pincode}
                          field="name"
                          field_id="id"
                          list={availablePincodes}
                          onChange={handlePincode}
                        />
                        {formik.touched.pincode && formik.errors.pincode && (
                          <p className="mt-2 text-sm text-danger">
                            {formik.errors.pincode}
                          </p>
                        )}
                      </div>
                    </div>

                    
                  </div>

                  <div className="submit-box">
                    <SubmitButton
                      label={`${editId ? "Update" : "Add"} Customer`}
                      isSubmit={isFormSubmitted}
                      onSubmit={() => {
                        formik.handleSubmit();
                      }}
                    ></SubmitButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {isError && (
          <div className="alert alert-danger alert-table mt-4">
            Some error occurred
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCustomer;
