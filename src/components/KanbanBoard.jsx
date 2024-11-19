import React from "react";
import Column from "../components/Column";
import { PRIORITY_MAP, STATUS_MAP } from "../utils/constants";
import { groupTickets, sortTickets } from "../utils/utils";

const KanbanBoard = ({ tickets, users, selectedOptions }) => {
  const groupedTickets = groupTickets(tickets, selectedOptions.groupBy);

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([key, tickets]) => {
        const sortedTickets = sortTickets(tickets, selectedOptions.orderBy);
        let title = key;
        let icon = null;

        if (selectedOptions.groupBy === "priority") {
          title = PRIORITY_MAP[key].label;
          icon = PRIORITY_MAP[key].icon;
        } else if (selectedOptions.groupBy === "user") {
          const user = users.find((u) => u.id === key);
          title = user?.name || "Unassigned";
          icon = user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="user-icon" />
          ) : null;
        } else if (selectedOptions.groupBy === "status") {
          icon = STATUS_MAP[key].icon;
        }

        return (
          <Column
            key={key}
            title={title}
            tickets={sortedTickets}
            users={users}
            icon={icon}
            groupBy={selectedOptions.groupBy}
          />
        );
      })}
    </div>
  );
};

export default KanbanBoard;
