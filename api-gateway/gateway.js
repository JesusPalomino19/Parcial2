require('dotenv').config(); // Cargar variables de entorno desde .env
console.log(process.env);  // Verificar que las variables se carguen correctamente

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Configuración de rutas
app.use('/usuarios', createProxyMiddleware({ target: `http://localhost:${process.env.PORT_USUARIOS}`, changeOrigin: true }));
app.use('/productos', createProxyMiddleware({ target: `http://localhost:${process.env.PORT_PRODUCTOS}`, changeOrigin: true }));
app.use('/carrito', createProxyMiddleware({ target: `http://localhost:${process.env.PORT_CARRITO}`, changeOrigin: true }));
app.use('/pedidos', createProxyMiddleware({ target: `http://localhost:${process.env.PORT_PEDIDOS}`, changeOrigin: true }));

// Puerto del API Gateway
app.listen(process.env.PORT_GATEWAY, () => console.log(`API Gateway corriendo en el puerto ${process.env.PORT_GATEWAY}`));