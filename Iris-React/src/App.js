import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import {Route,Routes, BrowserRouter as Router} from 'react-router-dom'
import Predict from './Pages/Predict/Predict';

function App() {

  return (
    <div>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/predict" element={<Predict/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
