import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const PlayCountChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/play-count-stats/')
      .then(response => {
        const titles = response.data.map(item => item.music__title);
        const playCounts = response.data.map(item => item.play_count);

        setChartData({
          labels: titles,
          datasets: [
            {
              label: 'Çalma Sayısı',
              data: playCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      })
      .catch(error => console.error("Error fetching play count stats:", error));
  }, []);

  return (
    <div>
      <h2>Çalma Sayısı İstatistikleri</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default PlayCountChart;
