import * as React from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

const Snack = ({ isOpen, handleClose }) => {
  return (
    <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={3000}>
      <Alert severity="warning">Вы должны что то написать</Alert>
    </Snackbar>
  );
};

export default Snack;
