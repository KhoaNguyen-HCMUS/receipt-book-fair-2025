import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Invoice from './pages/invoice/invoice.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hoa-don/:id' element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
