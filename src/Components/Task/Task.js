import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AllTasksContext from "../../context";
import "./Task.scss";

const Task = ({ text, id, check, setCurrentTask, index }) => {
  const { allTasks, setAllTasks } = useContext(AllTasksContext);

  const deleteBut = async () => {
    await axios
      .delete(`http://localhost:8000/deleteTask?_id=${id}`, {})
      .then((res) => {
        setAllTasks(res.data.data);
      });
  };

  const navigate = useNavigate();
  const editBut = (id, index) => {
    setCurrentTask(allTasks[index]);
    navigate(`/edit/${id}`);
  };

  const checkFunction = async (check, setAllTasks, id) => {
    await axios
      .patch(`http://localhost:8000/changeTask`, { _id: id, isCheck: !check })
      .then((res) => {
        setAllTasks(res.data.data);
      });
  };

  {
    if (check) {
      return (
        <div className="task">
          <input
            type="checkbox"
            checked={check}
            onChange={() => checkFunction(check, setAllTasks, id)}
          />
          <div className="taskText">
            <span className="mainText good">{text}</span>
          </div>
          <div className="buttons">
            <div className="deleteBut" onClick={() => deleteBut()} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="task">
          <input
            type="checkbox"
            checked={check}
            onChange={() => checkFunction(check, setAllTasks, id)}
          />
          <div className="taskText">
            <span className="mainText">{text}</span>
          </div>
          <div className="buttons">
            <div className="editBut" onClick={() => editBut(id, index)} />
            <div className="deleteBut" onClick={() => deleteBut()} />
          </div>
        </div>
      );
    }
  }
};

export default Task;
