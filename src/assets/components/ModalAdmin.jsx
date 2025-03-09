import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react'

const ModalAdmin = ({ open, handleClose }) => {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = () => {
        if (user === "admin" && password === "1234") { 
          localStorage.setItem("adminSession", JSON.stringify({ user }));
          alert("¡Inicio de sesión exitoso!");
          handleClose();
        } else {
          alert("Credenciales incorrectas");
        }
      };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Iniciar Sesión</DialogTitle>
      <DialogContent>
        <TextField
          label="Usuario"
          fullWidth
          margin="dense"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancelar</Button>
        <Button onClick={handleLogin} color="primary" variant="contained">Iniciar sesión</Button>
      </DialogActions>
    </Dialog>
   )
}

export default ModalAdmin