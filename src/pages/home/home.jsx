import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleGo = () => {
    if (code.trim()) {
      navigate(`/hoa-don/${code.trim()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGo();
    }
  };

  return (
    <div className='home-page'>
      <div className='home-card'>
        <h2 className='home-title'>Xem hóa đơn</h2>
        <input
          type='text'
          placeholder='Nhập mã hóa đơn...'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyPress={handleKeyPress}
          className='home-input'
        />
        <button onClick={handleGo} className='home-button'>
          Xem
        </button>
      </div>
    </div>
  );
};

export default Home;
