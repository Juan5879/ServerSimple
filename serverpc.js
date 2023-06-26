const express = require('express');
const app = express();
const multer = require('multer');
const routes = require('./routes/routes');

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware para el análisis del cuerpo de las solicitudes
app.use(express.json());

// Configurar el middleware de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Rutas
app.use('/', routes);

// Manejar la solicitud de carga de archivos
app.post('/upload', upload.single('file'), (req, res) => {
  // Aquí puedes realizar operaciones adicionales con el archivo subido
  res.send('Archivo subido correctamente');
});

// Iniciar el servidor
const port = 3500;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
