import React, { useEffect, useState } from 'react'
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Todo = () => {
  //getting localStorage data
  const getLocalData =()=>{
    const lists =localStorage.getItem("mytodolist");
    if(lists){
      return JSON.parse(lists);
    }
    else
    {
      return []
    }
  };
  const[inputData, setInputData] = useState("");
  const [items,setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  
  //adding Items 
  const addItem =()=>{
    if(!inputData){
      alert('Please enter item..')
    }
    else if(inputData && toggleButton){
      setItems(
        items.map((curElem)=>{
         if(curElem.id===isEditItem){
             return {...curElem, name: inputData};
         }
         return curElem;
      })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleButton(false); 
    }
    else {
      const myNewInputData ={
        id: new Date().getTime().toString(),
        name: inputData,
      }
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };
  //editing/ updating items
  const editItem =(index)=>{
    const todo_edit = items.find((curElem)=>{
     return curElem.id === index;
    });   
    setInputData(todo_edit.name);
    setIsEditItem(index);
    setToggleButton(true);
  };
  //deleting particular Item
  const deleteItem =(index)=>{
  const updatedItem = items.filter((curElem)=>{
    return curElem.id !== index;
  });
  setItems(updatedItem);
  };
  // deleting all the Items
  const removeAll=()=>{
    setItems([]);
  }


  //setting up local Storage
   useEffect(()=>{
   localStorage.setItem("mytodolist", JSON.stringify(items));
   },[items]);
 
  return ( 
  <>
  <div className="container my-5 pt-5 main-head">
  <h1 className="display-5 fw-bold">Todo List</h1>
  <div className="col-lg-6 mx-auto">
      <p className="mb-5 todo-para">Manage your daily chores efficiently by adding your daily tasks</p>
    </div>
  </div>


   <div className="main-div mt-5">
      <div className="child-div">
         <img src="./images/to-tasks.svg" alt="todo-logo" />
         <h3 className="main-heading"><strong>Add your List Here</strong></h3>
    

        <div className="addItems">
         <input type="text" placeholder="📜 Add Item" className="form-control" value={inputData} 
          onChange={(event)=>setInputData(event.target.value)}/>

    
         {toggleButton? (<i className="far fa-edit add-btn input-btn" onClick={addItem}></i>) : 
         (<i className="fa fa-plus add-btn input-btn" onClick={addItem}></i>)
         }
          </div>
           
          <div className="showItems">
             {items.map((curElem)=>{
               return( 
                 <>
                 <div className="eachItem" key={curElem.id}>
                 <h3 className="tasks">{curElem.name}</h3>
                <div className="todo-btn">
                <i className="far fa-edit add-btn" 
               onClick={()=>editItem(curElem.id)}></i>
               <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
              </div>
              </div>
                 </>
               );
            
             })}
            </div>

          <div className="showItems">
           <button className="btn effect04" data-sm-link-text="Remove All" 
           onClick={removeAll}>
            <span><strong>CHECKLIST</strong></span>
           </button>
          </div>
      </div>

    </div>
  </>
  )
}

export default Todo
