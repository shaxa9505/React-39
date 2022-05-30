import React from 'react';
import BasketItem from './BasketItem';

function BasketList(props) {

    const {order, handleBasket} = props

    const totalPrice = order.reduce((sum, orderItem) => {
        return sum + orderItem.price * orderItem.quantity
    }, 0)

    return (
        <ul className="collection basket-list">
            <li className="collection-item active">
                Basket
            </li>

            {order.length ? order.map(item => {
                return (
                    <BasketItem key={item.id} {...item} decremeentQunatity={props.decremeentQunatity} incrementQunatity={props.incrementQunatity} removeFromPost={props.removeFromPost} />
                )
            }): <li>Basket is empty</li>}

            <li className="collection-item active">
                Total price {totalPrice} <b>$</b>
            </li>
            <i className="material-icons basket-close" onClick={handleBasket}>close</i>
        </ul>
    );
}

export default BasketList;