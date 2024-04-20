import React from 'react';
import './Header.css';
import AdminBox from './AdminBox';

function Header({setPage, setModalBox}) {

  return (
    <div className="Header">
      <ul>
        <li onClick={() => setPage('Main')}>Калькуляторы</li>        
      </ul>
      <AdminBox setModalBox={setModalBox} setPage={setPage}/>
    </div>
  );
}

export default Header;