const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB (Productos)'))
  .catch(err => console.error(err));

// Esquema de Producto
const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String,
  stock: Number
});

const Producto = mongoose.model('Producto', productoSchema);

// Rutas
app.post('/productos', async (req, res) => {
  const { nombre, precio, descripcion, stock } = req.body;
  const nuevoProducto = new Producto({ nombre, precio, descripcion, stock });
  await nuevoProducto.save();
  res.status(201).send(nuevoProducto);
});

app.get('/productos', async (req, res) => {
  const productos = await Producto.find();
  res.send(productos);
});

// Puerto del microservicio
app.listen(process.env.PORT_PRODUCTOS, () => console.log(`Microservicio Productos corriendo en el puerto ${process.env.PORT_PRODUCTOS}`));