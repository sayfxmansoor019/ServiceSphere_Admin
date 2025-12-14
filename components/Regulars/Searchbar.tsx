import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Searchbar = () => {
  return (
    <div className="search-bar">
      <form>
        <div className="input-box mb-0">
          <div className="input-group">
            <span className="input-group-text" id="search">
                <MagnifyingGlassIcon className="icon icon-md text-slate-700" />
            </span>
            <input
              type="text"
              className="form-control input-lg search"
              placeholder="Search"
              aria-label="search"
              aria-describedby="search"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
