

import React, { useEffect, useState } from 'react';
import DisplayButton from './components/DisplayButton';
import DisplayMenu from './components/DisplayMenu';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDisplayMenu, setShowDisplayMenu] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const saved = localStorage.getItem('kanbanOptions');
    return saved ? JSON.parse(saved) : {
      groupBy: 'status',
      orderBy: 'priority'
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanOptions', JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <DisplayButton
          selectedOptions={selectedOptions}
          setShowDisplayMenu={setShowDisplayMenu}
        />
        <DisplayMenu
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          show={showDisplayMenu}
        />
      </header>
      <main className="main">
        <KanbanBoard
          tickets={tickets}
          users={users}
          selectedOptions={selectedOptions}
        />
      </main>
    </div>
  );
}