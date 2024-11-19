// import { useEffect, useState } from 'react';

// // Constants
// const PRIORITY_MAP = {
//   4: { label: "Urgent", icon: "🔴" },
//   3: { label: "High", icon: "🟠" },
//   2: { label: "Medium", icon: "🟡" },
//   1: { label: "Low", icon: "🔵" },
//   0: { label: "No priority", icon: "⚪" }
// };

// const STATUS_MAP = {
//   "Todo": { icon: "📋" },
//   "In progress": { icon: "🔧" },
//   "Done": { icon: "✅" },
//   "Canceled": { icon: "❌" },
//   "Backlog": { icon: "📚" }
// };

// // Utility functions
// const groupTickets = (tickets, groupBy) => {
//   return tickets.reduce((groups, ticket) => {
//     let key;
//     switch (groupBy) {
//       case 'status':
//         key = ticket.status;
//         break;
//       case 'user':
//         key = ticket.userId;
//         break;
//       case 'priority':
//         key = ticket.priority;
//         break;
//       default:
//         key = 'default';
//     }
//     if (!groups[key]) {
//       groups[key] = [];
//     }
//     groups[key].push(ticket);
//     return groups;
//   }, {});
// };

// const sortTickets = (tickets, orderBy) => {
//   return [...tickets].sort((a, b) => {
//     if (orderBy === 'priority') {
//       return b.priority - a.priority;
//     }
//     if (orderBy === 'title') {
//       return a.title.localeCompare(b.title);
//     }
//     return 0;
//   });
// };

// // Components
// const DisplayButton = ({ selectedOptions, setShowDisplayMenu }) => {
//   return (
//     <button
//       className="display-button"
//       onClick={() => setShowDisplayMenu(prev => !prev)}
//     >
//       <span className="icon">≡</span>
//       Display
//       <span className="icon">▼</span>
//     </button>
//   );
// };

// const DisplayMenu = ({ selectedOptions, setSelectedOptions, show }) => {
//   if (!show) return null;

//   return (
//     <div className="display-menu">
//       <div className="menu-item">
//         <label>Grouping</label>
//         <select
//           value={selectedOptions.groupBy}
//           onChange={(e) => setSelectedOptions(prev => ({
//             ...prev,
//             groupBy: e.target.value
//           }))}
//         >
//           <option value="status">Status</option>
//           <option value="user">User</option>
//           <option value="priority">Priority</option>
//         </select>
//       </div>
//       <div className="menu-item">
//         <label>Ordering</label>
//         <select
//           value={selectedOptions.orderBy}
//           onChange={(e) => setSelectedOptions(prev => ({
//             ...prev,
//             orderBy: e.target.value
//           }))}
//         >
//           <option value="priority">Priority</option>
//           <option value="title">Title</option>
//         </select>
//       </div>
//     </div>
//   );
// };

// const Card = ({ ticket, users, groupBy }) => {
//   const user = users.find(u => u.id === ticket.userId);

//   return (
//     <div className="ticket-card">
//       <div className="card-header">
//         <span className="ticket-id">{ticket.id}</span>
//         {groupBy !== 'user' && (
//           <div className="user-avatar">
//             <img
//               src={user?.avatar || '/placeholder.svg'}
//               alt={user?.name}
//               className="avatar-img"
//             />
//           </div>
//         )}
//       </div>
//       <div className="card-title">
//         <h3>{ticket.title}</h3>
//       </div>
//       <div className="card-tags">
//         {groupBy !== 'priority' && (
//           <span className="priority-tag">
//             {PRIORITY_MAP[ticket.priority].icon}
//           </span>
//         )}
//         {groupBy !== 'status' && (
//           <span className="status-tag">
//             {STATUS_MAP[ticket.status].icon} {ticket.status}
//           </span>
//         )}
//         <span className="feature-tag">
//           <span className="dot">●</span>
//           Feature Request
//         </span>
//       </div>
//     </div>
//   );
// };

// const Column = ({ title, tickets, users, icon, groupBy }) => {
//   return (
//     <div className="column">
//       <div className="column-header">
//         <div className="header-left">
//           {icon && <span className="column-icon">{icon}</span>}
//           <span className="column-title">{title}</span>
//           <span className="ticket-count">{tickets.length}</span>
//         </div>
//         <div className="header-right">
//           <button className="add-button">+</button>
//           <button className="more-button">⋯</button>
//         </div>
//       </div>
//       <div className="column-content">
//         {tickets.map(ticket => (
//           <Card key={ticket.id} ticket={ticket} users={users} groupBy={groupBy} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Board = ({ tickets, users, selectedOptions }) => {
//   const groupedTickets = groupTickets(tickets, selectedOptions.groupBy);

//   return (
//     <div className="board">
//       {Object.entries(groupedTickets).map(([key, tickets]) => {
//         const sortedTickets = sortTickets(tickets, selectedOptions.orderBy);
//         let title = key;
//         let icon = null;

