import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { userDataContext } from './UserContext.jsx'

export const ShopDataContext = createContext();

function ShopContext({ children }) {
    const [products, setProducts] = useState([]);
    const { serverURL } = useContext(authDataContext);
    const { userData } = useContext(userDataContext)
    const currency = '₹';
    const delivery_charge = 40;
    let [cartItem, setCartItem] = useState({});
    let [loading, setLoading] = useState(false)


    const getProducts = async () => {
        try {
            const response = await axios.get(`${serverURL}/api/product/getproducts`, { withCredentials: true });
            //console.log(response.data);
            setProducts(response.data);
        } catch (error) {
            //console.log("fetchProducts error", error);
            toast.error("Failed to fetch products");
        }
    };

    const addCart = async (itemId, size) => {
        if (!size) {
            //console.log("Select Product Size");
            return;
        }
        let cartData = structuredClone(cartItem)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData);
        if (userData) {
            setLoading(true)
            try {
                let result = await axios.post(serverURL + "/api/cart/add", { itemId, size }, { withCredentials: true })
                //console.log(result.data)
                toast.success("Product Added")
                setLoading(false)
            }
            catch (error) {
                //console.log(error)
                setLoading(false)
                toast.error("Add Cart Error")
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount
    }

    const getUserCart = async () => {
        try {
            const result = await axios.post(serverURL + '/api/cart/get', {}, { withCredentials: true })
            setCartItem(result.data)
        } catch (error) {
            //console.log(error)
        }

    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity
        setCartItem(cartData)

        if (userData) {
            try {
                await axios.post(serverURL + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
            } catch (error) {
                //console.log(error)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount

    }


    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        getUserCart()
    }, [])

    const value = {
        products,
        setProducts,
        getProducts,
        currency,
        delivery_charge,
        cartItem,
        setCartItem,
        addCart,
        getCartCount,
        loading,
        getUserCart,
        updateQuantity,
        getCartAmount
    };

    return (
        <ShopDataContext.Provider value={value}>
            {children}
        </ShopDataContext.Provider>
    );
}

export default ShopContext;
