import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlaylistSchedule.css';

const PlaylistSchedule = () => {
  const [playlists, setPlaylists] = useState([]);
  const [schedule, setSchedule] = useState({
    playlist: '',
    start_time: '',
    end_time: '',
    days_of_week: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/playlist/')
      .then(response => setPlaylists(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/schedule/', schedule)
      .then(response => {
        alert('Zamanlama başarıyla eklendi!');
        setSchedule({ playlist: '', start_time: '', end_time: '', days_of_week: '' });
      })
      .catch(error => console.error(error));
  };

  const handleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">🎶 Çalma Listesi Zamanlaması Ekle 🎶</h2>
      <form className="schedule-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Çalma Listesi:</label>
          <select name="playlist" value={schedule.playlist} onChange={handleChange} required>
            <option value="">Seçiniz</option>
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Başlangıç Saati:</label>
          <input
            type="time"
            name="start_time"
            value={schedule.start_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Bitiş Saati:</label>
          <input
            type="time"
            name="end_time"
            value={schedule.end_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Günler:</label>
          <input
            type="text"
            name="days_of_week"
            placeholder="Mon,Tue,Wed"
            value={schedule.days_of_week}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Zamanlama Ekle</button>
      </form>
    </div>
  );
};

export default PlaylistSchedule;
