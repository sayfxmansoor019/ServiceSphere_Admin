import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";

type TExportTableDataProps = {
  data: string[];
  type?: string;
  name?: string
};

const ExportTableData = ({ data, type, name }: TExportTableDataProps) => {
  const truncate = (str: string, max = 30000) =>
    str?.length > max ? str.slice(0, max) + "..." : str;

  const exportToExcel = () => {
    const flatData = data.map((row: any) => {
      const newRow: Record<string, any> = {};

      if (typeof row === "object" && row !== null) {
        for (const key in row) {
          if (key === "image") continue;

          const value = row[key];
          let safeVal =
            typeof value === "object" && value !== null
              ? JSON.stringify(value)
              : value;
          newRow[key] =
            typeof safeVal === "string" ? truncate(safeVal) : safeVal;
        }
      }

      return newRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(flatData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    const timestamp = new Date().toISOString().split("T")[0];
    const fileName = `${name}-${timestamp}.xlsx`;

    saveAs(blob, fileName);
  };

  return (
    <div
      className={`btn mw-auto o btn-md ${
        type == "primary" ? "btn-secondary text-white" : "btn-outline-slate"
      }`}
      onClick={exportToExcel}
    >
      <DocumentArrowUpIcon className="icon" />
      <span className="ms-2 d-none d-md-inline-block">Export</span>
    </div>
  );
};

export default ExportTableData;
