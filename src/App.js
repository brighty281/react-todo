import './App.css';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [edit, setEdit] = useState(null);
  
  const today = new Date();

  const options = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };

  const formattedDate = today.toLocaleDateString('en-GB', options);

  const addOrEditTodo = () => {
    if (edit !== null) {
      const updatedTodos = todos.map((item) => {
        if (item.id === edit) {
          return { ...item, text: todo };
        }
        return item;
      });
      setTodos(updatedTodos);
      setEdit(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: todo, status: false }]);
    }
    setTodo('');
  };

  const editTodo = (item) => {
    setEdit(item.id);
    setTodo(item.text);
  };

  const toggleStatus = (id, checked) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, status: checked };
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  const incompleteTodos = todos.filter((todo) => !todo.status);
  const completedTodos = todos.filter((todo) => todo.status);

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>{formattedDate} ✅ 📝 ⏰</h2>
        <div className="input">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addOrEditTodo} className="fas fa-plus"></i>
        </div>
      </div>
      
      <div className="todos-container">
        <div className="todos">
          <h3>Incomplete Tasks</h3>
          {incompleteTodos.map((obj) => (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  onChange={(e) => toggleStatus(obj.id, e.target.checked)}
                  checked={obj.status}
                  type="checkbox"
                />
                <p>{obj.text}</p>
              </div>
              <div className="right">
                <i
                  onClick={() => setTodos(todos.filter((todoItem) => todoItem.id !== obj.id))}
                  className="fas fa-times"
                ></i>
                <i onClick={() => editTodo(obj)} className="fas fa-pen"></i>
              </div>
            </div>
          ))}
        </div>
        <div className="completed-todos">
          <h3>Completed Tasks</h3>
          {completedTodos.map((obj) => (
            <div className="todo" key={obj.id}>
              <div className="left">
                <input
                  onChange={(e) => toggleStatus(obj.id, e.target.checked)}
                  checked={obj.status}
                  type="checkbox"
                />
                <p>{obj.text}</p>
              </div>
              <div className="right">
                <i
                  onClick={() => setTodos(todos.filter((todoItem) => todoItem.id !== obj.id))}
                  className="fas fa-times"
                ></i>
                <i onClick={() => editTodo(obj)} className="fas fa-pen"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
