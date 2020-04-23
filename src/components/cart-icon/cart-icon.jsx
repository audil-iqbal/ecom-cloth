import React from 'react';
import { ReactComponent as Icon } from '../../assets/original.svg';
import { connect } from "react-redux";

import { toggleCartHidden } from "../../redux/cart/cart.actions";
import './cart-icon.scss';

const CartIcon = ({toggleCartHidden}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <Icon className='shopping-icon'/>
        <span className='item-count'>0</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(null,mapDispatchToProps)(CartIcon);   