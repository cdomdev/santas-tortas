import { useState } from "react";

const Search = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  return (
    <>
      <div className="hidden md:block cursor-pointer relative group" onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="30"
          height="30"
          strokeWidth="2"
          className="transition duration-200"
        >
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
          <path d="M21 21l-6 -6"></path>
        </svg>
        <span className="sr-only">Search</span>

        <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-300">
          Buscar
        </span>
      </div>

      {show && (
        <div className="fixed inset-0 flex items-start pt-10 justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-semibold text-gray-700">
                Buscar producto
              </h3>
              <button
                onClick={handleHide}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-full p-2 transition"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4">
              <form className="w-full">
                <label
                  form="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#eb9f48] focus:border-[#eb9f48] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar tortas, Postres..."
                    required
                  />
                  <button
                    type="submit"
                    className="text-black font-semibold absolute end-2.5 bottom-2.5 bg-secondary-bg hover:bg-[#d66a6e]  focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2"
                  >
                   Buscar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
