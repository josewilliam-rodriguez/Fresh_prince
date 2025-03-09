import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ModalAddCollections from './ModalAddCollections';

const Collections = () => {
  const [open, setOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const adminSession = JSON.parse(localStorage.getItem("adminSession"));

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://apideployer-fresh-prince-1.onrender.com/collection");
      const data = await response.json();
      setCollections(data);
    } catch (error) {
      console.error("Error al obtener colecciones:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCollections();
  }, []);
  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>Collections</Typography>

      {adminSession && (
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Agregar Colección
        </Button>
      )}

      {loading ? (
        <CircularProgress sx={{ marginTop: "1rem" }} />
      ) : (
        <Box sx={{ marginTop: "1rem" }}>
          {collections.length === 0 ? (
            <Typography>No hay colecciones aún.</Typography>
          ) : (
            collections.map((col, index) => (
              <Box key={index} sx={{ padding: "1rem", border: "1px solid #ddd", marginTop: "0.5rem" }}>
                <Typography variant="h6">{col.nombre}</Typography>
                <Typography>{col.descripcion}</Typography>
                <Typography>Precio: ${col.precio}</Typography>
                <Typography>Tallas: {col.tallas.join(", ")}</Typography>
                <img src={col.imagen_1} alt={col.nombre} style={{ width: "150px", marginTop: "10px" }} />
                <img src={col.imagen_2} alt={col.nombre} style={{ width: "150px", marginTop: "10px" }} />
                <img src={col.imagen_3} alt={col.nombre} style={{ width: "150px", marginTop: "10px" }} />
                <img src={col.imagen_4} alt={col.nombre} style={{ width: "150px", marginTop: "10px" }} />
              
              </Box>
            ))
          )}
        </Box>
      )}

      <ModalAddCollections open={open} handleClose={() => setOpen(false)} fetchCollections={fetchCollections} />
    </Box>
  )
}

export default Collections