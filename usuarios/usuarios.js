const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB (Usuarios)'))
  .catch(err => console.error(err));

// Esquema de Usuario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rutas
app.post('/usuarios', async (req, res) => {
  const { nombre, email } = req.body;
  const nuevoUsuario = new Usuario({ nombre, email });
  await nuevoUsuario.save();
  res.status(201).send(nuevoUsuario);
});

app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.send(usuarios);
});

// Puerto del microservicio
app.listen(process.env.PORT_USUARIOS, () => console.log(`Microservicio Usuarios corriendo en el puerto ${process.env.PORT_USUARIOS}`));