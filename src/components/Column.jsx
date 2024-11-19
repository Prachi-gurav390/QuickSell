import React from "react";
import Card from "./Card";
import logo1 from "../images/add.svg";
import logo2 from "../images/3 dot menu.svg";

const Column = ({ title, tickets, users, icon, groupBy }) => {
  return (
    <div className="column">
      <div className="column-header">
        <div className="header-left">
          {icon && <img src={icon} className="column-icon" alt="" /> }
          
          <span className="column-title">{title}</span>
          <span className="ticket-count">{tickets.length}</span>
        </div>
        <div className="header-right">
          <button className="add-button">
            <img src={logo1} alt="" />
          </button>
          <button className="more-button">
            <img src={logo2} alt="" />
          </button>
        </div>
      </div>
      <div className="column-content">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            ticket={ticket}
            users={users}
            groupBy={groupBy}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
