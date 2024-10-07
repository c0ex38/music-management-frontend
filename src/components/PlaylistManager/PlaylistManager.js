import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlaylistManager.css';

const PlaylistManager = () => {
  const [playlists, setPlaylists] = useState([]);
  const [musicList, setMusicList] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newPlaylistName, setNewPlaylistName] = useState(''); // Yeni çalma listesi ismi

  useEffect(() => {
    axios.get('http://localhost:8000/api/playlist/')
      .then(response => setPlaylists(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:8000/api/music/')
      .then(response => setMusicList(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCreatePlaylist = () => {
    if (!newPlaylistName) {
      alert('Lütfen bir çalma listesi adı girin.');
      return;
    }

    axios.post('http://localhost:8000/api/playlist/', { name: newPlaylistName })
      .then(response => {
        setPlaylists([...playlists, response.data]);
        setNewPlaylistName(''); // Giriş alanını temizle
      })
      .catch(error => console.error(error));
  };

  const handleAddMusicToPlaylist = (playlistId, musicId) => {
    axios.put(`http://localhost:8000/api/playlist/${playlistId}/`, { musics: [musicId] })
      .then(response => {
        const updatedPlaylists = playlists.map(playlist =>
          playlist.id === response.data.id ? response.data : playlist
        );
        setPlaylists(updatedPlaylists);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="playlist-manager-container">
      <h2 className="manager-title">🎶 Çalma Listesi Yöneticisi 🎶</h2>
      
      <div className="create-playlist-section">
        <input 
          type="text" 
          placeholder="Yeni Çalma Listesi Adı" 
          value={newPlaylistName} 
          onChange={(e) => setNewPlaylistName(e.target.value)} 
          className="playlist-name-input"
        />
        <button 
          className="create-playlist-button" 
          onClick={handleCreatePlaylist}
        >
          + Çalma Listesi Oluştur
        </button>
      </div>

      <div className="playlists-section">
        <h3>Çalma Listeleri</h3>
        <div className="playlists">
          {playlists.map(playlist => (
            <div key={playlist.id} className="playlist-card">
              <h4>{playlist.name}</h4>
              <button className="select-button" onClick={() => setSelectedPlaylist(playlist)}>Seç</button>
            </div>
          ))}
        </div>
      </div>

      {selectedPlaylist && (
        <div className="music-add-section">
          <h3>{selectedPlaylist.name} Çalma Listesine Müzik Ekle</h3>
          <div className="music-list">
            {musicList.map(music => (
              <div key={music.id} className="music-card">
                <p><strong>{music.title}</strong> - {music.artist}</p>
                <button 
                  className="add-music-button" 
                  onClick={() => handleAddMusicToPlaylist(selectedPlaylist.id, music.id)}
                >
                  Ekle
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistManager;
