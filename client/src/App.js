import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  LandingPage  from './components/LandingPage';
import  Home  from './components/Home';
import { DogCreate } from './components/DogCreate';
import Detail from './components/Detail';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Dogs</h1>
        <Routes>
           <Route exact path='/' element={ <LandingPage/> } />
           <Route path='/home' element={ <Home/> } />
           <Route path='/dog' element={ <DogCreate/> } />
           <Route path='/home/:id' element={ <Detail/> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
