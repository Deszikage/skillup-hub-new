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
];

export const categories = ["All", "HTML", "CSS", "JavaScript", "Networking", "Web Dev"];

export function getRandomQuestions(category: string, count: number = 10): Question[] {
  const pool = category === "All" ? allQuestions : allQuestions.filter((q) => q.category === category);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default allQuestions;
