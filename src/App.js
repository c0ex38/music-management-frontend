import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styles/global.css';
import Navbar from './components/Navbar/Navbar';
import MusicList from './components/MusicList/MusicList';
import MusicUpload from './components/MusicUpload/MusicUpload';
import PlaylistSchedule from './components/PlaylistSchedule/PlaylistSchedule';
import PlaylistPlayer from './components/PlaylistPlayer/PlaylistPlayer';
import PlaylistManager from './components/PlaylistManager/PlaylistManager';
import PlayHistoryReport from './components/PlayHistoryReport/PlayHistoryReport';
import PlayCountChart from './components/PlayCountChart/PlayCountChart';

// Geçiş animasyonu ayarları
const pageTransition = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

// Sayfaları animasyonla sarmalayan yardımcı bileşen
const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageTransition}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const storeName = searchParams.get('store_name');
  
  const isPlayerOnlyMode = name && storeName;

  return (
    <>
      {/* Navbar yalnızca isPlayerOnlyMode değilse gösterilecek */}
      {!isPlayerOnlyMode && <Navbar />}
      
      <Routes location={location} key={location.pathname}>
        {!isPlayerOnlyMode && (
          <>
            <Route path="/" element={<AnimatedPage><MusicList /></AnimatedPage>} />
            <Route path="/upload" element={<AnimatedPage><MusicUpload /></AnimatedPage>} />
            <Route path="/playlist-manager" element={<AnimatedPage><PlaylistManager /></AnimatedPage>} />
            <Route path="/schedule" element={<AnimatedPage><PlaylistSchedule /></AnimatedPage>} />
            <Route path="/play-history-report" element={<AnimatedPage><PlayHistoryReport /></AnimatedPage>} />
            <Route path="/play-count-chart" element={<AnimatedPage><PlayCountChart /></AnimatedPage>} />
          </>
        )}
        <Route path="/player" element={<AnimatedPage><PlaylistPlayer /></AnimatedPage>} />
      </Routes>
    </>
  );
}

export default App;
