import React, {useState, useEffect} from 'react';
import './Main.css';

function Main() {

  const[products, setProducts] = useState([])
  const [value, setValue] = useState('null');

  //получение данных калькуляторов из бд
  useEffect(() => {

    const api = 'http://localhost:9001/calculators'
    fetch(api)
    .then(result => result.json())
    .then((result) => {
        console.log(result)
        setProducts(result.data)        
    })
  }, [])  

  const options = products.map((item) => {
    return <option key={item._id} value={item._id}>{item.name}</option>;
  });

  //калькулятор выбран пользователем
  function Selected () {
    if (value !== 'null') {       
      const calculator = products.find((item) => item._id === value)
      const name = calculator.name
      const rate = calculator.rate
      const minimum = calculator.minimum      

      //расчет
      function Calculate () {
       const мonrate = rate / 12 / 100
       const price = document.getElementById('price').value
       const period = document.getElementById('period').value
       const starter = document.getElementById('starter').value    
       const credit = price - starter
       const totalrate = Math.pow((1 + мonrate), period * 12)
       const monpayment = credit * мonrate * totalrate / (totalrate - 1)
       const revenue = monpayment * 2.5      

       const datacredit = {
        price: price,
        period: period,
        starter: starter,
        credit: price - starter,
        totalrate: totalrate,
        monpayment: monpayment,
        revenue: revenue
       }
       console.log(datacredit)
       document.getElementById('credit').value = credit.toFixed(0);
       document.getElementById('monpayment').value = monpayment.toFixed(0);
       document.getElementById('revenue').value = revenue.toFixed(0);
       document.getElementById('totalrate').value = totalrate.toFixed(2);       
      }

      function Email () {
        const email = document.getElementById('email').value
        console.log (email)
      }

      return(
        <>
        <p>Выбранный кредит: {name}</p> 
        <p>Ставка по данному виду кредита: {rate} % годовых</p>              
        <h2>Калькулятор</h2>
        <div className='Calculate'>
        <label>
          Введите стоимость продукта/жилья/автомобиля (руб.): <input id='price' type='number' placeholder={minimum} min={minimum} required/>
        </label>
        <label>
          Введите срок, на который Вы хотите взять кредит (лет): <input id='period' type='number' placeholder='Срок кредита' min="0" required />
        </label>
        <label>
          Введите сумму, которую вы можете внести в качестве собственных средств (руб.): <input id='starter' type='number' placeholder='Первоначальный взнос' min='0' required />
        </label>
        <button onClick={Calculate}>Рассчитать</button>
        <h3>Результат</h3>
        <label>
          Величина кредита: <output id='credit'></output> руб.
        </label>
        <label>
          Общая ставка: <output id='totalrate'></output> %
        </label>
        <label>
          Ежемесячный платеж по кредиту: <output id='monpayment'></output> руб.
        </label>
        <label>
          Необходимый доход: <output id='revenue'></output> руб.
        </label>
        <p>
          <input id='email' type='email' placeholder='Адрес электронной почты'/>
          <button onClick={Email}>Отправить результаты расчета на почту</button>
        </p>
        </div>
        </>
      )
    }    
  }

  return (
    <div className="Main">
      <h1>Калькулятор кредитного продукта</h1>
      <p>Выберите в списке тот кредит, который Вас интересует</p>      
      <select value={value} onChange={(event) => setValue(event.target.value)}>
        <option defaultValue={'null'} disabled>Выберите калькулятор</option>
        {options}
      </select>
      <Selected />     
    </div>    
  );
}
 
export default Main;