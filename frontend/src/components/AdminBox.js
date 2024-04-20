import React from 'react';
import './AdminBox.css';

function AdminBox({setModalBox, setPage}) {

  //панель администратора показывается только авторизованному администратору
  function Adm () {
    const newToken = localStorage.getItem('token')
    console.log(newToken)
    if (newToken === null) {
      return (
        <div className="AdminBox">
          <button onClick={() => setModalBox('Login')}>Администратор</button>          
        </div>
      )
    } else {
      return (
        <div className="AdminBox">
          <button onClick={() => setPage('Admin')}>Управление</button> 
          <button onClick={() => setModalBox('Logout')}>Выход</button>
        </div>
      )
    }
  } 

  return (
    <Adm/>    
  );
}

export default AdminBox;