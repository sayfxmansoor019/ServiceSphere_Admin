import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import { ArrowsUpDownIcon, ListBulletIcon } from "@heroicons/react/24/solid";

import _ from "underscore";
import api from "../../../../api";

import TableSearchbar from "../../../components/Common/TableSearchbar";
import Loader from "../../../components/Common/Loader";
import Pagination from "../../../components/Common/Pagination";
import { PriceUnit } from "../../../components/Common/PriceUnit";
import moment from "moment";
import CustomStatusLabel from "../../../components/Common/CustomStatusLabel";
import Provider from "../../../assets/images/provider-avatar.png";
import Avatar from "../../../assets/images/avatar.png";

import {
  BOOK_SERVICE_STATUS_COLOR,
  BOOK_SERVICE_STATUS_LABEL,
} from "../../../constants";
import { hexToRgbWithOpacity } from "../../../components/functions/hexToRgbWithOpacity";

import CustomerInfoCard from "../../../components/Regulars/CustomerInfoCard";

const AllCustomersBookedServices = () => {
  const { recordsPerPage } = useAuth();

  const [initialData, setInitialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(recordsPerPage);
  const [searchInput, setSearchInput] = useState("");
  const [sortColumn, setSortColumn] = useState("email");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [isError, setError] = useState(false);

  const [queryId, setQueryId] = useState<any>(null);
  const [customerDetails, setCustomerDetails] = useState<any>(null);

  const fetchTableData = async (id: string) => {
    try {
      const response = await api.get(
        `/admin/customers/by-booked-services/${id}`
      );
      if (response.data) {
        setInitialData(response.data.fetchedData);
        setFilteredData(response.data.fetchedData); // Initially set filtered locations
        setDataLoaded(true);
        setError(false);
      }
    } catch (error) {
      setDataLoaded(true);
      setError(true);
    }
  };

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const sortDataColumn = (column: string, order: string) => {
    setSortColumn(column);
    setSortOrder(order);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getDate = (date: any) => {
    if (date) {
      return moment(date).format("yyyy-MM-DD");
    } else {
      return "-";
    }
  };

  const getBookStatusColor = (
    value: keyof typeof BOOK_SERVICE_STATUS_COLOR
  ) => {
    return BOOK_SERVICE_STATUS_COLOR[value];
  };

  const getBookStatusLabel = (
    value: keyof typeof BOOK_SERVICE_STATUS_LABEL
  ) => {
    return BOOK_SERVICE_STATUS_LABEL[value];
  };

  const fetchCustomer = async (id: string) => {
    try {
      const response = await api.get(`/admin/customers/${id}`);

      if (response.data) {
        setCustomerDetails(response.data.fetchedData);
      }
    } catch (error) {
      setDataLoaded(true);
      setError(true);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("id");
    setQueryId(query);
    if (query) {
      setDataLoaded(false);
      setError(false);
      fetchTableData(query);
      fetchCustomer(query);
    } else {
      setDataLoaded(true);
      setError(false);
    }
  }, [location]);

  //search filter
  useEffect(() => {
    const newFilteredData = initialData?.filter((item: any) => {
      return (
        item.serviceName.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.serviceProviderName.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.status.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.totalPayments.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    setFilteredData(newFilteredData);
    setCurrentPage(1);
  }, [searchInput]);

  const totalPages = Math.ceil(filteredData?.length / dataPerPage);

  const currentData = filteredData?.slice(
    (currentPage - 1) * dataPerPage,
    currentPage * dataPerPage
  );

  // Sorting
  useEffect(() => {
    const sortedData = [...filteredData].sort((a: any, b: any) => {
      const comparisonResult = a[sortColumn]?.localeCompare(b[sortColumn]);
      return sortOrder === "asc" ? comparisonResult : -comparisonResult;
    });
    setFilteredData(sortedData);
  }, [sortOrder, sortColumn]);

  return (
    <div className="customers-container">
      <div className="top-box mt-4">
        <Breadcrumb noLastIndex={false} />
      </div>

      {!isDataLoaded && <Loader />}

      {isDataLoaded && !isError && (
        <div className="locations-area page-area">
          <div className="head d-flex">
            <div className="title-box">
              <h4 className="text-slate-900">Customer #{queryId}</h4>
              <p className="text-slate-500 mt-2 fw-medium">
                List of services booked by customers
              </p>
            </div>
          </div>
          <CustomerInfoCard data={customerDetails} />
          <div className="content">
            <div className="d-flex">
              <TableSearchbar
                searchPlaceholder="Search by service name, address"
                onChangeSearch={handleSearch}
              />
              <div className="ms-auto">
                <Link
                  to="/customers"
                  className="btn btn-secondary text-white mw-auto"
                >
                  <ListBulletIcon className="icon text-white" />
                  <span className="ms-2 d-none d-md-inline-block">
                    Customers
                  </span>
                </Link>
              </div>
            </div>

            <div className="table-responsive">
              <div className="card table-card">
                <div className="card-body table-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>
                          <div className="d-flex">
                            <div>Service</div>
                            <div
                              className={`ms-2 sort-by ${
                                sortColumn === "serviceName" && "active"
                              }`}
                              onClick={() => {
                                sortDataColumn(
                                  "serviceName",
                                  sortOrder === "asc" ? "desc" : "asc"
                                );
                              }}
                            >
                              <ArrowsUpDownIcon className="icon icon-xs" />
                            </div>
                          </div>
                        </th>

                        <th>
                          <div className="d-flex">
                            <div>Start Date</div>
                            <div
                              className={`ms-2 sort-by ${
                                sortColumn === "startDate" && "active"
                              }`}
                              onClick={() => {
                                sortDataColumn(
                                  "startDate",
                                  sortOrder === "asc" ? "desc" : "asc"
                                );
                              }}
                            >
                              <ArrowsUpDownIcon className="icon icon-xs" />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="d-flex">
                            <div>End Date</div>
                            <div
                              className={`ms-2 sort-by ${
                                sortColumn === "endDate" && "active"
                              }`}
                              onClick={() => {
                                sortDataColumn(
                                  "endDate",
                                  sortOrder === "asc" ? "desc" : "asc"
                                );
                              }}
                            >
                              <ArrowsUpDownIcon className="icon icon-xs" />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="d-flex">
                            <div>Status</div>
                            <div
                              className={`ms-2 sort-by ${
                                sortColumn === "status" && "active"
                              }`}
                              onClick={() => {
                                sortDataColumn(
                                  "status",
                                  sortOrder === "asc" ? "desc" : "asc"
                                );
                              }}
                            >
                              <ArrowsUpDownIcon className="icon icon-xs" />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="d-flex">
                            <div>Contract</div>
                            <div
                              className={`ms-2 sort-by ${
                                sortColumn === "Contract" && "active"
                              }`}
                              onClick={() => {
                                sortDataColumn(
                                  "Contract",
                                  sortOrder === "asc" ? "desc" : "asc"
                                );
                              }}
                            >
                              <ArrowsUpDownIcon className="icon icon-xs" />
                            </div>
                          </div>
                        </th>
                        <th>
                          <div className="d-flex">
                            <div>Payment</div>
                            <div
                              className={`ms-2 sort-by ${
                                sortColumn === "totalPayments" && "active"
                              }`}
                              onClick={() => {
                                sortDataColumn(
                                  "totalPayments",
                                  sortOrder === "asc" ? "desc" : "asc"
                                );
                              }}
                            >
                              <ArrowsUpDownIcon className="icon icon-xs" />
                            </div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData?.map((item: any, index: number) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="d-flex">
                                <div className="image">
                                  <img
                                    src={
                                      item.serviceImage
                                        ? item.serviceImage
                                        : Provider
                                    }
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <div className="fw-medium text-slate-900">
                                    {item.serviceName}
                                  </div>
                                  <div className="t fw-light text-sm mt-1">
                                    {item.serviceProviderName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{getDate(item.startDate)}</td>
                            <td>{getDate(item.endDate)}</td>
                            <td>
                              <CustomStatusLabel
                                bgColor={hexToRgbWithOpacity(
                                  getBookStatusColor(item.status),
                                  0.1
                                )}
                                textColor={getBookStatusColor(item.status)}
                                label={getBookStatusLabel(item.status)}
                              />
                            </td>
                            <td className="text-center">
                              {item.filePath == "-" ? (
                                "-"
                              ) : (
                                <a href={item.filePath} target="_blank">
                                  View
                                </a>
                              )}
                            </td>
                            <td className="text-center">
                              {PriceUnit(item.totalPayments)}
                            </td>
                          </tr>
                        );
                      })}

                      {_.isEmpty(currentData) && (
                        <tr>
                          <td className="text-slate-500" colSpan={6}>
                            No records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {!_.isEmpty(currentData) && (
                    <Pagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                      dataLength={filteredData.length} // Use filtered data length
                      dataPerPage={dataPerPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div className="alert alert-danger alert-table mt-4">
          Some error occurred
        </div>
      )}
    </div>
  );
};

export default AllCustomersBookedServices;
