import React from 'react';
import styled from "styled-components";
import { themeVars } from "../../utils/GlobalStyles";

const FormField = ({ label, type, name, handleChange, value}) => {
    return (
        <FormFieldContainer>
            <Label htmlFor={name}>{label}</Label>
            <Input 
                name={name} 
                type={type} 
                value={value}
                onChange={handleChange}
        />
        </FormFieldContainer>
    );
};

const FormFieldContainer = styled.div`
    display: flex;
    width: 40%;
    flex-direction: column;
    justify-content: center;
    color: ${themeVars.darkBlue};
`

const Label = styled.label`
    margin: 20px 0 10px 20px;
`
const Input = styled.input`
    font-size: 1rem;
    height: 40px; 
    width: 90%;
    margin: 0 20px;
    color: ${themeVars.darkBlue};



`

export default FormField;