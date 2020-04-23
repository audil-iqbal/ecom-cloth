import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import { connect } from 'react-redux';
// import  Icon from '../../assets/icon.png';
import { auth } from '../../firebase/firebase';

const Header = ({currentUser}) => (
    <div className='header'>
        <Link to='/'>
             HOME
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
        </div>
    </div>
)

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
  });
  
export default connect(mapStateToProps)(Header);