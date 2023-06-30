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
import { RequiresAuth } from './RequiresAuth';
import { useThemeContext } from './contexts/ThemeContext';
import { useEffect } from 'react';



function App() {
  const {isDark}=useThemeContext();
  useEffect(()=>{
    const root = document.documentElement;
    root.style.setProperty('--primaryBgColor',isDark?'#042f2e':'white');
    root.style.setProperty('--primaryTextColor',isDark?'white':'black');
    root.style.setProperty('--secondaryBgColor',isDark?'#1A5F7A':'#f1f5f9');
    root.style.setProperty('--navbarBgColor',isDark?'#042f2e':'white');
    root.style.setProperty('--secondaryTextColor',isDark?'white':'#4a044e');
    root.style.setProperty('--primaryBorderColor',isDark?'white':'#4a044e');
  },[isDark])

  return (
    <div className="App">
        <Routes>
          <Route path="/mockman" element={<Mockman/>}/>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Login/>}/>
          <Route path="/home" element={
          <RequiresAuth>
          <Home/>
          </RequiresAuth>
          }/>
          <Route path="/bookmark" element={
          <RequiresAuth>
            <Bookmark/>
            </RequiresAuth>
          }/>
          <Route path="/explore" element={
          <RequiresAuth>
              <Explore/>
              </RequiresAuth>
            }/>
          <Route path="/post/:id" element={
          <RequiresAuth>
            <PostDetails/>
          </RequiresAuth>
          }/>
          <Route path="/profile" element={
            <RequiresAuth>
              <Profile/>
            </RequiresAuth>
            }/>
          <Route path="/profile/:userId" element={
            <RequiresAuth>
            <Profile/>
            </RequiresAuth>
          }/> 
        </Routes>
    </div>
  );
}

export default App;
