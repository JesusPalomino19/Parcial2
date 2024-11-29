const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB (Carrito)'))
  .catch(err => console.error(err));

// Esquema de Carrito
const carritoSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true },
  productos: [{ productoId: { type: String, required: true }, cantidad: { type: Number, required: true } }]
});

const Carrito = mongoose.model('Carrito', carritoSchema);

// Rutas
app.post('/carrito', async (req, res) => {
  const { usuarioId, productos } = req.body;

  // Validación
  if (!usuarioId || !productos || productos.length === 0) {
    return res.status(400).json({ message: 'Faltan datos necesarios para crear el carrito' });
  }

  const nuevoCarrito = new Carrito({ usuarioId, productos });
  await nuevoCarrito.save();
  res.status(201).send(nuevoCarrito);
});

app.get('/carrito/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const carrito = await Carrito.findOne({ usuarioId });

  if (!carrito) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  res.send(carrito);
});

// Puerto del microservicio
app.listen(process.env.PORT_CARRITO, () => console.log(`Microservicio Carrito corriendo en el puerto ${process.env.PORT_CARRITO}`));