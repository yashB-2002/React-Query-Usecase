import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const fetchProduct = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function Product() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    staleTime: 1000 * 60 * 2, 
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="product-details">
      <img src={data.image} alt={data.title} />
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <p>${data.price}</p>
    </div>
  );
}

export default Product;
