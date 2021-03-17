import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import { themeVars } from '../../../utils/GlobalStyles';
import GmotherDetails from './GmotherDetails';


function GmotherList() {

    const {status, gMothers} = useSelector(state=> state.gMother)


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
            <div style={{display: 'flex', 
                flexDirection:'column', 
                background:`${themeVars.middleRedColor}`}}>
                    
                {gMothers.map(gMother => 
                    <GmotherDetails 
                        key={gMother._id}
                        gMother={gMother} />
                )}

            </div>
        )
    }
}

export default GmotherList
