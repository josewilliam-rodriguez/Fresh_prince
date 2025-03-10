
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Grid2,
  Typography,
  Button,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const ProducDetai = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://apideployer-fresh-prince-1.onrender.com/collection/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchRecommended = async () => {
      try {
        const response = await fetch(
          "https://apideployer-fresh-prince-1.onrender.com/collection"
        );
        const data = await response.json();
        setRecommended(data.filter((item) => item.id !== id)); // Filtrar el producto actual
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };

    fetchProduct();
    fetchRecommended();
  }, [id]);

  if (!product) return <Typography>Cargando...</Typography>;

  return (
    <Container>
      <Grid2 container spacing={4}>
        {/* Galería de Imágenes */}
        <Grid2 item xs={12} md={6}>
          <img src={product.imagen_1} alt={product.nombre} width="100%" />
          {product.imagen_2 && (
            <img src={product.imagen_2} alt={product.nombre} width="100%" />
          )}
          {product.imagen_3 && (
            <img src={product.imagen_3} alt={product.nombre} width="100%" />
          )}
          {product.imagen_4 && (
            <img src={product.imagen_4} alt={product.nombre} width="100%" />
          )}
        </Grid2>

        {/* Información del Producto */}
        <Grid2 item xs={12} md={6}>
          <Typography variant="h4">{product.nombre}</Typography>
          <Typography variant="h6">${product.precio}</Typography>

          {/* Selección de tallas */}
          <Select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Selecciona una talla
            </MenuItem>
            {product.tallas.map((size, index) => (
              <MenuItem key={index} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>

          {/* Botones */}
          <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
            Sumar al carrito
          </Button>
          <Button variant="outlined" color="primary" fullWidth>
            Comprar ahora
          </Button>

          {/* Descripción */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            {product.descripcion}
          </Typography>
        </Grid2>
      </Grid2>

      {/* Sección de productos recomendados */}
      <Typography variant="h5" align="center" sx={{ mt: 4, mb: 2 }}>
        YOU MAY ALSO LIKE
      </Typography>
      <Grid2 container spacing={3}>
        {recommended.slice(0, 3).map((item) => (
          <Grid2 item key={item.id} xs={12} sm={4}>
            <Card>
              <CardMedia
                onClick={() => navigate(`/shop/${item.id}`)}
                component="img"
                height="250"
                image={item.imagen_1}
                alt={item.nombre}
              />
              <CardContent>
                <Typography variant="h6">{item.nombre}</Typography>
                <Typography variant="body1">${item.precio}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default ProducDetai;