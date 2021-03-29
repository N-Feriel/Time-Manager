import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

function CheckForm({categories, name, dataForm, setdataForm, handleChangeCheckBox, defaultValue}) {

    const [checked, setChecked] = useState(dataForm); // categories


    useEffect(() => {
        handleChangeCheckBox(name, dataForm)
    }, [checked]);

    const handleToggle = c => () => {
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];
    
        if (clickedCategory === -1) {
            all.push(c);

        } else {
            all.splice(clickedCategory, 1);
        }
        
        
        setChecked(all);

        setdataForm(all)

        handleChangeCheckBox()

    };

    const showCategories = () => {

        return(
            <Wrapper>
                {categories.map((c, i) => (
                    <li key={i} className="list-unstyled">
                    <input
                        onChange={handleToggle(c._id)}
                        type="checkbox"
                        checked={defaultValue.includes(c._id)}
                    />
                    <label className="form-check-label">{c.name}</label>
                    </li>
        
                ))}
            </Wrapper>

        ) 
        }


    return (
        <div>
            <h4 style={{margin:'30px 0 5px 20px'}}>
                {name}
            </h4>
            {showCategories()}
        </div>
    )
}

const Wrapper = styled.div`

    display: flex;

    & li{
        list-style: none;
        padding: 10px 20px;

    }

`

export default CheckForm


