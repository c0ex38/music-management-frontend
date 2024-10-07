import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './PlayCountChart.css';

const PlayCountChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [storeName, setStoreName] = useState('');
  const [storeNames, setStoreNames] = useState([]);

  const fetchPlayCounts = useCallback(() => {
    setLoading(true);
    const params = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    if (storeName) params.store_name = storeName;

    axios.get('http://localhost:8000/api/play-count-stats/', { params })
      .then(response => {
        const storeNames = response.data.map(item => item.store_name);
        const playCounts = response.data.map(item => item.play_count);

        setChartData({
          labels: storeNames,
          datasets: [
            {
              label: 'Çalma Sayısı',
              data: playCounts,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
            },
          ],
        });
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching play count stats:", error);
        setLoading(false);
      });
  }, [startDate, endDate, storeName]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/stores/')
      .then(response => setStoreNames(response.data.map(store => store.name)))
      .catch(error => console.error("Error fetching store names:", error));

    fetchPlayCounts();
  }, [fetchPlayCounts]);

  return (
    <div className="chart-container">
      <h2 className="chart-title">📊 Mağaza Bazında Çalma Sayısı İstatistikleri 📊</h2>

      <div className="filters">
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          placeholder="Başlangıç Tarihi" 
        />
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          placeholder="Bitiş Tarihi" 
        />
        <select 
          value={storeName} 
          onChange={(e) => setStoreName(e.target.value)} 
        >
          <option value="">Tüm Mağazalar</option>
          {storeNames.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
        <button onClick={fetchPlayCounts}>Filtrele</button>
      </div>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <Bar 
          data={chartData} 
          options={{
            plugins: {
              legend: { display: true, position: 'top' },
              tooltip: { enabled: true },
            },
            scales: {
              x: { title: { display: true, text: 'Mağaza İsimleri' } },
              y: { title: { display: true, text: 'Çalma Sayısı' }, beginAtZero: true },
            },
          }}
        />
      )}
    </div>
  );
};

export default PlayCountChart;
