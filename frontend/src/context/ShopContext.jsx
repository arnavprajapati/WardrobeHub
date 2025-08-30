import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

export const ShopDataContext = createContext();

function ShopContext({ children }) {
    const [products, setProducts] = useState([]);
    const { serverURL } = useContext(authDataContext);
    const currency = '₹';
    const delivery_charge = 40;

    const getProducts = async () => {
        try {
            const response = await axios.get(`${serverURL}/api/product/getproducts`, { withCredentials: true });
            console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            console.log("fetchProducts error", error);
            toast.error("Failed to fetch products");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    const value = {
        products,
        setProducts,
        getProducts,
        currency,
        delivery_charge
    };

    return (
        <ShopDataContext.Provider value={value}>
            {children}
        </ShopDataContext.Provider>
    );
}

export default ShopContext;
