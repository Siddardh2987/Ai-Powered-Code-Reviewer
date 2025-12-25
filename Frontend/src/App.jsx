import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from '../components/Home';
import Review from '../components/Review';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/review" element = {<Review/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
