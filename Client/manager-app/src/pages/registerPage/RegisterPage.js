import React, {useState} from 'react'
import FormField from '../../components/form /FormField';
import { useHistory } from "react-router-dom";

import Button from "../../components/button/Button"
import styled from 'styled-components';
import CheckForm from '../../components/form /checkForm';
import CheckBoxField from "../../components/form /CheckBoxField"
import PersonnelForm from '../../components/form /PersonnelForm';
import SelectedField from '../../components/form /SelectedField';
import FromRegisterM from './components/FromRegisterM';
import GDaughterForm from '../gDaughterPage/components/GDaughterForm';



function RegisterPage({initialState, isUpdate, isGDaughter}) {

    let history = useHistory();


    const [errors, setErrors]= useState('');
    
    const [formData, setFormData] = useState(initialState);


    let url
    
    isGDaughter ? url= '/api/users/infoGMother/' :  url= '/api/users/infoGDaughter/';
    
    
    const [sources , setSources]= useState([
        { _id: "PPC", name: "PPC", text: "PPC" },
        { _id: "SITE", name: "SITE", text: "SITE" },
        { _id: "FB", name: "Facebook", text: "Facebook"},
        { _id: "CLSC", name: "CLSC", text: "CLSC"},
        { _id: "OTHR", name: "OTHERS", text: "OTHERS"},

    ]);

    const handleChange = (ev) => {

        const target= ev.target;
        
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
        const name= target.name

        setFormData({
            ...formData,
            [name]: value
        });

        };



    const handleChangeCheckBox= (name, data)=>{

        if(data){
            setFormData({
                ...formData,
                [name]:[
                    ...data
                ]
            });
        }

    }
    
    console.log(formData)

    const handleSubmit = async(ev) =>{
        ev.preventDefault();

        let response = null

        try{
            if(!isUpdate){
                response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })

            }else{
                response = await fetch(`${url}/user`, {
                    method: 'PATCH',
                    body: JSON.stringify(formData),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })

            }

            const responseBody = await response.json()

            if(responseBody.status === 201){
                history.push('/admin')

            }else{
                throw(responseBody.message)
            }

            }catch(error){
                setErrors(error)
        }
    }
    return (
        <Wrapper >
            {errors &&
            <div style={{color: 'red'}}> {errors}
                </div>
            }

            {!isUpdate && 
                <h4>
                    Register New {isGDaughter ? 'gDaughter' : "gMother"} 
                </h4>
            
            }

            <form onSubmit={handleSubmit} style={{width: "90%"}} >

                <PersonnelForm formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChange}
                />

                <SelectedField 
                    name="origin"
                    label="Source"
                    type="text"
                    selectedValue={formData.origin}
                    handleChange={handleChange}
                    defaultValue={formData.origin}
                    sources={sources}
                
                />



                {isGDaughter ? 
                    <GDaughterForm formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChange}
                        handleChangeCheckBox={handleChangeCheckBox}
                    />
                    : 
                    <FromRegisterM formData={formData}
                    handleChange={handleChange}
                    handleChangeCheckBox={handleChangeCheckBox}

                />
                    
                }

                <CheckBoxField
                    name="isActif"
                    label="Actif"
                    type="checkbox"
                    defaultChecked={formData.isActif}
                    handleChange={handleChange}
                />

                <Button type='submit'>
                    {isUpdate ? "Update": "Submit"}
                </Button>
                </form>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;


& .checkBox{
    width: 10px;
}

`
export default RegisterPage
 