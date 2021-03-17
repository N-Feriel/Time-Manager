import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';




function EventPage() {


    const {_id} = useParams();
    const [statusEvent, setStatusEvent] = useState('loading');
    const [eventData, setEventsData] = useState([])
    const [errors, setErrors]= useState('');

    const history = useHistory()



    const getEventData = async()=>{
        try{
            const responseHeader = await fetch(`/api/event/${_id}`)

            const response = await responseHeader.json()

            if(response.status === 200){
                setEventsData(response.data)
                setStatusEvent('idle')

            }else{
                throw(response.message)
            }


        } catch(error){
            console.log(error)
            setErrors(error)
            setStatusEvent('error')
        }
    }

    const handleUpdate =async(_id)=>{
        
        try{
            const responseHeader = await fetch(`/api/event/${_id}`,{
                method: 'PATCH',
                body: JSON.stringify(eventData),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            

            const response = await responseHeader.json()

            if(response.status === 201){
                setEventsData(response.data)
                setStatusEvent('idle')

            }else{
                throw(response.message)
            }


        } catch(error){
            console.log(error)
            setErrors(error)
            setStatusEvent('error')
        }
    }

    const handleDelete =async(_id)=>{

        try{

        const responseHeader = await fetch(`/api/event/${_id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })

        const response = await responseHeader.json()

        if(response.status === 200){
            history.push('/admin')

        }else{
            throw(response.message)
        }

        }catch(error){
            setStatusEvent('error')
            setErrors(error)
            
        }
    }



    useEffect(() => {        
        getEventData()
    }, [])



    if(statusEvent === 'loading'){
        return(
            <div>Loading...</div>
        )
    }

    else if(statusEvent === 'error'){
        return(
            <div>Error...
                <br></br>
                {errors}
            </div>
        )
    }
    else if(statusEvent === 'idle'){
        return (
            <div>
                <h4> evenet details
                    </h4>

                <span>
                    {eventData.name}
                </span><br></br>

                <span>
                    {eventData.time} min 
                </span> <br></br>

                <button onClick={() => handleUpdate(eventData._id)}>
                    Update
                </button>

                <button onClick={() => handleDelete(eventData._id)}>
                    Delete
                </button>

            </div>
        )

    }
}

export default EventPage
