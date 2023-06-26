function submitForm(event) {
    event.preventDefault();
  
    const form = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
  
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
  
    const xhr = new XMLHttpRequest();
  
    xhr.open('POST', '/upload');
  
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const percentage = (e.loaded / e.total) * 100;
        progress.style.width = percentage + '%';
      }
    };
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        progressBar.style.display = 'none';
        progress.style.width = '0';
        form.reset();
        loadUploadedFiles();
      }
    };
  
    xhr.onerror = function () {
      console.log('Error al subir el archivo');
    };
  
    progressBar.style.display = 'block';
    xhr.send(formData);
  }
  
  function loadUploadedFiles() {
    const uploadContent = document.getElementById('uploadContent');
  
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/uploaded', true);
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        const files = JSON.parse(xhr.responseText);
  
        let html = '<h2>Archivos subidos</h2>';
        html += '<ul>';
  
        files.forEach(function (file) {
          html += '<li><a href="/upload/' + file.filename + '">' + file.originalname + '</a></li>';
        });
  
        html += '</ul>';
  
        uploadContent.innerHTML = html;
      }
    };
  
    xhr.send();
  }
  
  loadUploadedFiles();