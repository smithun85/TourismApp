
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import { useAuthContext } from './Hooks/useAuthContext';
import './App.css'
import Records from './Records/Records';
import AddLocation from './Pages/addlocation/AddLocation';
import Viewmore from './Pages/ViewMore/Viewmore';
import SignUpPopUp from './Pages/Signup/SignUpPopUp';
import LoginPopup from './Records/LoginPopup';


function App() {

  const {user} =useAuthContext();

  return (
    <div>
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/Signup' element = {!user ? <Signup /> : <Navigate to="/" />} />
          <Route path = '/Login' element = {!user ? <Login/> : <Navigate to="/locations" />}/>
          <Route path = '/locations' element = {<Records/>}/>

          {/* <Route path = '/AddLocation' element = { user ? <AddLocation/> : <Navigate to="/Login" />}/>
          <Route path = '/Viewmore' element = { user ? <Viewmore/> : <Navigate to="/Login" />} /> */}
      
          <Route path = '/AddLocation' element = {user ? <AddLocation/> : <Navigate to="/loginPopup" />}/>
          <Route path = '/Viewmore' element = {user ? <Viewmore/> : <Navigate to="/loginPopup" />} />

          <Route path = '/signUpPopUp' element = {<SignUpPopUp/>} />
          <Route path = '/loginPopup' element = {<LoginPopup/>} />
          
          {/* <Route path = '/locations' element = {<Form/>}/> */}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
