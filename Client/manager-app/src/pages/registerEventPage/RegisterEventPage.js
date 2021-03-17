import React, {useState} from 'react';
import { useHistory } from 'react-router';
import Button from '../../components/button/Button';
import FormField from '../../components/form /FormField';
import SelectedField from '../../components/form /SelectedField';


function RegisterEventPage() {


    const initialState = {
        name: "",
        participants:{
            numberOfParticipants: Number,
            participantsName:[]
        },
        time: Number,
        eventDate: '',
        type: ''


    }

    const history = useHistory()

    const [sources , setSources]= useState([
        { _id: "Met", name: "Meeting", text: "MEETING" },
        { _id: "Trn", name: "Training", text: "TRAINING" },
        { _id: "OneToOne", name: "OneToOne", text: "One To One"},
        { _id: "OTHR", name: "OTHERS", text: "OTHERS"},

    ]);

    const [errors, setErrors]= useState('');
    
    const [formData, setFormData] = useState(initialState);

    const url = "/api/event";

    const handleChange = (ev) => {

        const target= ev.target;
        
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
        const name= target.name

        setFormData({
            ...formData,
            [name]: value
        });

    };



        


    const handleSubmit = async(ev) =>{
        ev.preventDefault();

        // console.log(formData)

        try{
            const responseHeader = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })

            const response = await responseHeader.json()

            if(response.status === 201){
                history.push('/')

            }else{
                throw(response.message)
            }
        }catch(error){
                setErrors(errors)
            }

    }


    const handleChangeObj= (ev)=>{

        const target= ev.target;
        
        const value = target.type === 'checkbox' ? target.checked : target.value;
        
        const name= target.name


        setFormData({
            ...formData,
            participants:{
                ...formData.participants,
                [name]: value
            } 
        });
    }


    return (
        <div>
            Add new Event

            <form onSubmit={handleSubmit} style={{width: "90%"}} >

                <FormField 
                    name="name"
                    label="Name"
                    type="text"
                    handleChange={handleChange}
                    value={formData.name}
                />

                <SelectedField 
                    name="type"
                    label="Type"
                    type="text"
                    handleChange={handleChange}
                    value={formData.type}
                    sources={sources}
                
                />

                <FormField 
                    name="eventDate"
                    label="Date"
                    type="date"
                    handleChange={handleChange}
                    value={formData.eventDate}
                />
                <FormField 
                    name="numberOfParticipants"
                    label="Number Of Participants"
                    type="number"
                    handleChange={handleChangeObj}
                    value={formData.participants.numberOfParticipants}
                />
                <FormField 
                    name="time"
                    label="Time"
                    type="text"
                    handleChange={handleChange}
                    value={formData.time}
                />

                <Button type='submit'>
                    save
                </Button>



            </form>
        </div>
    )
}

export default RegisterEventPage
