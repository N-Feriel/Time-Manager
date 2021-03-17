import React, {useState} from 'react';
import Button from '../../../components/button/Button';
import FormField from '../../../components/form /FormField';
import {login } from '../../../services/authService';

import { useSelector, useDispatch } from 'react-redux';
import {requestUsertData, 
    receiveUsertData, 
    receiveUserDataError } from '../../../store/reducers/user/actions'




function LoginForm() {

    const initialState = {email: "", password: '' };
    const dispatch = useDispatch();


    const [formData, setFormData] = useState(initialState);

    const handleChange = (ev) => {

        const { name, value } = ev.target;
        setFormData({
            ...formData,
            [name]: value
    });
    };



    const handleSubmit = async(ev) =>{
        ev.preventDefault();

        dispatch(requestUsertData('loading'))
        
        try {
            const response = await login(formData)

            const responseBody = await response.json()

            
            if(responseBody.status === 200 ){
                
                
                localStorage.setItem('token', responseBody.data)

                //push to home page 

                
            }else{
                throw(responseBody)
            }

            
        } catch (error) {
            console.log(error)
            if(error.status === 400){
                console.log(error.message)
                dispatch(receiveUserDataError(error.message))

            }

            }
    }


    return (
    

            <form onSubmit={handleSubmit}>
                <FormField 
                    name="email"
                    label="Email"
                    type="email"
                    handleChange={handleChange}
                    value={formData.email}
                />
                <FormField 
                    name="password"
                    label="Password"
                    type="password"
                    handleChange={handleChange}
                    value={formData.password}
                />

                <Button type='submit'>
                    Login
                </Button>

            </form>

        
    )
}

export default LoginForm
