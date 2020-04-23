import React from 'react';

import './signinsignup.styles.scss';
import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

const SignInAndSignUpPage = () => (
    <div className='sign-in-sign-up'>
        <SignIn/>
        <SignUp/>
    </div>
)

export default SignInAndSignUpPage;