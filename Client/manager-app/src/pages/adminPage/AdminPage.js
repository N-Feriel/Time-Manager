import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";

import {requestGMotherData, 
    receiveGMotherData,
    receiveGMotherDataError
    }from "../../store/reducers/GMother/actions"

import {requestGDaughterData,
    receiveGDaughterData,
    receiveGDaughterDataError}from "../../store/reducers/GDaughter/actions";

import {
    requestEventData, receiveEventData,
    receiveEventError
}from "../../store/reducers/Events/actions";

import GmotherList from './components/GmotherList';
import GdaughterList from './components/GdaughterList';
import styled from 'styled-components';
import { themeVars } from '../../utils/GlobalStyles';
import EventsList from './components/EventsList';




function AdminPage() {

    const dispatch = useDispatch();
    
    let history = useHistory();

    const getGMothersData = ()=>{

        dispatch(requestGMotherData())
        
        fetch('/api/users/infoGMother')
        .then(res => res.json())
        .then((json) => {
            dispatch(receiveGMotherData(json.data))
        })
        .catch((error) =>{
            console.log('error in request', error)
            dispatch(receiveGMotherDataError(error))
        })
    }

    const getGDaughtersData = ()=>{
        dispatch(requestGDaughterData())
        
        fetch('/api/users/infoGDaughter')
        .then(res => res.json())
        .then((json) => {
            dispatch(receiveGDaughterData(json.data))
        })
        .catch((error) =>{
            console.log('error in request', error)
            dispatch(receiveGDaughterDataError(error))
        })
    }


    const getEventsData = ()=>{
        dispatch(requestEventData())
        
        fetch('/api/event')
        .then(res => res.json())
        .then((json) => {
            dispatch(receiveEventData(json.data))
        })
        .catch((error) =>{
            console.log('error in request', error)
            dispatch(receiveEventError(error))
        })
    }


    const handleNewUser =(user) =>{
        history.push(`/register/${user}`)
    }


    useEffect(() => {
        getGMothersData()
        getGDaughtersData()
        getEventsData()
    }, [])



    return (
        <div>

            <SideBar>
                <ul>
                    <li onClick={() => handleNewUser('gMother')}>
                        New GMother
                    </li>

                    <li onClick={() => handleNewUser('gDaughter')}>
                        New GDaughter
                    </li>

                    <li onClick={() => handleNewUser('event')}>
                        New Event
                    </li>

                </ul>

            </SideBar>
            Admin page

            <h2>
                GMother List 
            </h2>

            <GmotherList />

            <h2>
                GDaughter List 
            </h2>

            <GdaughterList />


            <h2>
                Events List 
            </h2>

            <EventsList />



        </div>
    )
    
}

const SideBar = styled.div`

    & ul{
        display: flex;
    }

    & li{

        padding: 10px;
        background-color: ${themeVars.lavender}
    }


`

export default AdminPage
