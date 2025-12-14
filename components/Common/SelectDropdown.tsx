import React, { useEffect, useState, useRef } from "react";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";

import _ from "underscore";

type TSelectDropdownProps = {
  id: string;
  label: string;
  placeholder: string;
  input: any;
  field: string;
  field_id: string;
  options: any;
  disabled?: boolean;
  onChange: (item: any) => void;
};

const SelectDropdown = ({
  id,
  label,
  placeholder,
  input,
  field,
  field_id,
  options,
  disabled,
  onChange,
}: TSelectDropdownProps) => {
  const [isDropDownExpanded, setDropDownExpanded] = useState(false);

  const [newDatalist, setNewDatalist] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any>("");

  const containerSimpleRef = useRef<any>(null);

  const handleDropDownSelect = () => {
    setDropDownExpanded(!isDropDownExpanded);
  };

  const handleSelectedItem = (snippet: any) => {
    const newData: any = newDatalist.map((item: any) => {
      if (item[field_id] === snippet[field_id]) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });

    setNewDatalist(newData);
    setSelectedItem(snippet);
    onChange(snippet);
  };

  useEffect(() => {
    // Function to handle click outside the component
    const handleClickOutside = (event: any) => {
      if (
        containerSimpleRef.current &&
        !containerSimpleRef.current.contains(event.target)
      ) {
        setDropDownExpanded(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let newData = [];

    if (!_.isEmpty(input) && !_.isEmpty(options)) {
      setTimeout(() => {
        newData = options.map((item: any) => {
          if (item[field_id] === input) {
            item.selected = true;
          } else {
            item.selected = false;
          }
          return item;
        });
        setNewDatalist(newData);
      }, 1000);

      let list: any = options?.filter((item: any) => {
        return item[field_id] == input.toString();
      });
      setSelectedItem(list[0]);
    } else {
      setNewDatalist(options);
    }



  }, [options, input]);

  return (
    <div className="search-dropdown-box">
      <div className="input-box mb-0">
        <label htmlFor={id} className="form-label">
          {label}
        </label>

        <div className="search-dropdown-area" ref={containerSimpleRef}>
          <div
            className={`input-group pointer ${disabled && "disabled"}`}
            onClick={handleDropDownSelect}
          >
            <input
              className="form-control pointer text-capitalize"
              type="text"
              name={id}
              placeholder={placeholder}
              value={selectedItem[field]}
              readOnly
            />
            <div className="input-group-text">
              <ChevronDownIcon className="icon icon-md text-slate-900" />
            </div>
          </div>

          <ul
            className={`dropdown-list shadow list-group ${
              isDropDownExpanded ? "d-block" : "d-none"
            } ${_.isEmpty(newDatalist) && "no-scroller"}`}
          >
            {newDatalist.map((item: any, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item pointer"
                  onClick={() => {
                    handleSelectedItem(item);
                  }}
                >
                  <div className="text-capitalize">{item[field]}</div>
                  {item.selected && (
                    <CheckIcon className="icon icon-md text-slate-900 ms-auto" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectDropdown;
