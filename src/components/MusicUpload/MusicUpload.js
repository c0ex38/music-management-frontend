import React, { useState } from 'react';
import axios from 'axios';
import './MusicUpload.css'; // CSS dosyanızı içe aktarın

const MusicUpload = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Seçilen dosyayı state'e kaydet
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engelle
    const formData = new FormData();
    formData.append('title', title); // Başlık ekle
    formData.append('artist', artist); // Sanatçı ekle
    formData.append('file', file); // Dosyayı ekle

    // API'ye yükleme isteği gönder
    axios.post('http://localhost:8000/api/music/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      alert('Müzik başarıyla yüklendi!'); // Başarı mesajı
      setTitle(''); // Başlık alanını temizle
      setArtist(''); // Sanatçı alanını temizle
      setFile(null); // Dosya alanını temizle
    })
    .catch(error => {
      console.error("Error uploading music:", error); // Hata konsola yazdır
    });
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">🎶 Müzik Yükle 🎶</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Başlık:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            placeholder="Şarkı başlığını girin" 
          />
        </div>
        <div className="form-group">
          <label>Sanatçı:</label>
          <input 
            type="text" 
            value={artist} 
            onChange={(e) => setArtist(e.target.value)} 
            required 
            placeholder="Sanatçı ismini girin" 
          />
        </div>
        <div className="form-group">
          <label>Dosya:</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            required 
            className="file-input"
          />
        </div>
        <button type="submit" className="upload-button">Yükle</button>
      </form>
    </div>
  );
};

export default MusicUpload;
