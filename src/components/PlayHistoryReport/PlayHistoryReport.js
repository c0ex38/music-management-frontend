import React, { useState } from 'react';
import axios from 'axios';
import './PlayHistoryReport.css';

const PlayHistoryReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [storeName, setStoreName] = useState('');
  const [musicTitle, setMusicTitle] = useState('');
  const [name, setName] = useState('');
  const [reportData, setReportData] = useState([]);

  const fetchReport = () => {
    axios.get('http://localhost:8000/api/play-history/', {
      params: {
        start_date: startDate,
        end_date: endDate,
        store_name: storeName,
        music_title: musicTitle,
        name: name,
      },
    })
    .then(response => setReportData(response.data))
    .catch(error => console.error("Error fetching report data:", error));
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setStoreName('');
    setMusicTitle('');
    setName('');
    setReportData([]);
  };

  return (
    <div className="report-container">
      <h2 className="report-header">Çalma Geçmişi Raporu</h2>

      <div className="filters">
        <div className="filter-item">
          <label>Başlangıç Tarihi:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="filter-item">
          <label>Bitiş Tarihi:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="filter-item">
          <label>Mağaza Adı:</label>
          <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} placeholder="Mağaza adı girin" />
        </div>
        <div className="filter-item">
          <label>Müzik Başlığı:</label>
          <input type="text" value={musicTitle} onChange={(e) => setMusicTitle(e.target.value)} placeholder="Müzik başlığı girin" />
        </div>
        <div className="filter-item">
          <label>Kullanıcı Adı:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Kullanıcı adı girin" />
        </div>
      </div>

      <div className="buttons">
        <button className="button fetch-button" onClick={fetchReport}>Raporu Getir</button>
        <button className="button clear-button" onClick={clearFilters}>Filtreleri Temizle</button>
      </div>

      <div className="report-results">
        <h3>Rapor Sonuçları</h3>
        {reportData.length > 0 ? (
          <ul>
            {reportData.map((item) => (
              <li key={item.id}>
                <strong>{item.music.title}</strong> - {item.name} ({item.store_name})
                <br />
                <small>{new Date(item.played_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>Belirtilen kriterlere uygun çalma geçmişi bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default PlayHistoryReport;
