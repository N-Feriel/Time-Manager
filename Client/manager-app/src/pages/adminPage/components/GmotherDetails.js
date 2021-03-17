import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { themeVars } from '../../../utils/GlobalStyles'


import {removeGMother} from "../../../store/reducers/GMother/actions"

function GmotherDetails({gMother}) {

    const history = useHistory()

    const dispatch = useDispatch();

    const handleGMDetails = (_id)=>{

        history.push(`/infoMother/${_id}`)
    }

    const handleDelete =async(_id)=>{

        try{

        const responseHeader = await fetch(`/api/users/infoGMother/${_id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })

        const response = await responseHeader.json()

        if(response.status === 200){

            dispatch(removeGMother(gMother))
            console.log('removed')
            // alert(`Gmother with ${gMother.first_name} ${gMother.last_name} 
            // was deleted form Data Base`)

        }else{
            throw(response.message)
        }

        }catch(error){
            console.log(error)
        }
    }


    return (
        <Wrapper >
            <strong>
                {gMother.email}
            </strong>

            <span>
                {gMother.first_name} {gMother.last_name}
            </span>
            <span>
                {gMother.phone}
            </span>
            <button onClick={()=> handleGMDetails(gMother._id)}>Details</button>

            <button onClick={() => handleDelete(gMother._id)}>Delete</button>
            
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    border: solid 1px ${themeVars.secondGreen};
    padding: 0 20px;

    & span{
        padding: 20px;
    }

    & button{
        margin: 10px;
        padding: 5px;
    }



`
export default GmotherDetails
