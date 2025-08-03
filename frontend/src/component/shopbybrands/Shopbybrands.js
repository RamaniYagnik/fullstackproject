import React, { useEffect, useState } from 'react';
import Api from '../../APIs/BackendApi';
import { Link } from 'react-router-dom';

const Shopbybrands = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const allowedCategories = [
    'titan', 'fastrack', 'sonata', 'tommyhilfiger',
    'kenethcole', 'police', 'anneclien', 'kids',
    'raga', 'xylys', 'edge', 'nebula'
  ];

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(Api.category.url);
    const dataResponse = await response.json();
    setLoading(false);

    const filteredData = dataResponse.data.filter(product =>
      allowedCategories.includes(product.category)
    );
    setCategoryProduct(filteredData);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl italic font-semibold mb-6 text-center">Shop by Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {
          loading ? (
            [...Array(9)].map((_, index) => (
              <div key={index} className="bg-gray-200 h-60 rounded-lg animate-pulse"></div>
            ))
          ) : (
            categoryProduct.map((product, index) => (
              <Link
                to={`/productcategory?category=${product?.category}`}
                key={index}
                className="cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                  <img
                    src={product?.productImage?.[0]}
                    alt={product?.category}
                    className="w-full h-60 object-contain"
                  />
                  <div className="p-4 text-center text-lg font-semibold capitalize">
                    {product?.category}
                  </div>
                </div>
              </Link>
            ))
          )
        }
      </div>
    </div>
  );
};

export default Shopbybrands;