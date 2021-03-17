import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import {themeVars} from "../../utils/GlobalStyles"

function NavBar() {

    const history = useHistory()
    return (
        <Wrapper>
            <h2 onClick={()=> history.push('/admin')}> 
                Logo
            </h2>

            
            <ul>
                <li className="register">
                    Register
                </li>

                <li onClick={() => history.push('/register/event')}>
                    Meeting
                </li>
            </ul>

            <div className='details'>  
                <div>
                    New GMother
                </div>
                <div>
                    New GDaughter
                </div>
            </div>



        </Wrapper>
    )
}


const Wrapper = styled.div`
    background-color: ${themeVars.darkBlue};
    color: ${themeVars.lavender};
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    & .details{
        display: none
    }

    & .register:hover > .details{
        color: red
    }



    & ul{
        display: flex;
    }
    & li{
        padding: 10px;
        cursor: pointer;
    }

`
export default NavBar
