import React from 'react';
import styled from 'styled-components';
import CheckBoxField from './CheckBoxField';

import FormField from "./FormField";


function PersonnelForm({formData, handleChange, setFormData}) {

    const handleChangeObj= (ev)=>{
        const {value, name} = ev.target
        
        setFormData({
            ...formData,
            address:{
                ...formData.address,
                [name]: value
            } 
        });        
    }

    
    return (
        <Container>

            <div>
                <FormField 
                    name="first_name"
                    label="First Name"
                    type="text"
                    handleChange={handleChange}
                    value={formData.first_name}
                />
                <FormField 
                    name="last_name"
                    label="Last Name"
                    type="text"
                    handleChange={handleChange}
                    value={formData.last_name}
                />
            </div>

            <div>
                <FormField 
                    name="email"
                    label="Email"
                    type="email"
                    handleChange={handleChange}
                    value={formData.email}
                />

                <FormField 
                    name="phone"
                    label="Phone"
                    type="phone"
                    handleChange={handleChange}
                    value={formData.phone}
                />

            </div>

            <Container>
                    <div>
                        <FormField 
                            name="street"
                            label="Street"
                            type="text"
                            handleChange={handleChangeObj}
                            value={formData.address.street}
                        />
                        <FormField 
                            name="city"
                            label="City"
                            type="text"
                            handleChange={handleChangeObj}
                            value={formData.address.city}
                        />

                    </div>

                    <div>
                        <FormField 
                            name="state"
                            label="State/Province"
                            type="text"
                            handleChange={handleChangeObj}
                            value={formData.address.state}
                        />
                        <FormField 
                            name="zipCode"
                            label="zipCode"
                            type="text"
                            handleChange={handleChangeObj}
                            value={formData.address.zipCode}
                        />

                    </div>

                </Container>

                <CheckBoxField
                    name="isMember"
                    label="Member PPC"
                    type="checkbox"
                    defaultChecked={formData.isMember}
                    handleChange={handleChange}
                />

                
            
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    & div{
        display: flex;
    }
`

export default PersonnelForm
