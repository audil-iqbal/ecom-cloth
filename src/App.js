import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage/homepage';
import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';
import SignInAndSignUpPage from './pages/signinsignup/signinsignup';
import { auth, createUserProfileDocument } from './firebase/firebase';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends Component {

  unsubscribe = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsubscribe = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        userRef.onSnapshot(snapShot => {
            setCurrentUser({
                id: snapShot.id,
                ...snapShot.data()
              });
            // console.log('create: ', this.state);
        })

      }
      else{
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render(){
    return (
        <div >
          <Header />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />      
            <Route exact path='/signin' render={()=> 
              this.props.currentUser ? 
              (<Redirect to='/'/>):(<SignInAndSignUpPage/>)} />      
          </Switch>
        </div>
    );  
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
