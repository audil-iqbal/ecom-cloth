import React from 'react';
import { connect } from "react-redux";

import CustomButton from '../custom-button/custom-button';
import CartItem from "../cart-item/cart-item";

import './cart-dropdown.scss';

const CartDropDown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                cartItems.map(item=> <CartItem key={item.id} item={item} /> )
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = ({cart}) => ({
    cartItems: cart.cartItems
});

export default connect(mapStateToProps)(CartDropDown);