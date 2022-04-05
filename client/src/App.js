import Header from "./components/Header/Header";
import Signin from "./pages/SignIn/Signin";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>

      <div className="App">
            <Header />
            <Routes>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Home/>}/>
            </Routes>
          
      </div>
    </Router>
    
  );
}

export default App;
