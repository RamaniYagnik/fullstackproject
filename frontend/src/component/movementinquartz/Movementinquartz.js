import React, { useEffect, useState } from 'react';
import Api from '../../APIs/BackendApi';
import { Link } from 'react-router-dom';

const Movementinquartz = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const allowedCategories = ['chronograph', 'automatic', 'mechanical', 'smartwatches'];

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
    <div className="p-4">
      <h2 className="text-4xl italic font-semibold mb-6 text-center">Movement In Quartz</h2>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 h-[600px]">
          <div className="bg-gray-200 animate-pulse rounded-lg col-span-1 row-span-2"></div>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-full"></div>
          ))}
        </div>
      ) : (
        <div className="p-5 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-900">
          {categoryProduct.slice(0, 5).map((product, index) => (
            <Link
              to={`/productcategory?category=${product?.category}`}
              key={index}
              className={'relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300'}
              style={{ backgroundColor: '#374151' }}
            >
              <img
                src={product?.productImage?.[0]}
                alt={product?.category}
                className="w-full h-full bg-white opacity-50 object-contain hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center font-bold text-2xl capitalize text-white drop-shadow-md">
                {product?.category}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movementinquartz;
