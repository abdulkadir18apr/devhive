import './App.css';
import Mockman from "mockman-js";
import './fontawesome';
import {Route,Routes} from "react-router-dom"
import { LandingPage } from './pages/Landingpage/LandingPage';
import { Login } from './pages/Auth/Login';
import { Home } from './pages/Home/Home';


function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/mockman" element={<Mockman/>}/>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;
