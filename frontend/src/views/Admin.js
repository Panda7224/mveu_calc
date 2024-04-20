import React, { useState, useEffect } from 'react';
import './Admin.css';
import Admincalc from '../components/Admincalc'; 
import { jwtDecode } from 'jwt-decode'

function Admin({setModalBox}) {
  
  //показ админпанели только авторизованному админу
  function Adminpanel () {
    const token = localStorage.getItem('token')
    
    if (token !== null) {
      const login = jwtDecode(token).login
      const id = jwtDecode(token).id            
      const data = {
        id: id        
      }
    
      const api = 'http://localhost:9001/admin'
      fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'    
        },
        body: JSON.stringify(data)
      })
      .then(result => result.json())
      .then((result) => {
        const email = result.email
        document.getElementById('mail').innerText = "Электронная почта:  " + email
      })

      return (
      <>
      <p>Добро пожаловать, {login}</p>
      <p id='mail'></p>
      <p id='pass'></p>
      
      <h2>Калькуляторы</h2>
      <Calculators />

      <div className='Newcalc'>
        <h3>Добавление нового калькулятора</h3>
        <input id='namecalc' type='text' placeholder='Введите название' required />
        <input id='ratecalc' type='number'placeholder='Введите ставку' required />
        <input id='minimum' type='number'placeholder='Минимальный размер' required />
        <button onClick={NewCalc}>Добавить калькулятор</button>
      </div>  
      </>
      )
    } else {
      return <p>Авторизуйтесь, пожалуйста</p>
    }
  }

  //вывод всех калькуляторов из базы
  function Calculators () {
    const[datacalc, setDatacalc] = useState([])

    useEffect(() => {      
      const api = 'http://localhost:9001/calculators'      
      fetch(api)
      .then(result => result.json())
      .then((result) => {
        console.log(result) 
        setDatacalc(result.data)                 
      })
    }, [])

    return (
      <div>
        {datacalc.map((item) => <Admincalc key={item._id} id={item._id} name={item.name} rate={item.rate} minimum={item.minimum} setModalBox={setModalBox}/>)}
      </div>      
    )
  }
  
  //создание нового калькулятора
  function NewCalc () {
    const namecalc = document.getElementById('namecalc').value
    const ratecalc = document.getElementById('ratecalc').value
    const minimum = document.getElementById('minimum').value
    const data = {
      name: namecalc,
      rate: ratecalc,
      minimum: minimum
    }
    //console.log(data)
    const api = 'http://localhost:9001/newcalc'
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
    setTimeout(() => {setModalBox('Message')}, 5)
  }

  return (
    <div className="Admin">
      <h1>Панель администратора</h1>
      <Adminpanel />           
    </div>    
  );
}
 
export default Admin;