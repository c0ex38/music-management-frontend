import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import './PlaylistPlayer.css';

const PlaylistPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playing, setPlaying] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [announcementFrequency, setAnnouncementFrequency] = useState(3);
  const [songCounter, setSongCounter] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false); // Shuffle modunu kontrol etmek için
  const [announcementPlaying, setAnnouncementPlaying] = useState(false); // Anonsun çalıp çalmadığını izlemek için

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const storeName = searchParams.get('store_name');

  useEffect(() => {
    if (storeName) {
      axios.get(`http://localhost:8000/api/playlist/by-store/?store_name=${storeName}`)
        .then(response => {
          setPlaylist(response.data.musics);
          setShuffledPlaylist(shuffleArray(response.data.musics)); // Shuffle edilmiş listeyi başlat
        })
        .catch(error => console.error("Error fetching playlist:", error));

      axios.get(`http://localhost:8000/api/announcement/by-store/?store_name=${storeName}`)
        .then(response => {
          if (response.data.length > 0) {
            setAnnouncements(response.data);
            setAnnouncementFrequency(response.data[0].frequency);
          }
        })
        .catch(error => console.error("Error fetching announcements:", error));
    }
  }, [storeName]);

  // Shuffle fonksiyonu
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const playTrack = (index) => {
    if (playing) {
      playing.pause();
    }

    setAnnouncementPlaying(false); // Şarkı çalmaya başladığında anons durumu sıfırlanır
    const selectedPlaylist = isShuffle ? shuffledPlaylist : playlist; // Shuffle moduna göre playlist seç
    const fileUrl = `http://localhost:8000${selectedPlaylist[index].file}`;
    const audio = new Audio(fileUrl);

    audio.onended = handleNext;
    audio.play().catch(error => console.error("Error playing audio:", error));
    setPlaying(audio);
    setCurrentTrack(index);
  };

  const playAnnouncement = () => {
    if (announcementPlaying || playing) return; // Eğer anons çalınıyor veya bir şarkı çalınıyorsa, tekrar çalma

    const announcement = announcements[0];
    const audio = new Audio(`http://localhost:8000${announcement.audio_file}`);

    audio.onended = () => {
      setAnnouncementPlaying(false); // Anons bittiğinde durum sıfırlanır
      handleNext(); // Anons bittiğinde sıradaki şarkıya geç
    };
    audio.play().catch(error => console.error("Error playing announcement:", error));
    setPlaying(audio);
    setAnnouncementPlaying(true); // Anonsun çaldığını işaretle
  };

  const handleNext = () => {
    if (announcementPlaying) return; // Anons oynarken başka işlem yapma

    const selectedPlaylist = isShuffle ? shuffledPlaylist : playlist;

    // Son şarkıdan sonra başa dönme
    if (currentTrack + 1 >= selectedPlaylist.length) {
      setCurrentTrack(0);
      setSongCounter(0);
      playTrack(0);
      return;
    }

    // Anons sıklığını kontrol et
    if ((songCounter + 1) % announcementFrequency === 0 && announcements.length > 0) {
      playAnnouncement(); // Sıklığa ulaşıldığında anons çal
      setSongCounter(0); // Anons çalındığında sayaç sıfırlanır
    } else {
      const nextTrack = currentTrack + 1;
      playTrack(nextTrack);
      setSongCounter(prevCounter => prevCounter + 1);
    }
  };

  const handlePrevious = () => {
    const selectedPlaylist = isShuffle ? shuffledPlaylist : playlist;
    const prevTrack = (currentTrack - 1 + selectedPlaylist.length) % selectedPlaylist.length;
    playTrack(prevTrack);
  };

  // Shuffle modunu değiştirme
  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) {
      setShuffledPlaylist(shuffleArray(playlist)); // Shuffle moduna geçildiğinde listeyi karıştır
      setCurrentTrack(0); // İlk şarkıdan başlat
    }
  };

  return (
    <div className="player-container">
      <h2>Çalma Listesi</h2>
      <p className="welcome-message">Hoş geldin, <strong>{name}</strong>! Mağaza: <strong>{storeName}</strong></p>

      {playlist.length > 0 ? (
        <div>
          <div className="track-info">
            Çalıyor: {isShuffle ? shuffledPlaylist[currentTrack].title : playlist[currentTrack].title} - 
            {isShuffle ? shuffledPlaylist[currentTrack].artist : playlist[currentTrack].artist}
          </div>

          <div className="controls">
            <button onClick={handlePrevious}>Önceki</button>
            <button onClick={() => playTrack(currentTrack)}>Oynat</button>
            <button onClick={() => playing && playing.pause()}>Duraklat</button>
            <button onClick={handleNext}>Sonraki</button>
            <button onClick={toggleShuffle}>
              {isShuffle ? "Shuffle Kapat" : "Shuffle Aç"}
            </button>
          </div>

          <p className="current-track">
            {isShuffle
              ? `Karışık çalma aktif: ${shuffledPlaylist[currentTrack].title}`
              : `Çalma sırası: ${playlist[currentTrack].title}`}
          </p>
        </div>
      ) : (
        <p>Mağaza için çalma listesi bulunamadı.</p>
      )}
    </div>
  );
};

export default PlaylistPlayer;
