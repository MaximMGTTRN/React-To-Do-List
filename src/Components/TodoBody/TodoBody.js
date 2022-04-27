import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import AllTasksContext from "../../context";
import Task from "../Task/Task";
import EditTask from "../Task/EditTaskComponent/EditTask";
import Navigation from "../Navigation/Navigation";
import "./TodoBody.scss";

const TodoBody = () => {
  const [allTasks, setAllTasks] = useState([]);

  const [currentTask, setCurrentTask] = useState(null);

  useEffect(async () => {
    await axios.get("http://localhost:8000/allTasks").then((res) => {
      setAllTasks(res.data.data);
    });
  }, []);

  return (
    <AllTasksContext.Provider value={{ allTasks, setAllTasks }}>
      <div className="appBody">
        <div className="title">To Do List</div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="task-box">
                <Navigation />
                <div className="taskListBox">
                  <div className="taskList">
                    {allTasks
                      .sort((a, b) => a.isCheck - b.isCheck)
                      .map((item, index) => {
                        return (
                          <Task
                            index={index}
                            id={item._id}
                            key={`task-${index}`}
                            text={item.text}
                            check={item.isCheck}
                            setCurrentTask={setCurrentTask}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <div className="task-box">
                <div className="taskList">
                  <EditTask
                    currentTask={currentTask}
                    setAllTasks={setAllTasks}
                  />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </AllTasksContext.Provider>
  );
};

export default TodoBody;
