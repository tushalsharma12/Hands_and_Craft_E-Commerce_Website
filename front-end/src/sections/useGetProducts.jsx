import { useState, useEffect } from 'react';
import axios from 'axios';



const useGetProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
        axios.get(url)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [url]);

  return { products, loading };
};

export default useGetProducts;

