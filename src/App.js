import './App.css';
import Mockman from "mockman-js";
import './fontawesome';
import {Route,Routes} from "react-router-dom"
import { LandingPage } from './pages/Landingpage/LandingPage';
import { Login } from './pages/Auth/Login';
import { Home } from './pages/Home/Home';
import { Bookmark } from './pages/Bookmark/Bookmark';
import { Explore } from './pages/Explore/Explore';
import {PostDetails} from './pages/Post/PostDetails';
import { Profile } from './pages/Profile/Profile';


function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/mockman" element={<Mockman/>}/>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/bookmark" element={<Bookmark/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/post/:id" element={<PostDetails/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/:userId" element={<Profile/>}/> 
        </Routes>
    </div>
  );
}

export default App;
