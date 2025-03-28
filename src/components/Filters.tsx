import { useState, useEffect } from "react";
import type { Producto } from "@/types";

interface Props {
  products: Producto[];
  setCategory: (category: string) => void;
  setSort: (sort: string) => void;
}

const FilterParams = ({  products, setCategory, setSort }: Props) => {
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentSort, setCurrentSort] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [
        ...new Set(products.map((pro) => pro.category.name)),
      ];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCategory = event.target.value;
    setCurrentCategory(selectedCategory);
    setCategory(selectedCategory);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedSort = event.target.value;
    setCurrentSort(selectedSort);
    setSort(selectedSort);
  };

  return (
    <div className="w-full" id="aside-filters">
      <div className="w-full hidden md:flex flex-col px-4 py-5 gap-y-3">
        <h2 className="font-bold text-base md:text-xl border-b-2 pl-2 mb-1">
          Filtros
        </h2>

        {categories.length > 1 ? (
          <>
            {/* FILTRO POR CATEGORÍA */}
            <ul className="font-normal text-sm/10 border-b-2 border-r-2 h-auto py-4 px-2">
              <li>
                <input
                  type="radio"
                  name="category"
                  value=""
                  className="mr-2 cursor-pointer"
                  checked={currentCategory === ""}
                  onChange={handleCategoryChange}
                />
                Todas las categorías
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    className="mr-2 cursor-pointer"
                    checked={currentCategory === category}
                    onChange={handleCategoryChange}
                  />
                  {category}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}

        {/* ORDENAMIENTO */}
        <h2 className="font-bold text-base md:text-xl border-b-2 pl-2 mb-1">
          Ordenar por:
        </h2>
        <ol className="font-normal text-sm/10 border-b-2 border-r-2 h-auto py-4 px-2">
          <li>
            <input
              type="radio"
              name="sort"
              value="price:asc"
              className="mr-2 cursor-pointer"
              checked={currentSort === "price:asc"}
              onChange={handleSortChange}
            />
            Precio: menor a mayor
          </li>
          <li>
            <input
              type="radio"
              name="sort"
              value="price:desc"
              className="mr-2 cursor-pointer"
              checked={currentSort === "price:desc"}
              onChange={handleSortChange}
            />
            Precio: mayor a menor
          </li>
        </ol>
      </div>
    </div>
  );
};

export default FilterParams;
