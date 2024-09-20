import './App.css';
import  { useState ,useEffect } from 'react';
import Country from './Components/Country';
import City from './Components/City';
import Location from './Components/Location';
import Building from './Components/Building';

function App() {
  const [activeMenu, setActiveMenu] = useState("");
  const [activeList, setActiveList] = useState([]);

  async function selctMenu(menu) {
    if(!activeList.some(val =>val === menu)){
      setActiveMenu(menu);
      setActiveList(prev => [...prev, menu])
    }else setActiveMenu(menu);
  }

  async function removeActiveList(menu) {
    setActiveList(activeList.filter(val => val !== menu))
  }

  useEffect(()=>{
    if(activeList.length ===0){
      setActiveMenu("")
    }
  },[activeList])

  return (
    <div className="App">
      <div className="ActiveMenu">
        <div className='logoDiv'></div>
        <div className='flex-col'>
          {
            activeList.length > 0 && activeList.map((menu,i) => {
              return (
                <div className='activelist'><p className='activeName' onClick={()=>{setActiveMenu(menu)}}>{menu}</p><p className='cancel' onClick={()=>{removeActiveList(menu,i)}}>x</p></div>
                
              )
            })
          }
        </div>
      </div>
      <div className="Container">
        <div className="navContainer">
          <div className="navName" onClick={() => { selctMenu("Country") }}>Country</div>
          <div className="navName" onClick={() => { selctMenu("City") }}>City</div>
          <div className="navName" onClick={() => { selctMenu("Location") }}>Location</div>
          <div className="navName" onClick={() => { selctMenu("Building") }}>Building</div>
        </div>
        <div className="contentPart">
          {activeMenu === "Country" && <Country />}
          {activeMenu === "City" && <City />}
          {activeMenu === "Location" && <Location />}
          {activeMenu === "Building" && <Building />}
        </div>
      </div>
    </div>
  );
}

export default App;
