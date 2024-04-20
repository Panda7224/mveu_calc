import React from 'react';

function Logout () {
  return (
    <div className='Logout'>
      <button onClick={() => localStorage.removeItem('token')}>Завершить работу</button>          
    </div>    
  );
}

export default Logout;