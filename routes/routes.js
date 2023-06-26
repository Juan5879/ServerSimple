const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../upload'); // Ruta completa de la carpeta de subida

const uploadFile = (req, res) => {
  const file = req.file;
  const targetPath = path.join(uploadDir, file.originalname);

  fs.rename(file.path, targetPath, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log('Archivo subido correctamente:', file.originalname);
      res.redirect('/');
    }
  });
};

router.get('/', (req, res) => {
  const documents = [{ _id: 1, title: 'Documento 1' }, { _id: 2, title: 'Documento 2' }];

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.log(err);
      return res.render('index', { documents, uploadedFiles: [] });
    }
    
    const uploadedFiles = files.map((file) => ({ originalname: file }));

    res.render('index', { documents, uploadedFiles });
  });
});

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;