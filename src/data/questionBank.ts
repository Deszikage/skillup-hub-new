export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
}

const allQuestions: Question[] = [
  // HTML
  { id: 1, category: "HTML", question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Machine Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], correct: 0 },
  { id: 2, category: "HTML", question: "Which tag is used for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], correct: 2 },
  { id: 3, category: "HTML", question: "Which HTML element defines navigation links?", options: ["<navigate>", "<nav>", "<navigation>", "<link>"], correct: 1 },
  { id: 4, category: "HTML", question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<lb>", "<br>", "<newline>"], correct: 2 },
  { id: 5, category: "HTML", question: "Which attribute specifies an alternate text for an image?", options: ["title", "src", "alt", "longdesc"], correct: 2 },
  { id: 6, category: "HTML", question: "What is the correct HTML for creating a hyperlink?", options: ["<a url='...'>", "<a href='...'>", "<link href='...'>", "<hyperlink>"], correct: 1 },
  { id: 7, category: "HTML", question: "Which element is used to define an unordered list?", options: ["<ol>", "<list>", "<ul>", "<dl>"], correct: 2 },
  { id: 8, category: "HTML", question: "Which input type creates a checkbox?", options: ["type='check'", "type='checkbox'", "type='tick'", "type='box'"], correct: 1 },
  { id: 9, category: "HTML", question: "What does the <meta> tag do?", options: ["Adds metadata", "Creates a menu", "Defines a method", "Adds media"], correct: 0 },
  { id: 10, category: "HTML", question: "Which tag is used to define a table row?", options: ["<td>", "<th>", "<tr>", "<table-row>"], correct: 2 },

  // CSS
  { id: 11, category: "CSS", question: "Which CSS property changes text color?", options: ["font-color", "text-color", "color", "foreground"], correct: 2 },
  { id: 12, category: "CSS", question: "Which display value makes an element a flex container?", options: ["display: block", "display: flex", "display: grid", "display: inline"], correct: 1 },
  { id: 13, category: "CSS", question: "How do you select an element with id 'main'?", options: [".main", "#main", "main", "*main"], correct: 1 },
  { id: 14, category: "CSS", question: "Which property controls the space between elements?", options: ["spacing", "margin", "border", "indent"], correct: 1 },
  { id: 15, category: "CSS", question: "Which unit is relative to the font size of the element?", options: ["px", "em", "vh", "cm"], correct: 1 },
  { id: 16, category: "CSS", question: "What does 'z-index' control?", options: ["Font size", "Opacity", "Stacking order", "Width"], correct: 2 },
  { id: 17, category: "CSS", question: "Which property makes text bold?", options: ["font-style: bold", "text-weight: bold", "font-weight: bold", "text-style: bold"], correct: 2 },
  { id: 18, category: "CSS", question: "What is the default position value?", options: ["relative", "absolute", "fixed", "static"], correct: 3 },
  { id: 19, category: "CSS", question: "Which property creates rounded corners?", options: ["corner-radius", "border-radius", "box-radius", "round-corner"], correct: 1 },
  { id: 20, category: "CSS", question: "How do you make a responsive image?", options: ["width: 100%", "responsive: true", "auto-size: on", "fit: responsive"], correct: 0 },

  // JavaScript
  { id: 21, category: "JavaScript", question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "define", "dim"], correct: 1 },
  { id: 22, category: "JavaScript", question: "What does '===' check?", options: ["Value only", "Type only", "Value and type", "Reference"], correct: 2 },
  { id: 23, category: "JavaScript", question: "Which method adds an element to the end of an array?", options: ["append()", "push()", "add()", "insert()"], correct: 1 },
  { id: 24, category: "JavaScript", question: "What is 'typeof null'?", options: ["'null'", "'undefined'", "'object'", "'boolean'"], correct: 2 },
  { id: 25, category: "JavaScript", question: "Which function parses a string to an integer?", options: ["Integer.parse()", "parseInt()", "Number.toInt()", "parseInteger()"], correct: 1 },
  { id: 26, category: "JavaScript", question: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Oriented Notation", "Java Source Open Notation"], correct: 0 },
  { id: 27, category: "JavaScript", question: "Which method converts an array to a string?", options: ["toString()", "stringify()", "concat()", "join()"], correct: 3 },
  { id: 28, category: "JavaScript", question: "What does 'async' keyword do?", options: ["Makes a function synchronous", "Declares a function that returns a Promise", "Pauses execution", "Runs code in parallel"], correct: 1 },
  { id: 29, category: "JavaScript", question: "How do you create a new object?", options: ["Object.create()", "new Object()", "{}", "All of the above"], correct: 3 },
  { id: 30, category: "JavaScript", question: "What is event bubbling?", options: ["Events flow from child to parent", "Events flow from parent to child", "Events only fire once", "Events are queued"], correct: 0 },

  // Networking
  { id: 31, category: "Networking", question: "What port does HTTPS use by default?", options: ["80", "8080", "443", "21"], correct: 2 },
  { id: 32, category: "Networking", question: "What does DNS stand for?", options: ["Data Network System", "Domain Name System", "Digital Network Service", "Domain Network Server"], correct: 1 },
  { id: 33, category: "Networking", question: "Which protocol is connectionless?", options: ["TCP", "UDP", "HTTP", "FTP"], correct: 1 },
  { id: 34, category: "Networking", question: "What layer does HTTP operate on?", options: ["Transport", "Network", "Application", "Data Link"], correct: 2 },
  { id: 35, category: "Networking", question: "What is a subnet mask used for?", options: ["Encrypting data", "Dividing networks", "Routing emails", "Compressing files"], correct: 1 },
  { id: 36, category: "Networking", question: "What does TCP stand for?", options: ["Transfer Control Protocol", "Transmission Control Protocol", "Transport Connection Protocol", "Terminal Control Protocol"], correct: 1 },
  { id: 37, category: "Networking", question: "Which device connects two different networks?", options: ["Hub", "Switch", "Router", "Repeater"], correct: 2 },
  { id: 38, category: "Networking", question: "What is an IP address?", options: ["Internet Protocol address", "Internal Process address", "Internet Port address", "Interface Protocol address"], correct: 0 },
  { id: 39, category: "Networking", question: "What is latency?", options: ["Bandwidth", "Delay in data transmission", "Packet loss", "Data throughput"], correct: 1 },
  { id: 40, category: "Networking", question: "Which HTTP method is used to retrieve data?", options: ["POST", "PUT", "GET", "DELETE"], correct: 2 },

  // Web Development
  { id: 41, category: "Web Dev", question: "What is a REST API?", options: ["A database type", "A design pattern for web services", "A programming language", "A CSS framework"], correct: 1 },
  { id: 42, category: "Web Dev", question: "What does CORS stand for?", options: ["Cross-Origin Resource Sharing", "Client Object Resource System", "Cross-Origin Request Service", "Client-Origin Resource Sharing"], correct: 0 },
  { id: 43, category: "Web Dev", question: "What is a CDN?", options: ["Content Delivery Network", "Central Data Node", "Cached Domain Network", "Content Distribution Node"], correct: 0 },
  { id: 44, category: "Web Dev", question: "What is the purpose of a web server?", options: ["Design websites", "Serve web content to clients", "Write code", "Manage databases"], correct: 1 },
  { id: 45, category: "Web Dev", question: "What is server-side rendering?", options: ["Rendering on the client", "HTML generated on the server", "Using WebGL", "CSS animations"], correct: 1 },
  { id: 46, category: "Web Dev", question: "What is a cookie used for?", options: ["Styling pages", "Storing small data on client", "Running scripts", "Creating animations"], correct: 1 },
  { id: 47, category: "Web Dev", question: "What is OAuth?", options: ["A database", "An authorization framework", "A CSS library", "A testing tool"], correct: 1 },
  { id: 48, category: "Web Dev", question: "What does SPA stand for?", options: ["Single Page Application", "Server Page Application", "Static Page Architecture", "Simple Page App"], correct: 0 },
  { id: 49, category: "Web Dev", question: "What is caching?", options: ["Deleting data", "Storing data for faster access", "Encrypting data", "Compressing files"], correct: 1 },
  { id: 50, category: "Web Dev", question: "What is a WebSocket?", options: ["A CSS property", "Full-duplex communication protocol", "A database query", "A file format"], correct: 1 },

  // Python
  { id: 51, category: "Python", question: "What keyword is used to define a function in Python?", options: ["function", "func", "def", "define"], correct: 2 },
  { id: 52, category: "Python", question: "Which data type is immutable in Python?", options: ["list", "dict", "set", "tuple"], correct: 3 },
  { id: 53, category: "Python", question: "What does 'len()' do?", options: ["Returns the length", "Creates a list", "Loops through items", "Converts to string"], correct: 0 },
  { id: 54, category: "Python", question: "How do you start a comment in Python?", options: ["//", "/*", "#", "--"], correct: 2 },
  { id: 55, category: "Python", question: "What is a Python dictionary?", options: ["An ordered list", "A key-value pair collection", "A set of numbers", "A text file"], correct: 1 },
  { id: 56, category: "Python", question: "Which keyword is used for loops in Python?", options: ["loop", "for", "repeat", "iterate"], correct: 1 },
  { id: 57, category: "Python", question: "What does 'pip' stand for?", options: ["Python Install Package", "Pip Installs Packages", "Package Installer for Python", "Python Interface Program"], correct: 1 },
  { id: 58, category: "Python", question: "What is a list comprehension?", options: ["A way to debug", "A concise way to create lists", "A sorting algorithm", "A type of loop"], correct: 1 },
  { id: 59, category: "Python", question: "Which method adds an item to a list?", options: ["push()", "add()", "append()", "insert_end()"], correct: 2 },
  { id: 60, category: "Python", question: "What does 'self' refer to in a class?", options: ["The module", "The current instance", "The parent class", "A global variable"], correct: 1 },

  // React
  { id: 61, category: "React", question: "What is JSX?", options: ["A database query language", "JavaScript XML syntax extension", "A CSS preprocessor", "A testing framework"], correct: 1 },
  { id: 62, category: "React", question: "What hook is used to manage state?", options: ["useEffect", "useState", "useRef", "useMemo"], correct: 1 },
  { id: 63, category: "React", question: "What are props in React?", options: ["CSS styles", "Data passed to components", "Database queries", "Event handlers only"], correct: 1 },
  { id: 64, category: "React", question: "What does useEffect do?", options: ["Manages state", "Handles side effects", "Creates components", "Styles elements"], correct: 1 },
  { id: 65, category: "React", question: "What is the virtual DOM?", options: ["A real DOM copy", "A lightweight JS representation of the DOM", "A CSS framework", "A browser API"], correct: 1 },
  { id: 66, category: "React", question: "How do you conditionally render in React?", options: ["if/else in JSX directly", "Ternary operator or &&", "switch statement only", "CSS display property"], correct: 1 },
  { id: 67, category: "React", question: "What is a React component?", options: ["A CSS class", "A reusable piece of UI", "A database table", "An HTML file"], correct: 1 },
  { id: 68, category: "React", question: "What does 'key' prop do in lists?", options: ["Styles items", "Helps React identify which items changed", "Sorts the list", "Filters items"], correct: 1 },
  { id: 69, category: "React", question: "What is React Router used for?", options: ["State management", "Client-side routing", "API calls", "Form validation"], correct: 1 },
  { id: 70, category: "React", question: "What is a controlled component?", options: ["A locked component", "Form element controlled by React state", "A server component", "A styled component"], correct: 1 },

  // Databases
  { id: 71, category: "Databases", question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Question Language", "Standard Query Logic", "System Query Language"], correct: 0 },
  { id: 72, category: "Databases", question: "Which SQL command retrieves data?", options: ["GET", "FETCH", "SELECT", "RETRIEVE"], correct: 2 },
  { id: 73, category: "Databases", question: "What is a primary key?", options: ["The first column", "A unique identifier for each row", "A foreign table link", "An index type"], correct: 1 },
  { id: 74, category: "Databases", question: "What is normalization?", options: ["Deleting duplicates", "Organizing data to reduce redundancy", "Encrypting data", "Backing up tables"], correct: 1 },
  { id: 75, category: "Databases", question: "What is a foreign key?", options: ["A key from another country", "A field linking to another table's primary key", "An encryption key", "A unique constraint"], correct: 1 },
  { id: 76, category: "Databases", question: "What does CRUD stand for?", options: ["Create, Read, Update, Delete", "Copy, Retrieve, Undo, Drop", "Create, Retrieve, Upload, Delete", "Connect, Read, Update, Disconnect"], correct: 0 },
  { id: 77, category: "Databases", question: "What is an index used for?", options: ["Styling tables", "Speeding up queries", "Encrypting data", "Creating backups"], correct: 1 },
  { id: 78, category: "Databases", question: "What is a JOIN?", options: ["Merging two databases", "Combining rows from two or more tables", "Deleting records", "Creating a new table"], correct: 1 },
  { id: 79, category: "Databases", question: "What is NoSQL?", options: ["No database at all", "Non-relational database", "A SQL version", "A query optimizer"], correct: 1 },
  { id: 80, category: "Databases", question: "What is a transaction?", options: ["A payment", "A unit of work that is atomic", "A table type", "A query plan"], correct: 1 },

  // Cybersecurity
  { id: 81, category: "Cybersecurity", question: "What is phishing?", options: ["A fishing app", "A social engineering attack via fake messages", "A network protocol", "A type of firewall"], correct: 1 },
  { id: 82, category: "Cybersecurity", question: "What does HTTPS provide over HTTP?", options: ["Faster speed", "Encryption via TLS/SSL", "More bandwidth", "Better HTML"], correct: 1 },
  { id: 83, category: "Cybersecurity", question: "What is SQL injection?", options: ["Adding SQL to a database", "Inserting malicious SQL via user input", "A database optimization", "A backup method"], correct: 1 },
  { id: 84, category: "Cybersecurity", question: "What is a firewall?", options: ["A physical wall", "A network security system that monitors traffic", "A type of virus", "A coding language"], correct: 1 },
  { id: 85, category: "Cybersecurity", question: "What is two-factor authentication?", options: ["Using two passwords", "Verifying identity with two different methods", "Logging in twice", "Having two accounts"], correct: 1 },
  { id: 86, category: "Cybersecurity", question: "What is XSS?", options: ["Extra Style Sheets", "Cross-Site Scripting", "Extended Server Service", "Cross-System Security"], correct: 1 },
  { id: 87, category: "Cybersecurity", question: "What is encryption?", options: ["Deleting data", "Converting data into an unreadable format", "Compressing files", "Uploading to cloud"], correct: 1 },
  { id: 88, category: "Cybersecurity", question: "What is a VPN?", options: ["Virtual Private Network", "Very Private Node", "Virtual Public Network", "Verified Protocol Network"], correct: 0 },
  { id: 89, category: "Cybersecurity", question: "What is a DDoS attack?", options: ["Data Download Service", "Distributed Denial of Service", "Direct Database Override", "Dynamic Domain System"], correct: 1 },
  { id: 90, category: "Cybersecurity", question: "What is hashing?", options: ["Reversible encryption", "One-way function producing a fixed-size output", "File compression", "Data transfer"], correct: 1 },

  // Git
  { id: 91, category: "Git", question: "What does 'git init' do?", options: ["Clones a repo", "Initializes a new Git repository", "Pushes changes", "Deletes a repo"], correct: 1 },
  { id: 92, category: "Git", question: "What does 'git clone' do?", options: ["Creates a branch", "Copies a remote repository locally", "Merges branches", "Deletes files"], correct: 1 },
  { id: 93, category: "Git", question: "What is a branch in Git?", options: ["A backup", "A parallel version of the codebase", "A commit message", "A remote server"], correct: 1 },
  { id: 94, category: "Git", question: "What does 'git pull' do?", options: ["Pushes code", "Fetches and merges remote changes", "Deletes a branch", "Creates a tag"], correct: 1 },
  { id: 95, category: "Git", question: "What is a merge conflict?", options: ["A server error", "When two branches have competing changes", "A deleted file", "A network issue"], correct: 1 },
  { id: 96, category: "Git", question: "What does 'git status' show?", options: ["Commit history", "The state of the working directory", "Remote URLs", "Branch list only"], correct: 1 },
  { id: 97, category: "Git", question: "What is a commit?", options: ["A file deletion", "A snapshot of changes", "A branch merge", "A remote push"], correct: 1 },
  { id: 98, category: "Git", question: "What does 'git stash' do?", options: ["Deletes changes", "Temporarily shelves changes", "Pushes to remote", "Creates a branch"], correct: 1 },
  { id: 99, category: "Git", question: "What is a pull request?", options: ["Downloading code", "A request to merge changes into a branch", "A git command", "A server restart"], correct: 1 },
  { id: 100, category: "Git", question: "What does '.gitignore' do?", options: ["Ignores Git", "Specifies files Git should not track", "Deletes files", "Hides the repo"], correct: 1 },

  // DevOps
  { id: 101, category: "DevOps", question: "What is CI/CD?", options: ["Code Integration / Code Delivery", "Continuous Integration / Continuous Delivery", "Computer Interface / Computer Design", "Central Index / Central Database"], correct: 1 },
  { id: 102, category: "DevOps", question: "What is Docker?", options: ["A programming language", "A containerization platform", "A database", "A web server"], correct: 1 },
  { id: 103, category: "DevOps", question: "What is a container?", options: ["A virtual machine", "A lightweight, isolated environment for running apps", "A database table", "A web page"], correct: 1 },
  { id: 104, category: "DevOps", question: "What is Kubernetes?", options: ["A coding language", "A container orchestration platform", "A database system", "A CI tool"], correct: 1 },
  { id: 105, category: "DevOps", question: "What is Infrastructure as Code?", options: ["Writing HTML", "Managing infrastructure through code/config files", "Building servers manually", "A CSS framework"], correct: 1 },
  { id: 106, category: "DevOps", question: "What is a Dockerfile?", options: ["A log file", "A script to build a Docker image", "A configuration file for Git", "A test file"], correct: 1 },
  { id: 107, category: "DevOps", question: "What does 'scaling' mean in DevOps?", options: ["Writing more code", "Adjusting resources to handle load", "Deleting old servers", "Updating packages"], correct: 1 },
  { id: 108, category: "DevOps", question: "What is a pipeline in CI/CD?", options: ["A data pipe", "An automated sequence of build/test/deploy steps", "A network cable", "A Docker container"], correct: 1 },
  { id: 109, category: "DevOps", question: "What is monitoring in DevOps?", options: ["Watching employees", "Observing system health and performance", "Writing tests", "Reviewing code"], correct: 1 },
  { id: 110, category: "DevOps", question: "What is a load balancer?", options: ["A weight scale", "Distributes network traffic across servers", "A database index", "A caching tool"], correct: 1 },
];

export const categories = ["All", "HTML", "CSS", "JavaScript", "Networking", "Web Dev", "Python", "React", "Databases", "Cybersecurity", "Git", "DevOps"];

export function getRandomQuestions(category: string, count: number = 10): Question[] {
  const pool = category === "All" ? allQuestions : allQuestions.filter((q) => q.category === category);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default allQuestions;
