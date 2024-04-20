import React, {useState} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './views/Main';
import Admin from './views/Admin';
import ModalBox from './components/ModalBox';
import Login from './components/Login';
import Logout from './components/Logout';
import Message from './components/Message';

function App() {

  const[page, setPage] = useState('Main')
  const[modalBox, setModalBox] = useState('none')
      
  const pages = {
    Main: <Main  setModalBox={setModalBox} />,
    Admin: <Admin setPage={setPage} setModalBox={setModalBox} />
  }
  const modalBoxes = {
    none: null,
    Login: <ModalBox setModalBox={setModalBox}><Login /></ModalBox>,
    Logout: <ModalBox setModalBox={setModalBox}><Logout /></ModalBox>,
    Message: <ModalBox setModalBox={setModalBox}><Message /></ModalBox>
  }

  return (
    <div className="App">
      <Header  setPage={setPage} setModalBox={setModalBox}/>
      { pages[page] }
      { modalBoxes[modalBox] }
      <Footer />
   
    </div>
  );
}

export default App;
