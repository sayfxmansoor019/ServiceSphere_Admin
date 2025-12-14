import { useEffect, useState, useRef } from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import _ from "underscore";

type TSearchDropdownProps = {
  id: string;
  label: string;
  placeholder: string;
  input: string;
  field: string;
  field_id: string;
  list: any[];
  readonly?: boolean;
  onChange: (item: any) => void;
};

const SearchDropdown = ({
  id,
  label,
  placeholder,
  input,
  field,
  field_id,
  list,
  readonly = false,
  onChange,
}: TSearchDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [newDatalist, setNewDatalist] = useState<any[]>([]);
  const [isDropDownExpanded, setDropDownExpanded] = useState(false);
  const [isInputDisabled, setInputDisabled] = useState(false);

  const containerSimpleRef: any = useRef(null);

  const handleSelectedValue = (snippet: any) => {
    setSelectedValue(snippet[field]);
    onChange(snippet);
    setDropDownExpanded(false);
    setInputDisabled(true);
    setSelectedItem(snippet);
  };

  const handleChange = (event: any) => {
    if (event.target.value.length > 1) {
      const filtered = list.filter((item) =>
        item[field].toLowerCase().includes(event.target.value.toLowerCase())
      );
      setNewDatalist(filtered);
      setDropDownExpanded(true);
    } else {
      setDropDownExpanded(false);
      setNewDatalist(list);
    }
    setSelectedValue(event.target.value);
  };

  const clearSearch = () => {
    setSelectedValue("");
    onChange({});
    setInputDisabled(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerSimpleRef.current &&
        !containerSimpleRef.current.contains(event.target)
      ) {
        setDropDownExpanded(false);
        setTimeout(() => {
          if (_.isEmpty(selectedItem)) {
            setSelectedValue("");
          }
        }, 0);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedItem]);

  useEffect(() => {
    if (!_.isEmpty(input) && !_.isEmpty(list)) {
      let newList = list?.filter((item: any) => {
        return item[field_id] === input;
      });
      if (!_.isEmpty(newList)) {
        setSelectedValue(newList[0][field]);
        setSelectedItem(newList[0]);
        setInputDisabled(true);
      }
    } else {
      setSelectedValue("");
      setInputDisabled(false);
    }
  }, [list, input]);

  return (
    <div className="search-dropdown-box">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="search-dropdown-area" ref={containerSimpleRef}>
        <div className={`input-group ${readonly ? "no-event" : ""}`}>
          <span
            className={`input-group-text ${isInputDisabled ? "disabled" : ""}`}
          >
            <MagnifyingGlassIcon className="icon icon-md text-slate-700" />
          </span>

          <input
            className={`form-control text-capitalize ${
              isInputDisabled ? "disabled" : ""
            }`}
            type="text"
            name={id}
            value={selectedValue}
            onChange={handleChange}
            placeholder={placeholder}
            autoComplete="off"
            readOnly={isInputDisabled}
          />

          {isInputDisabled && (
            <span
              className={`input-group-text pointer ${
                isInputDisabled ? "disabled" : ""
              }`}
              onClick={clearSearch}
            >
              <XMarkIcon className="icon icon-md text-slate-900" />
            </span>
          )}
        </div>
        <ul
          className={`dropdown-list shadow list-group ${
            isDropDownExpanded ? "d-block" : "d-none"
          } ${_.isEmpty(newDatalist) && "no-scroller"}`}
        >
          {newDatalist.map((item, index) => {
            return (
              <li
                key={index}
                className="list-group-item pointer"
                onClick={() => {
                  handleSelectedValue(item);
                }}
              >
                {item[field]}
              </li>
            );
          })}

          {_.isEmpty(newDatalist) && (
            <li className="list-group-item text-slate-500">No records found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchDropdown;
