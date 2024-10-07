import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  width: 250px;
  height: 150px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #3a3a3a;
  cursor: pointer;
`;

const AnimatedCard = ({ text }) => {
  return (
    <Card
      whileHover={{
        scale: 1.05,
        rotate: 1,
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </Card>
  );
};

export default AnimatedCard;