//         if (selectedOptions.groupBy === 'priority') {
//           title = PRIORITY_MAP[key].label;
//           icon = PRIORITY_MAP[key].icon;
//         } else if (selectedOptions.groupBy === 'user') {
//           const user = users.find(u => u.id === key);
//           title = user?.name || 'Unassigned';
//           icon = user?.avatar ? <img src={user.avatar} alt={user.name} className="user-icon" /> : null;
//         } else if (selectedOptions.groupBy === 'status') {
//           icon = STATUS_MAP[key].icon;
//         }

//         return (
//           <Column
//             key={key}
//             title={title}
//             tickets={sortedTickets}
//             users={users}
//             icon={icon}
//             groupBy={selectedOptions.groupBy}
//           />
//         );
//       })}
//     </div>
//   );
// };

// // Main App Component
// export default function App() {
//   const [tickets, setTickets] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showDisplayMenu, setShowDisplayMenu] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState(() => {
//     const saved = localStorage.getItem('kanbanOptions');
//     return saved ? JSON.parse(saved) : {
//       groupBy: 'status',
//       orderBy: 'priority'
//     };
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
//         const data = await response.json();
//         setTickets(data.tickets);
//         setUsers(data.users);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('kanbanOptions', JSON.stringify(selectedOptions));
//   }, [selectedOptions]);

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <div className="app">
//       <header className="header">
//         <DisplayButton
//           selectedOptions={selectedOptions}
//           setShowDisplayMenu={setShowDisplayMenu}
//         />
//         <DisplayMenu
//           selectedOptions={selectedOptions}
//           setSelectedOptions={setSelectedOptions}
//           show={showDisplayMenu}
//         />
//       </header>
//       <main className="main">
//         <Board
//           tickets={tickets}
//           users={users}
//           selectedOptions={selectedOptions}
//         />
//       </main>
//       <style jsx>{`
//         .app {
//           min-height: 100vh;
//           background: #f4f5f8;
//         }

//         .header {
//           background: white;
//           padding: 16px 24px;
//           border-bottom: 1px solid #e6e7eb;
//           position: relative;
//         }

//         .display-button {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           padding: 8px 12px;
//           border: 1px solid #e6e7eb;
//           border-radius: 4px;
//           background: white;
//           cursor: pointer;
//         }

//         .display-menu {
//           position: absolute;
//           top: 100%;
//           left: 24px;
//           background: white;
//           border: 1px solid #e6e7eb;
//           border-radius: 8px;
//           padding: 16px;
//           box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//           z-index: 10;
//         }

//         .menu-item {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           margin-bottom: 8px;
//         }

//         .menu-item select {
//           padding: 4px 8px;
//           border: 1px solid #e6e7eb;
//           border-radius: 4px;
//         }

//         .main {
//           padding: 24px;
//           overflow-x: auto;
//         }

//         .board {
//           display: flex;
//           gap: 24px;
//           min-width: min-content;
//         }

//         .column {
//           min-width: 300px;
//           max-width: 350px;
//           background: #f4f5f8;
//           flex: 1;
//         }

//         .column-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 8px 16px;
//           margin-bottom: 16px;
//         }

//         .header-left {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }

//         .column-title {
//           font-weight: 500;
//         }

//         .ticket-count {
//           color: #6b7280;
//         }

//         .header-right {
//           display: flex;
//           gap: 8px;
//         }

//         .column-content {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           padding: 0 16px;
//         }

//         .ticket-card {
//           background: white;
//           border: 1px solid #e6e7eb;
//           border-radius: 8px;
//           padding: 16px;
//         }

//         .card-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 8px;
//         }

//         .ticket-id {
//           color: #6b7280;
//           font-size: 14px;
//         }

//         .card-title {
//           margin-bottom: 16px;
//         }

//         .card-title h3 {
//           font-size: 14px;
//           font-weight: 500;
//           margin: 0;
//         }

//         .card-tags {
//           display: flex;
//           gap: 8px;
//           align-items: center;
//           flex-wrap: wrap;
//         }

//         .priority-tag, .status-tag, .feature-tag {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           padding: 2px 8px;
//           border: 1px solid #e6e7eb;
//           border-radius: 4px;
//           font-size: 12px;
//         }

//         .dot {
//           color: #6b7280;
//           font-size: 10px;
//         }

//         .user-avatar {
//           width: 24px;
//           height: 24px;
//           border-radius: 50%;
//           overflow: hidden;
//         }

//         .avatar-img, .user-icon {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .loading {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           min-height: 100vh;
//           font-size: 18px;
//           color: #6b7280;
//         }

//         @media (max-width: 768px) {
//           .main {
//             padding: 16px;
//           }

//           .board {
//             flex-direction: column;
//             align-items: center;
//           }

//           .column {
//             width: 100%;
//             max-width: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

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