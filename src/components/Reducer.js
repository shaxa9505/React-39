import { toast } from "react-toastify"

export default function Reducer(state, { type, payload }) {
    switch (type) {
        case "ADD_TO_BASKET": {
            const itemIndex = state.order.findIndex(
                (orderItem) => orderItem.id === payload.id
            );
            let newOrder = null;
            if (itemIndex < 0) {
                const newItem = {
                    ...state,
                    quantity: 1,
                };
                newOrder = [...state.order, newItem];
            } else {
                newOrder = order.map((orderItem, index) => {
                    if (index === itemIndex) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1,
                        };
                    } else {
                        return orderItem;
                    }
                });
            }
            toast.success('Goods added to basket successfully!')
            return {
                ...state,
                order: newOrder
            }
        }
        case "TOGGLE_BASKET":
            return {
                ...state,
                setBasketShow: !state.setBasketShow
            }
        case "REMOVE_FROM":
            toast.error('Goods deleted from basket successfully!')
            return {
                ...state,
                order: state.order.filter(item => item.id !== payload)
            }
        case "INCREMENT_QUANTITY":
            return {
                ...state,
                order: state.order.map(el => {
                    if (el.id === payload) {
                        const newQuantity = el.quantity + 1
                        return {
                            ...el,
                            quantity: newQuantity
                        }
                    } else {
                        return el
                    }
                })
            }
        case "DECREMENT_QUANTITY":
            return {
                ...state,
                order: state.order.map(el => {
                    if (el.id === payload) {
                        const newQuantity = el.quantity - 1
                        return {
                            ...el,
                            quantity: newQuantity >= 0 ? newQuantity : 0
                        }
                    } else {
                        return el
                    }
                })
            }
        default:
            return state
    }
}