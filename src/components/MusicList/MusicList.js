import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MusicList.css'; // CSS dosyanızı içe aktarın

const MusicList = () => {
  const [musicList, setMusicList] = useState([]);
  const [playing, setPlaying] = useState(null);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/music/')
      .then(response => setMusicList(response.data))
      .catch(error => console.error(error));
  }, []);

  const handlePlay = (fileUrl, musicId) => {
    if (playing) {
      playing.pause(); // Önceki müziği durdur
    }
  
    const audio = new Audio(fileUrl);
    audio.play().catch(error => console.error("Error playing audio:", error));
    setPlaying(audio);
    setCurrentlyPlayingId(musicId);
  
    // Çalma geçmişini kaydetme
    axios.post('http://localhost:8000/api/play-history/', { music: musicId })
      .then(response => {
        console.log("Play history saved:", response.data);
      })
      .catch(error => console.error("Error saving play history:", error));
  };
  
  return (
    <div className="music-list-container">
      <h1 className="music-list-title">🎶 Müzik Listesi 🎶</h1>
      <div className="music-cards">
        {musicList.map((music) => (
          <div 
            key={music.id} 
            className={`music-card ${currentlyPlayingId === music.id ? 'playing' : ''}`}
          >
            <div className="music-info">
              <h2>{music.title}</h2>
              <p>{music.artist}</p>
            </div>
            <button 
              className="play-button" 
              onClick={() => handlePlay(music.file, music.id)}
            >
              {currentlyPlayingId === music.id ? 'Çalıyor...' : 'Oynat'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicList;
