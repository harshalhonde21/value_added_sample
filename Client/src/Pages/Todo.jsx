import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Css/Todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updatingTodo, setUpdatingTodo] = useState(null); // State to track the todo being updated
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5500/api/v2/todo/getTodo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to fetch todos');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5500/api/v2/todo/addTodo', {
        title,
        description,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos([...todos, response.data.todo]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5500/api/v2/todo/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedTodos = todos.filter(todo => todo._id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo');
    }
  };

  const handleUpdateClick = (todo) => {
    setUpdatingTodo(todo);
  };

  const handleUpdateSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const { _id, title, description, completed } = updatingTodo;
      const response = await axios.put(`http://localhost:5500/api/v2/todo/update/${_id}`, {
        title,
        description,
        completed,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedTodos = todos.map(todo => {
        if (todo._id === _id) {
          return { ...todo, ...response.data.todo };
        }
        return todo;
      });

      setTodos(updatedTodos);
      setUpdatingTodo(null); // Reset updatingTodo state after successful update
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo');
    }
  };

  const handleCancelUpdate = () => {
    setUpdatingTodo(null); // Reset updatingTodo state on cancel
  };

  return (
    <div className="home">
      <h1>Todo</h1>
      <div className="glass-structure">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <input 
            type="text" 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
          <button type="submit" className="cta-button">Submit</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <div className={`todo-item ${todo.completed ? 'completed' : ''}`} key={todo._id}>
            {updatingTodo && updatingTodo._id === todo._id ? (
              <div className="update-form">
                <input 
                  type="text" 
                  value={updatingTodo.title} 
                  onChange={(e) => setUpdatingTodo({ ...updatingTodo, title: e.target.value })} 
                  className="update-input"
                  required 
                />
                <input 
                  type="text" 
                  value={updatingTodo.description} 
                  onChange={(e) => setUpdatingTodo({ ...updatingTodo, description: e.target.value })} 
                  className="update-input"
                  required 
                />
                <label>
                  Completed:
                  <input 
                    type="checkbox" 
                    checked={updatingTodo.completed} 
                    onChange={(e) => setUpdatingTodo({ ...updatingTodo, completed: e.target.checked })} 
                  />
                </label>
                <button className="cta-button update-button" onClick={handleUpdateSubmit}>Save</button>
                <button className="cta-button cancel-button" onClick={handleCancelUpdate}>Cancel</button>
              </div>
            ) : (
              <>
                <h2>{todo.title}</h2>
                <p>{todo.description}</p>
                <div className="todo-actions">
                  <button className="action-button delete-button" onClick={() => handleDelete(todo._id)}>Delete</button>
                  <button className="action-button update-button" onClick={() => handleUpdateClick(todo)}>Update</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
