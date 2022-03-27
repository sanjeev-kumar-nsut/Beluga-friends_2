import './App.css';
import './css/Login.css';
import Navbar from "./components/Navbar";
import Login from "./components/Login";


import { useEffect,useState } from 'react';

//for firebase
import db from "./firebase";
import { collection, onSnapshot,addDoc, doc } from 'firebase/firestore';

function App() {
  const [LoginData,setLoginData] = useState([]);
  console.warn(LoginData);
  useEffect(
    ()=> onSnapshot(collection(db,"login"),(snapshot) => 
      setLoginData(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
    ),
    []);

    const handleNew = async (name,email,pass) => {
      const collectionRef = collection(db,"login");
      const payload  = {name:name,email:email,password:pass};
      await addDoc(collectionRef,payload);
    }
  return (
    <>
    <Navbar/>
    <Login data = {LoginData} setData = {setLoginData} handleNew = {handleNew} />
    </>
  );
}

export default App;
