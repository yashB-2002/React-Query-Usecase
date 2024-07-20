import { useQuery } from '@tanstack/react-query'

const useProducts = () => {
    const fetchProducts = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    };
  
    const query = useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
      staleTime:1000*60*2
    });
  
    return {
      data: query.data,
      isPending: query.isLoading,
      isError: query.isError,
      error: query.error,
    };
  };

export default useProducts;
