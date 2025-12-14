import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";

import _ from "underscore";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

type TCustomDatePickerProps = {
  placeholder: string;
  name: string;
  input: any;
  minDate: Date;
  maxDate: Date;
  simple?: boolean;
  onlyTime?: boolean;
  onChange: (name: string, item: any) => void;
};

const CustomDatePicker = ({
  placeholder,
  name,
  input,
  minDate,
  maxDate,
  simple,
  onlyTime = false,
  onChange,
}: TCustomDatePickerProps) => {
  const datePickerRef = useRef(null);

  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
    setIsOpen(false);
    onChange(name, date);
  };

  const handleIconClick = () => {
    setIsOpen(true);
  };

  const clearDate = () => {
    setIsOpen(false);
    setSelectedDate(null);
    onChange(name, null);
  };

  useEffect(() => {
    if (input) {
      if (!onlyTime) {
        let parsedDate: any = moment(input, "DD-MM-YYYY").toDate();
        setSelectedDate(parsedDate);
      } else {
        let parsedDate: any = moment(input, "HH:mm").toDate();
        setSelectedDate(parsedDate);
      }
    } else {
      setSelectedDate(null);
    }
  }, [input]);

  return (
    <div className="custom-datepicker-container">
      <div className="input-group">
        <div
          className={`date-area ${simple && "simple"}`}
          onClick={handleIconClick}
        >
          <DatePicker
            selected={selectedDate}
            showTimeSelect={onlyTime}
            showTimeSelectOnly={onlyTime}
            timeIntervals={15}
            name={name}
            placeholderText={placeholder}
            onChange={handleDateChange}
            ref={datePickerRef}
            className="input pointer"
            minDate={minDate}
            maxDate={maxDate}
            dateFormat={onlyTime ? "HH:mm" : "dd-MM-yyyy"}
            readOnly
            open={isOpen}
            onClickOutside={() => setIsOpen(false)}
          />
        </div>
        <div
          className="input-group-text icon-box pointer"
          onClick={handleIconClick}
        >
          <CalendarIcon className="icon icon-md text-slate-700" />
        </div>
        <div
          className={`input-group-text icon-box close-box ${
            selectedDate ? "pointer text-danger-500" : "disabled"
          }`}
          onClick={clearDate}
        >
          <XMarkIcon className="icon icon-md" />
        </div>
      </div>
    </div>
  );
};

export default CustomDatePicker;
