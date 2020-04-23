import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import { connect } from 'react-redux';
// import  Icon from '../../assets/icon.png';
import { auth } from '../../firebase/firebase';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from "../cart-icon/cart-icon.jsx";
import CartDropDown from "../cart-dropdown/cart-dropdown";

const Header = ({currentUser,hidden}) => (
    <div className='header'>
        <Link to='/'>
             <Logo/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={()=> auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
            hidden ?
            null : <CartDropDown/> 
        }
    </div>
)

const mapStateToProps = ({user,cart}) => ({
    currentUser: user.currentUser,
    hidden: cart.hidden,
  });
  
export default connect(mapStateToProps)(Header);