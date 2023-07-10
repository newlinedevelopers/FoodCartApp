import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import ProfileInfo from './Components/ProfileInfo';
import Header from './Components/HomeContent/Header';
import Footer from './Components/HomeContent/Footer';
import MenuCard from './Components/Menu/MenuCard';
// import Dummy from './Components/Dummy';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Header />
                <Routes>
                <Route exact path="/" element={<HomePage/>} />
                <Route path="/menu" element={<MenuCard/>} />
                </Routes>
                <Footer />
              </>
            }
          />
          <Route path="/profile" element={<ProfileInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<CreateAccount />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
