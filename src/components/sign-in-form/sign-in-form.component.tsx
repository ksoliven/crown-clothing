import { useState, FormEvent, ChangeEvent } from "react";

import {
    googleSignInStart,
    emailSignInStart,
} from '../../store/user/user.action';


import FormInput from "../form-input/form-input.component";

import './sign-in.form.style.tsx';

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useDispatch } from "react-redux";
import { ButtonsContainer, SignInContainer } from "./sign-in.form.style";


const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });

    };

    return (
        <SignInContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <ButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;