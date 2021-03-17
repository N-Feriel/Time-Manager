import React from 'react';
import styled from 'styled-components'
import { themeVars } from '../../utils/GlobalStyles';

function SelectedField({sources,name, label, handleChange, defaultValue}) {
    return (
        <FormFieldContainer>
            <label htmlFor={name}>{label}</label>
            
            <select name={name} onChange={handleChange} defaultValue={defaultValue}>
                    <option value="">--Please choose an option--</option>
                    {sources.map(source => {
                        return <option key={source._id}
                            value={source._id}
                            // selected={selectedValue === source._id}
                        
                        >{source.text}</option>;
                    })}
                </select>
        </FormFieldContainer>
    )
}


const FormFieldContainer = styled.div`
    display: flex;
    width: 40%;
    justify-content: center;
    align-items: baseline; 

    & select{
        margin: 10px;
        padding: 10px;
    }
    

`





export default SelectedField
