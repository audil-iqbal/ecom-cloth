import React, { Component } from 'react';

import './sign-in.styles.scss';
import FormInput from '../form-input/form-input';
import { signInWithGoogle, auth } from '../../firebase/firebase';
import CustomButton from '../custom-button/custom-button';


class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }
    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try{
            await auth.signInWithEmailAndPassword(email,password);
            this.setState({email:'', password:''});
        }catch(err){
            console.log('login error: ',err);
            
        }

    }
    
    handleonChange = event => {
        const {value,name} = event.target;
        this.setState({ [name] : value});
        
    }

    render(){
        return (
            <div className='sign-in'>
                <h2> I have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        type='email' 
                        name='email' 
                        handleChange={this.handleonChange}
                        value={this.state.email} 
                        label='email' required
                    />
                    <FormInput
                        type='password' 
                        name='password' 
                        handleChange={this.handleonChange}
                        value={this.state.password}
                        label='password'
                        required/>
                    
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign in </CustomButton>                
                        <CustomButton onClick={signInWithGoogle} isGoogle>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;