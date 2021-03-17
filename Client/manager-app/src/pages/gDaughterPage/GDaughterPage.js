import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import RegisterPage from '../registerPage/RegisterPage';



function GDaughterPage() {

    const {_id} = useParams();

    const [statusGDData, setStatusGDData] = useState('loading');

    const [isUpdate, setIsUpdate] = useState(false);
    const [gDData, setGDData] = useState([])

    
    const getUserData = async()=>{
        try{
            const responseHeader = await fetch(`/api/users/infoGDaughter/${_id}`)

            const response = await responseHeader.json()

            if(response.status === 200){
                setGDData(response.data)
                setStatusGDData('idle')

            }else{
                throw(response.message)
            }


        } catch(error){
            console.log(error)
            setStatusGDData('error')
        }
    }

    useEffect(() => {        
        getUserData()
    }, [])




    if(statusGDData === 'loading'){
        return(
            <div>Loading...</div>
        )
    }

    else if(statusGDData === 'error'){
        return(
            <div>Error...</div>
        )
    }



    else if(statusGDData === 'idle' && gDData ){

        return (
            <div>
                <div style={{margin: '20px', border:'solid 2px', padding: '10px'}}>
                    <h4>{gDData.first_name}</h4>

                    <h4>Details:</h4>

                    <span>
                        <strong>
                            Name:
                        </strong>
                        {gDData.first_name} {gDData.last_name}
                    </span>
                    <br></br>

                    <span>
                        <strong>
                            Email:
                        </strong>
                        {gDData.email}
                    </span>
                    <br></br>

                    <span>
                        <strong>
                            Phone:
                        </strong>
                        {gDData.phone} 
                    </span>
                    <br></br>

                </div>

                {!isUpdate  && 

                    <button onClick ={()=> setIsUpdate(!isUpdate)}>
                        Update 
                    </button>
                }

                {isUpdate  && 
                    <RegisterPage initialState={gDData} isUpdate isGDaughter/>

                }


            </div>
        )
    }
}

export default GDaughterPage
