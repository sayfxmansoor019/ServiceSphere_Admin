import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type TTableSearchbarProps = {
    initialValue?: string,
    searchPlaceholder: string;
    size?: string;
    onChangeSearch: (value: string) => void;
}


const TableSearchbar = ({initialValue, searchPlaceholder, size="normal", onChangeSearch}: TTableSearchbarProps) => {

  const [inputValue, setInputValue] = useState("")

  useEffect(() => { 
    setInputValue("")
  }, [])

  useEffect(() => { 
    if(initialValue == "") {
      setInputValue("")
    }
  }, [initialValue])

  useEffect(() => { 
    onChangeSearch(inputValue)
  }, [inputValue])
    

  return (
    <div className={`search-bar table-search-bar ${size}`}>
      <form>
        <div className="input-box mb-0">
          <div className="input-group">
            <span className="input-group-text" id="search">
                <MagnifyingGlassIcon className="icon icon-md text-slate-700" />
            </span>
            <input
              type="text"
              className="form-control search"
              placeholder={searchPlaceholder}
              value={inputValue}
              onChange={(event:any) => {setInputValue(event.target.value)}}
              aria-label="search"
              aria-describedby="search"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default TableSearchbar