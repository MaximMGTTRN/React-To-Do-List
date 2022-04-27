import React, { useState, useContext } from "react";
import axios from "axios";
import Snack from "../Snackbar/Snackbar";
import AllTasksContext from "../../context";
import "./Navigation.scss";

const Navigation = () => {
  const { allTasks, setAllTasks } = useContext(AllTasksContext);
  const [text, setText] = useState("");
  const [isSnackOpen, setSnackOpen] = useState(false);

  const addNewTask = async () => {
    if (!(text.trim(" ") === "")) {
      await axios
        .post("http://localhost:8000/createTask", {
          text,
          isCheck: false,
        })
        .then((res) => {
          setAllTasks(res.data.data);
          setText("");
        });
    } else {
      setSnackOpen(true);
    }
  };

  const changeValue = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="navBlock">
      <input className="input_nav" onChange={changeValue} value={text} />
      <button className="button_nav" onClick={() => addNewTask()}>
        Add
      </button>
      <Snack isOpen={isSnackOpen} handleClose={() => setSnackOpen(false)} />
    </div>
  );
};

export default Navigation;
