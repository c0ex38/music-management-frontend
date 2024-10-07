import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NavbarContainer = styled.nav`
  width: 100%;
  background: linear-gradient(135deg, #3a8bcd, #56b7f5);
  padding: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const NavbarList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavbarItem = styled(motion.li)`
  font-size: 1rem;
  font-weight: bold;
`;

const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarList>
        <NavbarItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavbarLink to="/">Müzik Listesi</NavbarLink>
        </NavbarItem>
        <NavbarItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavbarLink to="/upload">Müzik Yükle</NavbarLink>
        </NavbarItem>
        <NavbarItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavbarLink to="/playlist-manager">Çalma Listesi Yöneticisi</NavbarLink>
        </NavbarItem>
        <NavbarItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavbarLink to="/schedule">Zamanlama</NavbarLink>
        </NavbarItem>
        <NavbarItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavbarLink to="/player">Müzik Çalar</NavbarLink>
        </NavbarItem>
        <NavbarItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavbarLink to="/play-history-report">Çalma Geçmişi</NavbarLink>
        </NavbarItem>
        <NavbarItem whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <NavbarLink to="/play-count-chart">Çalma Grafiği</NavbarLink>
        </NavbarItem>
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;
