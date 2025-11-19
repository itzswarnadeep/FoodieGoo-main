import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
        setData(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        } else {
            navigate('/');
        }
    }, [token])

    if (!token) {
        return null;
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <div className="order-details">
                                <p className="order-items">
                                    {order.items.map((item, index) => {
                                        if (index === order.items.length - 1) {
                                            return item.name + " x " + item.quantity
                                        }
                                        else {
                                            return item.name + " x " + item.quantity + ", "
                                        }
                                    })}
                                </p>
                                <p className="order-amount">${order.amount}.00</p>
                                <p className="order-items-count">Items: {order.items.length}</p>
                                <p className="order-date">
                                    <span>&#x25cf;</span> 
                                    <b>{order.status}</b> 
                                    <span className="order-date-text">
                                        {new Date(order.date).toLocaleDateString()}
                                    </span>
                                </p>
                                <button onClick={fetchOrders}>Track Order</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
