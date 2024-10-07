import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const pageTransition = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 0.5 }}
            >
              <MusicList />
            </motion.div>
          }
        />
        <Route
          path="/upload"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 0.5 }}
            >
              <MusicUpload />
            </motion.div>
          }
        />
        <Route
          path="/playlist-manager"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 0.5 }}
            >
              <PlaylistManager />
            </motion.div>
          }
        />
        <Route
          path="/schedule"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 0.5 }}
            >
              <PlaylistSchedule />
            </motion.div>
          }
        />
        <Route
          path="/player"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 0.5 }}
            >
              <PlaylistPlayer />
            </motion.div>
          }
        />
        <Route
          path="/play-history-report"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 0.5 }}
            >
              <PlayHistoryReport />
            </motion.div>
          }
        />
        <Route
          path="/play-count-chart"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 0.5 }}
            >
              <PlayCountChart />
            </motion.div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
