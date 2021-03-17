import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { themeVars } from '../../../utils/GlobalStyles';



function EventsList() {

    const {status, events} = useSelector(state=> state.event)

    const history = useHistory();

    const handleEventDetails = (_id)=>{

        history.push(`/event/${_id}`)
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
            list of all events and meetings

            {events.map(event => (
                <div key={event._id}
                    onClick={() => handleEventDetails(event._id)}
                >
                    <span>{event.name}</span>
                    <span>{event.type}</span>
                    <span>{event.eventDate}</span>
                    <span>{event.participants.numberOfParticipants}</span>
                </div>
            ))}
        </Wrapper>
    )
}}


const Wrapper = styled.div`
    align-items: center;

    & div{
        display: flex;
        padding: 0 20px;
        background-color:${themeVars.darkBlue};
        color: white

    }

    & span{
        padding: 20px;
    }

`

export default EventsList
