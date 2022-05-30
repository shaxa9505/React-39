import React, { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';
import BasketList from './BasketList';
import Cart from './Cart';
import GoodList from './GoodList';
import Loader from './Loader';
import {toast} from "react-toastify" 

function Shop(props) {

    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([])
    const [isBasket, setBasket] = useState(false)

    function addToBasket (item) {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)

        if(itemIndex < 0){
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem])
        } else{
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex){
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else{
                    return orderItem
                }
            })
            setOrder(newOrder)
        }

        toast.success("Sizni korzinangizga yangi narsa quwildi")
    }
    
    function handleBasket () {
        setBasket(!isBasket)

    }

    function removeFromPost (itemId) {
        const newOrder = order.filter(item => item.id !== itemId)
        setOrder(newOrder)
        toast.error("Sizni korzinangizdan nimadir narsa ucirildi")
    }

    function incrementQunatity(id) {
        const newOrder = order.map(item => {
            if(item.id === id){
                const newQuantity = item.quantity + 1
                return {
                    ...item,
                    quantity: newQuantity
                }
            }else{
                return item
            }
        })
        setOrder(newOrder)
    }

    function decremeentQunatity(id) {
        const newOrder = order.map(item => {
            if(item.id === id){
                const newQuantity = item.quantity - 1
                return {
                    ...item,
                    quantity: newQuantity >= 0 ? newQuantity : 0
                }
            }else{
                return item
            }
        })
        setOrder(newOrder)
    }

    useEffect(() => {
        fetch(API_URL, {
            headers: {
                Authorization:  API_KEY
            }
        })
        .then(response => response.json())
        .then(data => {
            data.featured && setGoods(data.featured)
            setLoading(false)
            console.log(data);
        })
    }, [])



    return (
        <div className="container content">
        <Cart quantity={order.length} handleBasket={handleBasket} />
            {loading ? <Loader /> : <GoodList goods={goods} addToBasket={addToBasket} />}
            {isBasket && <BasketList order={order} handleBasket={handleBasket} incrementQunatity={incrementQunatity} decremeentQunatity={decremeentQunatity} removeFromPost={removeFromPost} />}
        </div>
    );
}

export default Shop;