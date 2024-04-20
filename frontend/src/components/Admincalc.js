import React from 'react';

//настройка отдельных калькуляторов
function Admincalc ({id, name, rate, minimum, setModalBox}) {  
  
  //удаление калькулятора
  function DeleteCalc () {
    const data = {
      id: id        
    }
    //console.log(data)
    const api = 'http://localhost:9001/deletecalc'
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'    
      },
      body: JSON.stringify(data)
    })
    .then(result => result.json())
    .then((result) => {
      console.log(result)      
    })      
    setTimeout(() => {
      setModalBox('Message')
    }, 5)
  }
  
  //изменение ставки калькулятора
  function ChangeRate () {
    const newrate = document.getElementById(id).value
    const data = {
      id: id,
      newrate: newrate        
    }
    //console.log(data)
    const api = 'http://localhost:9001/changerate'
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'    
      },
      body: JSON.stringify(data)
    })
    .then(result => result.json())
    .then((result) => {
      console.log(result)      
    })      
    setTimeout(() => {
      setModalBox('Message')
    }, 5)
  }
 
  return (
    <div className="calcs" key={id}>
      <p>{name}</p>
      <p>Годовая ставка: {rate} %</p>
      <p>Минимальный размер кредита: {minimum} руб.</p>
      <input id={id} type='number'placeholder='Новая ставка' required />
      <button onClick={ChangeRate}>Изменить ставку</button>
      <button onClick={DeleteCalc}>Удалить калькулятор</button>      
    </div>  
  );
}

export default Admincalc;