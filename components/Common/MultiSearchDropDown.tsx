import { useEffect, useState, useRef } from "react";

import {
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import _ from "underscore";

type TSelectDropdownProps = {
  id: string;
  label: string;
  placeholder: string;
  value: any[];
  field: string;
  field_id: string;
  options: any;
  onChange: (item: any) => void;
  disabled?: boolean;
};

const MultiSearchDropDown = ({
  id,
  label,
  placeholder,
  value,
  field,
  field_id,
  options,
  onChange,
  disabled,
}: TSelectDropdownProps) => {
  const [isDropDownExpanded, setDropDownExpanded] = useState(false);
  const [newDatalist, setNewDatalist] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedItem, setSelectedItem] = useState([]);

  const containerSimpleRef = useRef<any>(null);

  // Debounced search to improve performance
  const debouncedHandleChange = _.debounce((value: any) => {
    const filtered: any = options.filter((item: any) => {
      return item[field].toLowerCase().includes(value.toLowerCase());
    });
    setNewDatalist(filtered);
    setDropDownExpanded(true);
  }, 300);

  const handleSelectedItem = (snippet: any) => {
    let snippetArray: any = [...selectedItem]; // Start with the existing selected items

    const newData: any = newDatalist.map((item: any) => {
      if (item[field] === snippet[field]) {
        item.selected = !item.selected;
      }
      return item;
    });

    if (snippet.selected) {
      let newSnippet = { ...snippet };
      delete newSnippet.selected;
      snippetArray.push(newSnippet); // 'selected' is only for internal purpose so removed
    } else {
      snippetArray = snippetArray.filter(
        (item: any) => item !== snippet[field]
      );
    }

    setDropDownExpanded(false);
    setSelectedValue("");
    setNewDatalist(newData);
    setSelectedItem(snippetArray);
    onChange(snippetArray);
  };

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
    if (event.target.value.length > 1) {
      debouncedHandleChange(event.target.value);
    } else {
      setDropDownExpanded(false);
      setNewDatalist(options);
    }
  };

  const deleteSnippet = (data: any) => {
    let snippetArray = selectedItem.filter((item) => item !== data);
    setSelectedItem(snippetArray);
    onChange(snippetArray);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerSimpleRef.current &&
        !containerSimpleRef.current.contains(event.target)
      ) {
        setDropDownExpanded(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let newData = [];
    let snippetArray = [];
    if (!_.isEmpty(value) && !_.isEmpty(options)) {
      newData = options.map((item: any) => {
        item.selected = value.some((v: any) => v[field_id] === item[field_id]);
        return item;
      });
      snippetArray = newData.filter((item: any) => item.selected);

      setNewDatalist(newData);
      setSelectedItem(snippetArray);
    } else if (_.isEmpty(value)) {
      setSelectedItem([]);
      newData = options.map((item: any) => {
        item.selected = false;
        return item;
      });
      setNewDatalist(newData);
    }
  }, [options, value]);

  return (
    <div className="search-dropdown-box">
      <div className="input-box mb-0">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <div className="search-dropdown-area" ref={containerSimpleRef}>
          <div className={`input-group ${disabled && "disabled"}`}>
            <div className="input-group-text">
              <MagnifyingGlassIcon className="icon icon-md text-slate-900" />
            </div>
            <input
              className="form-control text-capitalize"
              type="text"
              name={id}
              placeholder={placeholder}
              onChange={handleChange}
              value={selectedValue}
              readOnly={disabled}
              autoComplete="nope"
            />
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
                    <div className="icon icon-md ms-auto">
                      <CheckIcon />
                    </div>
                  )}
                </li>
              );
            })}

            {_.isEmpty(newDatalist) && (
              <li className="list-group-item text-slate-500">
                No records found
              </li>
            )}
          </ul>
        </div>

        {/* Display selected snippets */}
        <div className="snippet-area mt-2">
          {selectedItem.map((item, index) => (
            <div
              key={index}
              className="snippet d-inline-flex align-items-center"
            >
              <div className="me-1 text-sm">{item[field]}</div>
              <XMarkIcon
                className="icon icon-sm text-slate-700 mt-1"
                onClick={() => deleteSnippet(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiSearchDropDown;
