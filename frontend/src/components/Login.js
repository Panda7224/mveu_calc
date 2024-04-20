import React, {useState} from 'react';

function Login() {
    const[message, setMessage] = useState([])

    //авторизация администратора
    function Log() {
        const login = document.getElementById('login').value
        const password = document.getElementById('password').value
        const data = {
            login: login,
            password: password
        }
        console.log(data)

        const api = 'http://localhost:9001/login'
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
            if (result.token !== undefined) {
                localStorage.setItem('token', result.token)
            }
            setMessage(result.message)
        })
    }
    
    return (
    <>
      <h1>Администратор</h1>
      <input id='login' type='text' placeholder='Введите логин администратора'/>
      <input id='password' type='password' placeholder='Введите пароль администратора'/>
      <button onClick={Log}>Войти</button>
      <p>{message}</p>
    </>
    );
}

export default Login;