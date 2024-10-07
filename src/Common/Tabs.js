import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TabsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: space-around;
  cursor: pointer;
  margin-bottom: 20px;
`;

const TabButton = styled(motion.button)`
  padding: 10px 20px;
  font-size: 1rem;
  background: #e9ecef;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #d0d7de;
  }
`;

const TabContent = styled(motion.div)`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'Tab 1', content: 'İçerik 1' },
    { title: 'Tab 2', content: 'İçerik 2' },
    { title: 'Tab 3', content: 'İçerik 3' },
  ];

  return (
    <TabsContainer>
      <TabHeader>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            onClick={() => setActiveTab(index)}
            whileHover={{ scale: 1.05 }}
          >
            {tab.title}
          </TabButton>
        ))}
      </TabHeader>
      <TabContent
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {tabs[activeTab].content}
      </TabContent>
    </TabsContainer>
  );
};

export default Tabs;
