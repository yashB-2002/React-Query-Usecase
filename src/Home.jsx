import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProducts from './hooks/useProducts';
import { useMutation } from '@tanstack/react-query';

function Home() {
    const { isPending, isError, error, data } = useProducts();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'New Product',
          price: 200,
          description: 'This is new product.',
          image: 'https://i.pravatar.cc',
          category: 'clothing',
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: () => {
      setModalOpen(true);
    },
  });

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {mutation.isLoading ? <p>Adding Product...</p> : (
        <>
          {mutation.isError && <p>{mutation.error.message}</p>}
          <button onClick={() => mutation.mutate()}>Add Product</button>
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                <p className='modal-p' >Product added successfully!</p>
              </div>
            </div>
          )}
        </>
      )}
      <div className='products'>
        {data.map(product => (
          <div key={product.id} className='product'>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price}</p>
            <button onClick={() => navigate(`/product/${product.id}`)}>View Product</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;




