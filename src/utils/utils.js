export const groupTickets = (tickets, groupBy) => {
    return tickets.reduce((groups, ticket) => {
      let key;
      switch (groupBy) {
        case 'status':
          key = ticket.status;
          break;
        case 'user':
          key = ticket.userId;
          break;
        case 'priority':
          key = ticket.priority;
          break;
        default:
          key = 'default';
      }
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(ticket);
      return groups;
    }, {});
  };
  
  export const sortTickets = (tickets, orderBy) => {
    return [...tickets].sort((a, b) => {
      if (orderBy === 'priority') {
        return b.priority - a.priority;
      }
      if (orderBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };