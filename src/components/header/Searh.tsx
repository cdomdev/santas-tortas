import { useState, useEffect } from "react";
import { searchProducts } from "@/lib";
import type { Producto } from "@/types";
import { formateValue } from "@/utils";
const { PUBLIC_HOST } = import.meta.env;

const Search = () => {
  const [show, setShow] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Producto[]>([]);
  
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await searchProducts(searchTerm);
        setResults(response ?? []);
      } catch (error) {
        console.error("Error en la búsqueda de productos:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500); 

    // Limpia el timeout si el usuario sigue escribiendo
    return () => clearTimeout(delayDebounce); 
  }, [searchTerm]);

  return (
    <>
      <div
        className="hidden md:block cursor-pointer relative group"
        onClick={handleShow}
      >
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
              <label
                htmlFor="default-search"
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="search"
                  value={searchTerm}
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#eb9f48] focus:border-[#eb9f48] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Buscar tortas, postres..."
                />
              </div>

              {/* Mostrar resultados en tiempo real */}
              {isLoading && <p className="mt-4 text-gray-500">Buscando...</p>}
              {results.length > 0 && (
                <div className="mt-4 max-h-60 overflow-y-auto">
                  <h4 className="text-gray-700 font-medium">Resultados:</h4>
                  <div className="mt-2 space-y-2 flex flex-col">
                    {results.map((product) => (
                      <a
                        key={product.id}
                        href={`/detalle-producto/${product.slug}`}
                        className="border-b border-t flex items-center gap-x-3 p-3 jus"
                      >
                        <img
                          src={`${product.images?.[0]?.url ?? ""}`}
                          alt="image result"
                          className="w-10 h-10 rounded-full"
                        />
                        <p className="text-xs md:text-base text-balance">
                          - {product.title} -
                        </p>
                        <p className="text-xs md:text-base">
                          $ {formateValue(product.price)} -
                        </p>
                        <p className="text-xs md:text-base text-red-700">
                          {product.discount}%
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Mensaje si no hay resultados */}
              {!isLoading && searchTerm && results.length === 0 && (
                <p className="mt-4 text-gray-500">No se encontraron resultados.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
