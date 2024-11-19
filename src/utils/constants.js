import logo1 from '../images/SVG - Urgent Priority colour.svg'
import logo2 from '../images/Img - High Priority.svg'
import logo3 from '../images/Img - Medium Priority.svg'
import logo4 from '../images/Img - Low Priority.svg'
import logo5 from '../images/No-priority.svg'
import logo6 from '../images/To-do.svg'
import logo7 from '../images/in-progress.svg'
import logo8 from '../images/Done.svg'
import logo9 from '../images/Cancelled.svg'
import logo10 from '../images/Backlog.svg'

export const PRIORITY_MAP = {
    4: { label: "Urgent", icon:  logo1  },
    3: { label: "High", icon: logo2  },
    2: { label: "Medium", icon:  logo3  },
    1: { label: "Low", icon:  logo4  },
    0: { label: "No priority", icon: logo5  }
};

export const STATUS_MAP = {
    "Todo": { icon: logo6  },
    "In progress": { icon: logo7  },
    "Done": { icon:  logo8  },
    "Canceled": { icon: logo9  },
    "Backlog": { icon: logo10  }
};