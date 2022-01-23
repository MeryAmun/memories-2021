import React, { useEffect, useState } from 'react'

import Alert from './Alert'
import List from './List'

const getLocaStorage = () => {
  let list = localStorage.getItem("list");
  if(list){
    return JSON.parse(localStorage.getItem("list"));
  }else{
    return []
  }
}


function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocaStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId,setEditId] = useState(null);
  const [alert, setAlert] = useState({show: false, msg:"", type:""});

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      //display alert
      showAlert(true, "danger", "please enter value" )
    }else if(name && isEditing){
   //deal with edit
   setList(list.map((item) => {
     if(item.id === editId){
       return {...item,title:name}
     }
     return item
   })
   );
   setName("");
   setEditId(null);
   setIsEditing(false);
   showAlert(true, 'success', "value edited");
    }else{
      //show alert
      showAlert(true, 'success', 'item added to list')
      const newItem = {id: new Date().getTime().toString(), title:name};
      setList([...list, newItem]);
      setName("");
    }
  }

const showAlert = (show=false, type="", msg="") =>{
  setAlert({show,type,msg});
};

//clear list 
const clearList = () => {
  showAlert(true, 'danger', 'list empty');
  setList([]);

};
//remove or delete item
const removeItem = (id) => {
  showAlert(true,'danger', 'item removed');
  setList(list.filter((item) => item.id !== id))
};
//edit Item

const editItem = (id) => {
  const specificItem = list.find((item) => item.id === id );
  setIsEditing(true);
  setEditId(id);
  setName(specificItem.title);
}

//save to lacal storage

useEffect(() => {
localStorage.setItem('list', JSON.stringify(list))
},[list])



  return <section className="section-center">
  <form className="grocery-form" onSubmit={handleSubmit}>
  {alert.show && <Alert {...alert} remAlert={showAlert}
  list={list}/>}
  <h3>grocery bud</h3>
  <div className="form-control">
  <input type="text" className="grocery" placeholder="e.g. eggs" 
  value={name} onChange={(e) => setName(e.target.value)}/>
  <button type="submit" className="submit-btn">
  {isEditing ? "edit" : "submit"}
  </button>
  </div> 
  </form>
  {
    list.length > 0 && (
      <div className="grocery-container">
  <List items={list} removeItem={removeItem} editItem={editItem}/>
  <button className="clear-btn" onClick={clearList}>clear items</button>
  </div>
    )
  }
  </section> 
}

export default App
