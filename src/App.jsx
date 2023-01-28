import React, { useState } from "react";
import "./App.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOptionVisible, setIsOptionVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [deletePopup, setDeletePopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTasks([...tasks, { title, description, isEditing: false }]);
    setTitle("");
    setDescription("");
  };

  const handleUpdate = (index) => {
    let newTitle = prompt("Enter new title:");
    let newDescription = prompt("Enter new description:");
    const newTasks = [...tasks];
    newTasks[index] = {
      title: newTitle,
      description: newDescription,
      isEditing: false,
    };
    setTasks(newTasks);
  };

  const handleEdit = (index) => {
    setEditPopup(false);
    let newTitle = prompt("Enter new title:");
    let newDescription = prompt("Enter new description:");
    const newTasks = [...tasks];
    newTasks[index] = {
      title: newTitle,
      description: newDescription,
      isEditing: false,
    };
    setTasks(newTasks);
  };

  const handleDelete = (index) => {
    setDeletePopup(false);
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleOptionClick = (index) => {
    setIsOptionVisible(!isOptionVisible);
    setCurrentIndex(index);
  };

  const handleDeletePopup = (index) => {
    setDeletePopup(!deletePopup);
    setCurrentIndex(index);
  };
  const handleEditPopup = (index) => {
    setEditPopup(!editPopup);
    setCurrentIndex(index);
  };

  return (
    <div>
      <header>
        <h1 className="logo">GYIZER</h1>
        <p className="tagline">TODO APP</p>
      </header>
      <form className="input-form" onSubmit={handleSubmit}>
        <label className="title-input">
          <input
            className="title-bar"
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <br />
        <label className="input-input">
          <input
            className="input-bar"
            type="text"
            placeholder="Input..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <br />
        <button className="add-but" type="submit">
          +
        </button>
      </form>
      <br />
      <div className="task-container">
        {tasks.length === 0 && (
          <>
            <h3 className="no-task">No task</h3>
            <p className="line1"></p>
            <p className="line2"></p>
          </>
        )}
        <ul className="grid-container">
          {tasks.map((task, index) => (
            <li key={index}>
              <div className="task-options">
                <p className="task-title">{task.title}</p>
                <p className="task-input">{task.description}</p>
                <div className="edit-delete-container">
                  <button
                    className="i-but"
                    onClick={() => handleOptionClick(index)}
                  >
                    i
                  </button>
                  {isOptionVisible && currentIndex === index && (
                    <>
                      <button
                        className="edit-but"
                        onClick={() => handleEditPopup(index)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-but"
                        onClick={() => setDeletePopup(true)}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>

                {editPopup && (
                  <div className={`edit-popup ${editPopup ? "show" : "hide"}`}>
                    <p className="edit-text">Edit this Task?</p>
                    <button
                      className="yes-edit"
                      onClick={() => handleEdit(currentIndex)}
                    >
                      Yes
                    </button>
                    <button
                      className="no-edit"
                      onClick={() => setEditPopup(false)}
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
              {deletePopup && (
                <div
                  className={`delete-popup ${deletePopup ? "show" : "hide"}`}
                >
                  <p className="del-text">Delete this Task?</p>
                  <button
                    className="yes-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Yes
                  </button>
                  <button
                    className="no-btn"
                    onClick={() => setDeletePopup(false)}
                  >
                    No
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
