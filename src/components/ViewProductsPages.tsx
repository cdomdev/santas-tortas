import { useState, useMemo } from "react";
import type { Producto } from "@/types";
import { formateValue } from "@/utils";
import FilterParams from "./Filters";

type Props = {
  products: Producto[];
};

const ViewProducts = ({ products }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtrar por categoría
    if (selectedCategory) {
      filtered = filtered.filter(
        (prod) => prod.category.name === selectedCategory
      );
    }

    if (selectedSort === "price:asc") {
      filtered = [...filtered].sort(
        (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
      );
    } else if (selectedSort === "price:desc") {
      filtered = [...filtered].sort(
        (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
      );
    }

    return filtered;
  }, [products, selectedCategory, selectedSort]);

  return (
    <>
      <aside className="min-w-[20%]">
        <FilterParams
          products={products}
          setCategory={setSelectedCategory}
          setSort={setSelectedSort}
        />
      </aside>
      <article className="w-full">
        {filteredProducts.length > 0 ? (
          <div
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 p-2 w-full mb-7 md:mb-12"
            id="cards"
          >
            {filteredProducts.map((prod) => (
              <a
                key={prod.slug}
                href={`/detalle-producto/${prod.slug}`}
                className="card-producto rounded-sm flex justify-between flex-col h-auto md:w-[15em] max-h-[31em] border border-gray-200 transition duration-300 ease-in-out relative hover:shadow-lg"
              >
                <div
                  className={`${prod.discount ? "block" : "hidden"} absolute z-2 top-1 right-1`}
                >
                  <img
                    src="/bg-ofertas.webp"
                    alt="imagen-bacground-ofertas"
                    className="size-9"
                  />
                  <span className="font-bold text-base w-5 text-white px-5 border-dashed absolute z-3 top-2 right-1">
                    {prod.discount}
                  </span>
                </div>
                <div className="w-full h-40">
                  <picture>
                    <img
                      src={prod.images[0].url}
                      alt={`imagen-producto-${prod.title}`}
                      className="rounded-sm w-full h-full object-cover duration-150"
                    />
                  </picture>
                </div>
                <div className="flex flex-col items-center justify-center py-3">
                  <p className="text-primary-txt pt-1 font-semibold text-base text-balance px-2 text-center">
                    {prod.title}
                  </p>
                  <p className="text-gray-800 font-bold">
                    {prod.price ? formateValue(prod.price) : prod.price}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div
            className="flex justify-center w-full py-3 items-center"
            id="cards"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              width="24"
              height="24"
              strokeWidth="2"
              className="stroke-gray-700"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
            >
              <path d="M3 21l18 0" />
              <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
              <path d="M5 21l0 -10.15" />
              <path d="M19 21l0 -10.15" />
              <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
            </svg>
            <p className="text-gray-700 pl-1 text-xs md:text-sm">
              No hay productos disponibles
            </p>
          </div>
        )}
      </article>
    </>
  );
};

export default ViewProducts;
