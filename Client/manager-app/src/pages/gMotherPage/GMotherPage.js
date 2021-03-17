import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import RegisterPage from '../registerPage/RegisterPage';



function GMotherPage() {

    const {_id} = useParams();

    const [statusGMData, setStatusGMData] = useState('loading');

    const [isUpdate, setIsUpdate] = useState(false);
    const [gMData, setGMData] = useState([])

    const getUserData = async()=>{
        try{
            const responseHeader = await fetch(`/api/users/infoGMother/${_id}`)

            const response = await responseHeader.json()

            if(response.status === 200){
                setGMData(response.data)
                setStatusGMData('idle')

            }else{
                throw(response.message)
            }


        } catch(error){
            console.log(error)
            setStatusGMData('error')
        }
    }

    useEffect(() => {        
        getUserData()
    }, [])



    if(statusGMData === 'loading'){
        return(
            <div>Loading...</div>
        )
    }

    else if(statusGMData === 'error'){
        return(
            <div>Error...</div>
        )
    }



    else if(statusGMData === 'idle' && gMData ){
        return (
            <div>
                <div style={{margin: '20px'}}>
                    <h4>{gMData.first_name}</h4>

                    <h4>Details:</h4>

                    <span>
                        <strong>
                            Name:
                        </strong>
                        {gMData.first_name} {gMData.last_name}
                    </span>
                    <br></br>

                    <span>
                        <strong>
                            Email:
                        </strong>
                        {gMData.email}
                    </span>
                    <br></br>

                    <span>
                        <strong>
                            Phone:
                        </strong>
                        {gMData.phone} 
                    </span>
                    <br></br>

                </div>

                {!isUpdate  && 

                    <button onClick ={()=> setIsUpdate(!isUpdate)}>
                        Update 
                    </button>
                }

                {isUpdate  && 
                    <RegisterPage initialState={gMData} isUpdate/>

                }


            </div>
        )
    }
}

export default GMotherPage
