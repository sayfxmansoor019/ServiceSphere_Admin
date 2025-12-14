import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Breadcrumb from "../../../components/Common/Breadcrumb";
import {
  PlusIcon,
  PencilIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/solid";

import _ from "underscore";
import api from "../../../../api";

import TableSearchbar from "../../../components/Common/TableSearchbar";
import Loader from "../../../components/Common/Loader";
import Pagination from "../../../components/Common/Pagination";
import ExportTableData from "../../../components/Common/ExportTableData";
import { PriceUnit } from "../../../components/Common/PriceUnit";
import Avatar from "../../../assets/images/avatar.png";
import {
  GENERAL_STATUS_LABEL,
  GENERAL_STATUS_LABEL_COLOR,
} from "../../../constants/various";
import CustomStatusLabel from "../../../components/Common/CustomStatusLabel";
import { hexToRgbWithOpacity } from "../../../components/functions/hexToRgbWithOpacity";

const AllCustomers = () => {
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

  const fetchTableData = async () => {
    try {
      const response = await api.get("/admin/customers");
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

  const getUrl = (id: string) => {
    return `/customers/booked-services?id=${id}`;
  };

  const getStatusColor = (value: keyof typeof GENERAL_STATUS_LABEL_COLOR) => {
    return GENERAL_STATUS_LABEL_COLOR[value];
  };

  const getStatusLabel = (value: keyof typeof GENERAL_STATUS_LABEL) => {
    return GENERAL_STATUS_LABEL[value];
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  //search filter
  useEffect(() => {
    const newFilteredData = initialData?.filter((item: any) => {
      return (
        item.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.cityName.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.numOfServices.toLowerCase().includes(searchInput.toLowerCase()) ||
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
      const comparisonResult = a[sortColumn].localeCompare(b[sortColumn]);
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
              <h4 className="text-slate-900">Customers</h4>
              <p className="text-slate-500 mt-2 fw-medium">
                List of customers available
              </p>
            </div>
          </div>
          <div className="content">
            <div className="d-flex">
              <TableSearchbar
                searchPlaceholder="Search by name, city"
                onChangeSearch={handleSearch}
              />
              <div className="ms-auto d-flex ">
                <Link
                  to="add"
                  className="btn btn-secondary text-white mw-auto btn-md me-3"
                >
                  <PlusIcon className="icon text-white" />
                  <span className="ms-2 d-none d-md-inline-block">Add</span>
                </Link>
                <ExportTableData data={filteredData} name="all-customers" />
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
                            <div>Customer</div>
                            <div
                              className={`ms-2 sort-by ${
                                sortColumn === "email" && "active"
                              }`}
                              onClick={() => {
                                sortDataColumn(
                                  "email",
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
                            <div>City</div>
                            <div
                              className={`ms-2 sort-by ${
                                sortColumn === "cityName" && "active"
                              }`}
                              onClick={() => {
                                sortDataColumn(
                                  "cityName",
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
                            <div>No of services</div>
                            <div
                              className={`ms-2 sort-by ${
                                sortColumn === "numOfServices" && "active"
                              }`}
                              onClick={() => {
                                sortDataColumn(
                                  "numOfServices",
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
                            <div>Total Payments</div>
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
                        <th scope="col">Actions</th>
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
                                    src={item.image ? item.image : Avatar}
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <div className="fw-medium text-slate-900">
                                    {item.fullName}
                                  </div>
                                  <div className="t fw-light text-sm mt-1">
                                    {item.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{item.cityName}</td>
                            <td>
                              <CustomStatusLabel
                                bgColor={hexToRgbWithOpacity(
                                  getStatusColor(item.status),
                                  0.15
                                )}
                                textColor={getStatusColor(item.status)}
                                label={getStatusLabel(item.status)}
                              />
                            </td>
                            <td className="text-center">
                              <Link
                                className="text-smr fw-medium underline"
                                to={getUrl(item.id)}
                              >
                                {item.numOfServices}
                              </Link>
                            </td>
                            <td className="text-center">
                              {PriceUnit(item.totalPayments)}
                            </td>
                            <td>
                              <Link
                                className="text-slate-700"
                                to={`edit?id=${item.id}`}
                              >
                                <PencilIcon className="icon icon-xs pointer" />
                              </Link>
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

export default AllCustomers;
