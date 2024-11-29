const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB (Pedidos)'))
  .catch(err => console.error(err));

// Esquema de Pedido
const pedidoSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true },
  productos: [{ productoId: { type: String, required: true }, cantidad: { type: Number, required: true } }],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

// Rutas
app.post('/pedidos', async (req, res) => {
  const { usuarioId, productos, total } = req.body;

  // Validación
  if (!usuarioId || !productos || productos.length === 0 || !total) {
    return res.status(400).json({ message: 'Faltan datos necesarios para crear el pedido' });
  }

  const nuevoPedido = new Pedido({ usuarioId, productos, total });
  await nuevoPedido.save();
  res.status(201).send(nuevoPedido);
});

app.get('/pedidos/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const pedidos = await Pedido.find({ usuarioId });

  if (!pedidos || pedidos.length === 0) {
    return res.status(404).json({ message: 'Pedidos no encontrados' });
  }

  res.send(pedidos);
});

// Puerto del microservicio
app.listen(process.env.PORT_PEDIDOS, () => console.log(`Microservicio Pedidos corriendo en el puerto ${process.env.PORT_PEDIDOS}`));