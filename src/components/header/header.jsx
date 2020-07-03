import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import  Icon from '../../assets/icon.png';
import { auth } from '../../firebase/firebase';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { createStructuredSelector } from "reselect";

import CartIcon from "../cart-icon/cart-icon.jsx";
import CartDropDown from "../cart-dropdown/cart-dropdown";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles';

const Header = ({currentUser,hidden}) => (
    <HeaderContainer>
        <LogoContainer to='/'>
             <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                <OptionLink as='div' onClick={()=> auth.signOut()}>SIGN OUT</OptionLink>
                :
                <OptionLink to='/signin'>SIGN IN</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden ?
            null : <CartDropDown/> 
        }
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
  });
  
export default connect(mapStateToProps)(Header);