const PORT = 9001
const URLDB = 'mongodb://127.0.0.1:27017/bank'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')
const Admin = require('./models/Admin')
const User = require('./models/User')
const Calculator = require('./models/Calculator')

const app = express()

app.use(cors())
app.use(express.json())

const generateAccessToken = (id, login) => {
    const payload = {
        id, login
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

// калькулятор/админ
// const calc1 = new Calculator({name: "Ипотечный калькулятор", rate: 9,6, minimum: 100000}) //
// calc1.save() 
// console.log("Сохранен объект", calc1)
// const admin = new Admin ({login: "admin", password: "admin", email: "bank@bank.ru"}) 
// admin.save()

//авторизация администратора
app.post('/login', async (req, res) => {
    console.log(req.body)
    const {login, password} = req.body
    const admin = await Admin.findOne({login})
    if (!admin){
        return res.status(400).json({message: 'Пользователь не найден!'})
    }
    if (admin.password !== password){
        return res.status(400).json({message: 'Неверный логин или пароль!'})
    }
    const token = generateAccessToken(admin._id, admin.login)
    res.json({
        message: 'Добро пожаловать, администратор! Можете закрыть это окно',
        token: token
    })
})

//получение данных калькуляторов
app.get('/calculators', async (req, res) => {
    const products = await Calculator.find() 
    res.json({
        data: products
    })
})

//показ данных администратора
app.post('/admin', async (req, res) => {
    console.log(req.body)
    const {id} = req.body
    const admin = await Admin.findOne({_id: id})    
    res.json({
       email: admin.email,
    })
})

//создание нового калькулятора в бд
app.post('/newcalc', async (req, res) => {
    console.log(req.body)
    const {name, rate, minimum} = req.body
    const newcalc =  new Calculator ({name, rate, minimum})
await newcalc.save()
    res.json({
        message: 'Калькулятор успешно добавлен'
    })
})

//удаление калькулятора в бд
app.post('/deletecalc', async (req, res) => {
    console.log(req.body)
    const {id} = req.body
    console.log(id)
    const deletecalc = await Calculator.deleteOne({_id: id})
    console.log(deletecalc)
    res.json({        
        message: 'Калькулятор успешно удален'
    })
})

//изменение ставки калькулятора
app.post('/changerate', async (req, res) => {
    console.log(req.body)
    const {id, newrate} = req.body
    console.log(id, newrate)
    const update = await Calculator.findByIdAndUpdate(id, {rate: newrate})
    console.log(update)
    res.json({
      message: 'Калькулятор успешно обновлен'
    })
})

const start = async () => {
    try {
        await mongoose.connect(URLDB, {authSource: "admin"})       
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`))
    } catch (e) {
        console.log(e)
    }
}

start()