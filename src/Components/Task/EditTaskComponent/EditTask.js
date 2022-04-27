import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snack from "../../Snackbar/Snackbar";
import AllTasksContext from "../../../context";
import "./EditTask.scss";

const EditTask = (props) => {
  const { allTasks, setAllTasks } = useContext(AllTasksContext);
  const { currentTask } = props;
  const { _id, text } = currentTask;
  const [inputText, setInputText] = useState(text);
  const navigate = useNavigate();
  const [isSnackOpen, setSnackOpen] = useState(false);

  const updateTask = () => {
    if (!(inputText.trim(" ") === "")) {
      axios
        .patch(`http://localhost:8000/changeTask`, {
          _id,
          text: inputText,
        })
        .then((res) => {
          setAllTasks(res.data.data);
        });
      returnFunc();
    } else {
      setSnackOpen(true);
    }
  };

  const changeValue = (event) => {
    setInputText(event.target.value);
  };

  const returnFunc = () => {
    navigate("/");
  };

  return (
    <div className="task">
      <div className="taskInput">
        <input className="mainInput" value={inputText} onChange={changeValue} />
      </div>
      <div className="buttons">
        <div className="okBut" onClick={() => updateTask()} />
        <div className="disBut" onClick={() => returnFunc()} />
      </div>
      <Snack isOpen={isSnackOpen} handleClose={() => setSnackOpen(false)} />
    </div>
  );
};

export default EditTask;
