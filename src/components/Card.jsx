import React from 'react';
import { PRIORITY_MAP, STATUS_MAP } from '../utils/constants';

const Card = ({ ticket, users, groupBy }) => {
  const user = users.find(u => u.id === ticket.userId);
  
  return (
    <div className="ticket-card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {groupBy !== 'user' && (
          <div className="user-avatar">
            <img 
              src={user?.avatar || '/placeholder.svg'} 
              alt={user?.name}
              className="avatar-img"
            />
          </div>
        )}
      </div>
      <div className="card-title">
        <h3>{ticket.title}</h3>
      </div>
      <div className="card-tags">
        {groupBy !== 'priority' && (
          <span className="priority-tag">
            <img src={PRIORITY_MAP[ticket.priority].icon} alt="" />
          </span>
        )}
        {groupBy !== 'status' && (
          <span className="status-tag">
            <img src={STATUS_MAP[ticket.status].icon} alt="" />
             {ticket.status}
          </span>
        )}
        <span className="feature-tag">
          <span className="dot">●</span>
          Feature Request
        </span>
      </div>
    </div>
  );
};

export default Card;