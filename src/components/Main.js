import React from "react";
import axios from "axios";
import {FaWindowClose} from 'react-icons/fa'

export default function Main() {
  const baseUrl = "http://127.0.0.1:5000";
  const [todoList, setTodoList] = React.useState([]);
  const [newTask, setNewTask] = React.useState("")

  React.useEffect(() => {
    getTodos()
  }, []);

  function getTodos(){
    axios.get(`${baseUrl}/todos`).then((res) => {
      setTodoList(res.data.todos);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newTask === '') {
      return
    }
    axios.post(`${baseUrl}/todos`, { newTask }).then(res => {
      setTodoList([...todoList, res.data])
    })
    setNewTask('')
    getTodos()
  }

  function deleteTodo(){

  }

  function handleChange(e){
    setNewTask(e.target.value)
  }

  console.log(todoList)

  return (
    <div className="mt-[80px]">
      <div>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <h3 className="self-center text-[30px] mr-4">New Task:</h3>
          <input value={newTask} placeholder="New Task" className="bg-zinc-300 p-2 text-[20px]" onChange={e => handleChange(e)} />
          <button
            className="bg-zinc-300 text-[19px] p-2 hover:bg-zinc-600"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="mt-12 flex justify-center flex-col items-center">
        <h3 className="border-amber-600 border-solid border-b-2 text-4xl mb-6">Items to do</h3>
        <ul className="list-decimal">
          {todoList.map((todo, i) => {
            return (
            <li key={i} className="list-decimal text-[25px] flex items-center">
              {todo.task}
              <button className="p-2"><FaWindowClose onClick={(e) => deleteTodo(e)}/></button>
            </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}
