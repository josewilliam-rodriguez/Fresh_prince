import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

const ModalAdmin = ({ open, handleClose }) => {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("")
    const [isRegistering, setIsRegistering] = useState(false)
    const [role, setRole] = useState(null)

    useEffect(() => {
      const session = JSON.parse(localStorage.getItem("userSession"));
      if (session) {
        setRole(session.role);
      }
    }, [role]);

    const handleLogin = async () => {
      try {
        const response = await fetch("https://apideployer-fresh-prince-1.onrender.com/usuarios");
        const users = await response.json();
    
        const foundUser = users.find((u) => u.name === user && u.password === password);
    
        if (foundUser) {
          const userRole = foundUser.role || "usuario"
          
          localStorage.setItem("userSession", JSON.stringify({ user: foundUser.name, role: userRole }));
    
          setRole(userRole);
          alert(`¡Bienvenido, ${foundUser.name}!`);
          handleClose();
        } else {
          alert("Credenciales incorrectas");
        }
      } catch (error) {
        console.error("Error en login:", error);
        alert("Hubo un problema con el inicio de sesión.");
      }
    };
  
    const handleLogout = () => {
      localStorage.removeItem("userSession");
      setRole(null);
    };
  
    const handleRegister = async () => {
      if (!user || !email || !password) {
        alert("Todos los campos son obligatorios");
        return;
      }
  
      const newUser = { name: user, email, password };
  
      try {
        const response = await fetch("https://apideployer-fresh-prince-1.onrender.com/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
  
        if (response.ok) {
          alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
          setIsRegistering(false);
        } else {
          alert("Error al registrar. Inténtalo de nuevo.");
        }
      } catch (error) {
        console.error("Error en el registro:", error);
        alert("Hubo un problema con el registro.");
      }
    };
        
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isRegistering ? "Registrarse" : "Iniciar Sesión"}</DialogTitle>
      <DialogContent>
        {isRegistering && (
          <TextField
            label="Correo Electrónico"
            fullWidth
            margin="dense"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
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
        <Button onClick={handleClose} color="primary">Cancelar</Button>
        {isRegistering ? (
          <Button onClick={handleRegister} color="primary" variant="contained">Registrarse</Button>
        ) : (
          <Button onClick={handleLogin} color="primary" variant="contained">Iniciar sesión</Button>
        )}
        <Button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </Button>
      </DialogActions>

      {role  && (
        <DialogActions>
          <Button onClick={handleLogout} color="error">Cerrar Sesión</Button>
        </DialogActions>
      )}
    </Dialog>
   )
}

export default ModalAdmin