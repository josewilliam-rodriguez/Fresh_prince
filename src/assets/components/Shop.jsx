import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid2, Card, CardMedia, CardContent, Typography } from "@mui/material";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://apideployer-fresh-prince-1.onrender.com/collection");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        SHOP
      </Typography>

      <Grid2 container spacing={3}>
        {products.map((product) => (
          <Grid2 item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              onClick={() => navigate(`/shop/${product.id}`)} 
              style={{ cursor: "pointer" }}
            >
              <CardMedia component="img" height="250" image={product.imagen_1} alt={product.nombre} />
              <CardContent>
                <Typography variant="h6">{product.nombre}</Typography>
                <Typography variant="body1">${product.precio}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Shop