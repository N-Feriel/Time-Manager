import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import GlobalStyles from './utils/GlobalStyles';
import {onSmallTabletMediaQuery} from './utils/responsive';

import NavBar from './components/navBar/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import AdminPage from './pages/adminPage/AdminPage';
import RegisterPage from './pages/registerPage/RegisterPage'
import GMotherPage from './pages/gMotherPage/GMotherPage';
import GDaughterPage from './pages/gDaughterPage/GDaughterPage';
import RegisterEventPage from './pages/registerEventPage/RegisterEventPage';
import EventPage from './pages/eventPage/EventPage';



function App() {

  const initialDataM = {email: "", first_name: '' ,
        last_name: '', phone:Number,
        address: {
            city:'', zipCode:'', street: '', state:''
        }, 
        isMember: Boolean, languages:[],
        origin:'', startDate:'', training:[],
        isActif: Boolean
      }; 


    const initialDataD = {email: "", first_name: '' ,
      last_name: '', 
      phone:Number,
      address: {
          city:'', 
          zipCode:'', 
          street: '', 
          state:''
      }, 
      isMember: Boolean,
      origin:'', 
      dueDate:'', 
      infoParent:{
          isContact: Boolean,
          name: ''
      },
      assignTo:{
        isAssign: Boolean,
        assignGM: ''
      },
      isActif: Boolean
  }; 

  return (
    <BrowserRouter>
      <GlobalStyles />
      <MarginRow>
        <NavBar/>

      </MarginRow>

      <Switch>
          <Route exact path="/" >
            <HomePage />
          </Route>
          <Route exact path="/login" >
            <LoginPage />
          </Route>

          <Route exact path="/admin">
            <AdminPage />
          </Route>

          <Route exact path="/register/gMother">
            <RegisterPage initialState = {initialDataM} />
          </Route>

          <Route exact path="/register/gDaughter">
            <RegisterPage initialState = {initialDataD} isGDaughter />
          </Route>

          <Route exact path="/register/event">
            <RegisterEventPage />
            
          </Route>
      
          <Route exact path="/infoMother/:_id">
            <GMotherPage />
          </Route>

          <Route exact path="/infoDaughter/:_id">
            <GDaughterPage />
          </Route>
          <Route exact path="/event/:_id">
            <EventPage/>
          </Route>






      </Switch>


    </BrowserRouter>
  );
}


const MarginRow = styled.div`
  ${onSmallTabletMediaQuery()} {
    margin-top: 48px;
  }
`;

export default App;
