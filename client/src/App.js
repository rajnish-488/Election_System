import Header from "./components/Header/Header";
import Signin from "./pages/SignIn/Signin";
import Admin from "./pages/Admin/AdminSingin";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Apply from "./pages/Apply";
import Voting from "./pages/Voting";
import Result from "./pages/Result";
import AdminPanal from "./pages/AdminPanal";
import ProfileChange from "./pages/ProfileChange";
import ProfileData from "./pages/ProfileData";

function App() {
  return (
    <Router>
      <div className="App">
            <Header />
            <Routes>
            <Route path="/adminpanal" element={<AdminPanal/>}/>
            <Route path="/apply" element={<Apply/>}/>
            <Route path="/voting" element={<Voting/>}/>
            <Route path="/result" element={<Result/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<ProfileData />}/>
            <Route path="/profilechange" element={<ProfileChange />}/>
            <Route path="/" element={<Home/>}/>
            </Routes>
      </div>
    </Router>
    
  );
}

export default App;
