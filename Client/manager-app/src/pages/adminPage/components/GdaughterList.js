import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';

import styled from 'styled-components'
import { themeVars } from '../../../utils/GlobalStyles'

import {removeGDaughter} from '../../../store/reducers/GDaughter/actions'

function GdaughterList() {

    const {status, gDaughters} = useSelector(state=> state.gDaughter)
    const history = useHistory();
    const dispatch = useDispatch()


    const handleGDDetails = (_id)=>{

        history.push(`/infoDaughter/${_id}`)
    }

    const handleDelete =async(gDaughter)=>{

        const _id = gDaughter._id;

        try{

        const responseHeader = await fetch(`/api/users/infoGDaughter/${_id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })

        const response = await responseHeader.json()

        if(response.status === 200){

            dispatch(removeGDaughter(gDaughter))
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


    if(status === 'loading'){
        return(
            <div>
                ...Loading
            </div>
        )
    }
    if(status === 'error'){
        return(
            <div>
                ...error
            </div>
        )
    }
    if(status === 'idle'){
        
        return (
            <Wrapper>
                {gDaughters.map(gDaughter => (
                    <div key={gDaughter._id}>
                        <span>
                            {gDaughter.email}
                        </span>
                        <span>
                            {gDaughter.last_name}
                        </span>
                        <span>
                            {gDaughter.phone}
                        </span>

                        <button onClick={()=> handleGDDetails(gDaughter._id)}>Details</button>

                        <button onClick={() => handleDelete(gDaughter)}>Delete</button>
                    </div>
                )
                )}
                    
            </Wrapper>
    )
    }
}


const Wrapper = styled.div`
    align-items: center;

    & div{
        display: flex;
        padding: 0 20px;
        background-color: ${themeVars.PolishedPineColor};

    }

    & span{
        padding: 20px;

    }

    & button{
        margin: 10px
    }



`

export default GdaughterList
