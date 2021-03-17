import React from 'react';
import styled from "styled-components";
import { themeVars } from "../../utils/GlobalStyles";

const CheckBoxField = ({ label, type, name, handleChange, value, defaultChecked}) => {
    return (
        <FormFieldContainer>
            <Input 
                name={name} 
                type={type} 
                // value={value}
                onChange={handleChange}
                defaultChecked={defaultChecked}
            />
            <Label htmlFor={name}>{label}</Label>
        </FormFieldContainer>
    );
};

const FormFieldContainer = styled.div`
    display: flex;
    width: 80%;
    align-items: baseline;
    color: ${themeVars.darkBlue};
    margin-top: 20px;
`

const Label = styled.label`
    margin: 20px 10px 20px 0;
`
const Input = styled.input`
    font-size: 1rem;
    margin: 10px;
    color: ${themeVars.darkBlue};

`

export default CheckBoxField;