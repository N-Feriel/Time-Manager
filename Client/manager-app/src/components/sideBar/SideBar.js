import React from 'react';
import styled from 'styled-components';
import {themeVars} from "../../utils/GlobalStyles"
import Button from '../button/Button';

import {IoPersonAdd} from 'react-icons/io5';
import {ImStatsBars2} from 'react-icons/im';
import {CgUserList, CgTimer} from 'react-icons/cg';
import {GiMedallist} from 'react-icons/gi'



function SideBar({handleNewUser, setValueList}) {
    return (
        <Container>

            <div  className='user'>
                <div className='imgAvatar'>
                    <span style={{margin:'auto'}}>FN</span>  
                </div>

                <h3>Name</h3>

            </div>

            <div className='links' >

                <div className='link openNav' onClick={() => setValueList('register')} >
                    <IoPersonAdd size='25px'/>
                    <h4>Register</h4>

                </div>

                <div className='link' onClick={() => setValueList('default')}>
                    <ImStatsBars2 size='25px'/>
                    <h4>Stats</h4>
                </div>

                <div className='link'  onClick={() => setValueList('gDaughter')}>
                    <CgUserList size='25px'/>
                    <h4>Clients List</h4>
                </div>

                <div className='link' onClick={() => setValueList('gMother')}>
                    <GiMedallist size='25px'/>
                    <h4>GMothers List</h4>
                </div>

            </div>

            {/* <Button className='openNav'>
                Register/Add 
            </Button> */}



            {/* <Button>
                Stats
            </Button>

            <Button onClick={() => setValueList('gMother')}>
                God-Mothers list
            </Button>

            <Button onClick={() => setValueList('gDaughter')}>
                God-Daughters List
            </Button> */}

            <div className='resetButton'>

                <CgTimer size="25px" />
                <h4>Rest Time </h4>
                    
            </div>


            <ul className='navigation'>
                    <li onClick={() => handleNewUser('gMother')}>
                    God-Mother
                    </li>

                    <li onClick={() => handleNewUser('gDaughter')}>
                    God-Daughter
                    </li>
                    <li onClick={() => handleNewUser('event')}>
                    Event
                    </li>
            </ul>



        </Container>
    )
}


const Container = styled.div`
    
    display: flex;
    min-height: 80vh;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255,255,255,0.2));
    border-radius: 2rem;
    

    & .imgAvatar{
        background: white;
        background: linear-gradient(to right bottom, rgba(209, 58, 58, 0.8), rgba(97, 103, 160,0.2));
        color: white;
        font-weight: 600;
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        display: flex;
        text-align: center;
    }

    & button{
        background-color: ${themeVars.red};
        width: 90%;
        color: ${themeVars.darkPink};
        border: none;
    }

    & .link{
        display: flex;
        align-items: center;
        margin: 1rem 0.5rem;
        padding: 0 0.5rem;
        color: ${themeVars.violet};
        text-align: center;

        & h4{
            padding: 0rem 0.8rem;
            color: rgba(40, 43, 71, 0.8);
            font-weight: 600;
            font-size: 1rem;
            
        }

    }

    & .openNav{
        margin-bottom: 0;
    }

    & .navigation{
        display: none; 

        & li{
            padding: 20px 50px;
            list-style: none;
        }

        & li:hover{
            background-color: ${themeVars.darkPink};
            color: white;

        }
    }

    & .openNav:hover > .navigation,
    .navigation:hover{
        display: block;
    }

    & .resetButton{
        background: linear-gradient(to right top, #F6C4C4, #6167A0);
        display: flex;
        align-items: center;
        padding: 1rem; 
        color: ${themeVars.pink};
        border-radius: 1.2rem;
        margin: 1rem;


        & h4{
            padding: 0rem 0.8rem;
            
        }

        &:hover{
            color: ${themeVars.red}; 
        }
    }





`


export default SideBar
