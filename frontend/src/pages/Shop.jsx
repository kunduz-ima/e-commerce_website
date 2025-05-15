import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input filed
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto pt-10">
        <div className="flex md:flex-row">
          {/* Продукты слева */}
          <div className="flex-1 p-3">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">{products?.length} Продуктов</h2>
            <div className="flex flex-wrap">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products?.map((p) => (
                  <div className="p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
  
          {/* Фильтры справа */}
          <div className="bg-[#f1f5f9] p-5 rounded-lg shadow-lg w-64 ml-4">
            <h2 className="text-lg font-bold text-white text-center py-2 bg-black rounded-full mb-4">
              Фильтры
            </h2>
  
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Категории</h3>
              {categories?.map((c) => (
                <div key={c._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`category-${c._id}`}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label
                    htmlFor={`category-${c._id}`}
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    {c.name}
                  </label>
                </div>
              ))}
            </div>
  
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Бренды</h3>
              {uniqueBrands?.map((brand) => (
                <div className="flex items-center mb-2" key={brand}>
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label
                    htmlFor={brand}
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    {brand}
                  </label>
                </div>
              ))}
            </div>
  
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Цена</h3>
              <input
                type="text"
                placeholder="Введите цену"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>
  
            <div>
              <button
                className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                onClick={() => window.location.reload()}
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;