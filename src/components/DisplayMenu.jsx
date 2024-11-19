import React from 'react';

const DisplayMenu = ({ selectedOptions, setSelectedOptions, show }) => {
  if (!show) return null;

  return (
    <div className="display-menu">
      <div className="menu-item">
        <label>Grouping</label>
        <select 
          value={selectedOptions.groupBy}
          onChange={(e) => setSelectedOptions(prev => ({
            ...prev,
            groupBy: e.target.value
          }))}
        >
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="menu-item">
        <label>Ordering</label>
        <select
          value={selectedOptions.orderBy}
          onChange={(e) => setSelectedOptions(prev => ({
            ...prev,
            orderBy: e.target.value
          }))}
        >
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
};

export default DisplayMenu;