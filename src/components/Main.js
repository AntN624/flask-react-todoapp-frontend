import React from "react";
import axios from "axios";
import { FaWindowClose, FaRegEdit } from "react-icons/fa";

export default function Main() {
  const baseUrl = "http://127.0.0.1:5000";
  const [todoList, setTodoList] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");
  const [taskId, setTaskId] = React.useState(null);
  const [editTask, setEditTask] = React.useState("");

  React.useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    axios.get(`${baseUrl}/todos`).then((res) => {
      setTodoList(res.data.todos);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newTask === "" && !editTask){
      return
    }

    if (editTask) {
      axios.put(`${baseUrl}/todos/${taskId}`, { task: editTask }).then(res => {
        const newTodo = res.data.todo
        const updatedList = todoList.map(todo => {
          if (todo.id === taskId){
            return todo = newTodo
          }
          else{
            return todo
          }
        })
        setTodoList(updatedList)
      })

    } else {
      axios.post(`${baseUrl}/todos`, { newTask }).then((res) => {
        setTodoList([...todoList, res.data]);
      });
    }
    setNewTask("");
    setEditTask("")
    setTaskId(null)
  }

  function deleteTodo(id) {
    axios.delete(`${baseUrl}/todos/${id}`);
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
  }

  function editTodo(todo) {
    setTaskId(todo.id);
    setEditTask(todo.task)
  }

  function handleChange(e, type) {
    if (type === "new") {
      setNewTask(e.target.value);
    } else {
      setEditTask(e.target.value);
    }
  }

  return (
    <div className="mt-[80px]">
      {/* This is where the initial new task item starts*/}
      <div>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <h3 className="self-center text-[30px] mr-4">New Task:</h3>
          <input
            value={newTask}
            placeholder="New Task"
            className="bg-zinc-300 p-2 text-[20px]"
            onChange={(e) => handleChange(e, "new")}
          />
          <button
            className="bg-zinc-300 text-[19px] p-2 hover:bg-zinc-600"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="mt-12 flex justify-center flex-col items-center">
        <h3 className="border-amber-600 border-solid border-b-2 text-4xl mb-6">
          Tasks to do
        </h3>
        <ul className="min-w-[400px]">
          {todoList.map((todo, i) => {
            if (taskId === todo.id) {
              return (
                <li key={i}>
                  <form onSubmit={handleSubmit}>
                    <input
                      className="bg-zinc-300 p-2"
                      onChange={(e) => handleChange(e, "edit")}
                      placeholder="Edit Task"
                    />
                    <button
                      className="bg-zinc-300 p-2 hover:bg-zinc-600"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </li>
              );
            }

            return (
              <li
                key={i}
                className="list-decimal text-[25px] flex justify-between items-center"
              >
                {todo.task}
                <div className="flex p-2 basis-10">
                  <button>
                    <FaWindowClose
                      className="text-[30px] mr-2"
                      onClick={() => deleteTodo(todo.id)}
                    />
                  </button>
                  <button>
                    <FaRegEdit
                      className="text-[32px] mb-1"
                      onClick={() => editTodo(todo)}
                    />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
