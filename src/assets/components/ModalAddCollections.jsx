import React, { useState } from 'react';
import { postData } from '../../helpers/postData';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const ModalAddCollections = ({ open, handleClose, fetchCollections, setCollections }) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagenes, setImagenes] = useState(["", "", "", ""]);
    const [tallas, setTallas] = useState("");

    // Obtener sesión del usuario
    const adminSession = JSON.parse(localStorage.getItem("userSession"));
    const isAdmin = adminSession?.role?.toLowerCase() === "admin";

    const handleSubmit = async () => {
        if (!nombre || !descripcion || !precio || imagenes.some(img => img === "") || !tallas) {
          alert("Todos los campos son obligatorios");
          return;
        }
    
        const nuevaColección = {
          nombre,
          descripcion,
          precio: parseFloat(precio),
          imagen_1: imagenes[0],
          imagen_2: imagenes[1],
          imagen_3: imagenes[2],
          imagen_4: imagenes[3],
          tallas: tallas.split(",").map(t => t.trim()) 
        };
    
        const response = await postData("https://apideployer-fresh-prince-1.onrender.com/collection", nuevaColección);
    
        if (response.status === 201 || response.status === 200) {
          alert("Colección agregada exitosamente");

          // Agregar la nueva colección al estado sin esperar fetchCollections
          setCollections(prevCollections => [...prevCollections, nuevaColección]);

          handleClose();
        } else {
          alert("Error al agregar la colección");
        }
    };

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar Nueva Colección</DialogTitle>
        <DialogContent>
          <TextField label="Nombre" fullWidth margin="dense" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <TextField label="Descripción" fullWidth margin="dense" multiline rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          <TextField label="Precio" fullWidth margin="dense" type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          <TextField label="Tallas (separadas por comas)" fullWidth margin="dense" value={tallas} onChange={(e) => setTallas(e.target.value)} />
          {imagenes.map((img, index) => (
            <TextField key={index} label={`Imagen ${index + 1}`} fullWidth margin="dense" value={img} onChange={(e) => {
              const newImages = [...imagenes];
              newImages[index] = e.target.value;
              setImagenes(newImages);
            }} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancelar</Button>

          {/* Solo mostrar el botón si el usuario es admin */}
          {isAdmin && (
            <Button onClick={handleSubmit} color="secondary" variant="contained">
              Añadir Collection
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
}

export default ModalAddCollections