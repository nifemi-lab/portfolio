window.LESSONS = {
  "tracks": [
    {
      "id": "track0",
      "icon": "🌐",
      "title": "Track 0 — How the Web Works",
      "lessons": [
        {
          "id": "t0l1",
          "title": "Client vs Server",
          "steps": [
            {
              "type": "text",
              "heading": "The two heroes of the web",
              "body": "Every website you've ever used involves two characters: the <b>client</b> (your browser — Chrome, Edge, Safari) and the <b>server</b> (a computer somewhere holding the website's files).",
              "analogy": "The client is the customer at a restaurant. The server is the kitchen."
            },
            {
              "type": "text",
              "heading": "How they talk",
              "body": "Your browser sends a <b>request</b> ('please give me this page'). The server sends back a <b>response</b> (the HTML, CSS, JS files). This back-and-forth is called HTTP — the language of the web.",
              "analogy": "It's exactly like a waiter taking your order to the kitchen and bringing back the food."
            },
            {
              "type": "quiz",
              "question": "Who holds the website's files?",
              "options": [
                "Your browser (the client)",
                "The server",
                "Wi-Fi",
                "The mouse"
              ],
              "answer": 1,
              "explain": "The server stores the site's files and sends them when asked.",
              "hint": "Think restaurant — who actually has the food?"
            },
            {
              "type": "code",
              "heading": "Say hello in JavaScript",
              "body": "JavaScript is the language that makes pages interactive. Try logging a message — it's your first line of code.",
              "starter": "console.log(\"Hello from the client!\");"
            },
            {
              "type": "write",
              "heading": "Your turn — no starter code ✍️",
              "body": "From memory: write one line that logs <b>Hello, world!</b> to the console. I'll watch and check it for you.",
              "expected": "Hello, world!",
              "mustInclude": [
                "console.log"
              ],
              "hint": "It looks like: console.log(\"Hello, world!\");"
            },
            {
              "type": "quiz",
              "question": "What does the client (browser) send to the server?",
              "options": [
                "A response",
                "A request",
                "A pizza",
                "JavaScript files only"
              ],
              "answer": 1,
              "explain": "Browser asks (request), server answers (response).",
              "hint": "The waiter takes the..."
            },
            {
              "type": "text",
              "heading": "Did you know?",
              "body": "When you type a URL and hit Enter, your browser makes a request, the server finds the files, and the response comes back — all in milliseconds.",
              "analogy": "Blink and you've already ordered and received the package."
            },
            {
              "type": "write",
              "heading": "Show me the client 🗣️",
              "body": "Write a line that logs which side you are (the client or the server).",
              "expected": "",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(\"I am the client!\");"
            }
          ]
        },
        {
          "id": "t0l2",
          "title": "What a URL Really Is",
          "steps": [
            {
              "type": "text",
              "heading": "URLs are just addresses",
              "body": "A URL like <code>https://example.com/page</code> has parts: the protocol (<b>https</b>), the domain (<b>example.com</b>), and the path (<b>/page</b>). That's it — a street address for the internet.",
              "analogy": "Protocol = delivery service, domain = the street, path = the house number."
            },
            {
              "type": "quiz",
              "question": "In https://example.com/about, what is “/about”?",
              "options": [
                "The protocol",
                "The domain",
                "The path",
                "The password"
              ],
              "answer": 2,
              "explain": "The path points to a specific page on that domain.",
              "hint": "Where on the site?"
            },
            {
              "type": "code",
              "heading": "Practice output",
              "body": "Log your favorite website's address.",
              "starter": "console.log(\"https://myfavorite.site\");"
            }
          ]
        },
        {
          "id": "t0l3",
          "title": "HTTP Status Codes",
          "steps": [
            {
              "type": "text",
              "heading": "Server's mood, in numbers",
              "body": "Every response has a status code: <b>200</b> OK, <b>404</b> not found, <b>500</b> server broke, <b>301</b> permanently moved. Learn to read them — they tell you where to debug.",
              "analogy": "Status codes are the server's emoji: 😊 200, 🤔 404, 💥 500."
            },
            {
              "type": "quiz",
              "question": "What does 404 mean?",
              "options": [
                "Success",
                "Page not found",
                "Server crashed",
                "Moved forever"
              ],
              "answer": 1,
              "explain": "404 = that thing isn't here.",
              "hint": "The classic missing page."
            }
          ]
        }
      ]
    },
    {
      "id": "track1",
      "icon": "🎨",
      "title": "Track 1 — Front-End",
      "lessons": [
        {
          "id": "t1l1",
          "title": "HTML: The Skeleton",
          "steps": [
            {
              "type": "text",
              "heading": "Structure first",
              "body": "HTML describes what a page <b>is</b>: headings, paragraphs, buttons. CSS dresses it. JavaScript animates it. Skeleton, skin, muscles.",
              "analogy": "HTML is the skeleton, CSS the skin/clothes, JS the muscles."
            },
            {
              "type": "quiz",
              "question": "Which language defines the structure of a page?",
              "options": [
                "CSS",
                "HTML",
                "JavaScript",
                "SQL"
              ],
              "answer": 1,
              "explain": "HTML = the skeleton. CSS = style. JS = behavior.",
              "hint": "Think: what holds the page up?"
            },
            {
              "type": "code",
              "heading": "Your first output",
              "body": "Logs work like console messages. Try printing a heading tag as text.",
              "starter": "console.log(\"<h1>Hi!</h1>\");"
            },
            {
              "type": "write",
              "heading": "Write it yourself ✍️",
              "body": "No starter code now. Write one line that logs your name. I'm watching! 👀",
              "expected": "",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(\"Ada\"); — but with YOUR name!"
            },
            {
              "type": "text",
              "heading": "Tags nest like boxes",
              "body": "Tags open and close: <div>…</div>. Inside a tag you can put others — that nesting is what builds the page tree.",
              "analogy": "Like gift boxes inside gift boxes."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Log a string of a simple HTML heading tag, like <h1>.",
              "expected": "<h1>",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(\"<h1>My Title</h1>\");"
            }
          ]
        },
        {
          "id": "t1l2",
          "title": "CSS: Making It Beautiful",
          "steps": [
            {
              "type": "text",
              "heading": "Style = selector + rules",
              "body": "CSS picks an element with a <b>selector</b> and gives it rules: color, size, spacing. Small rules, applied consistently, create beautiful design.",
              "analogy": "Selectors are like name tags — you style everyone wearing the same tag."
            },
            {
              "type": "quiz",
              "question": "What does a CSS selector do?",
              "options": [
                "Picks which HTML to style",
                "Creates a database",
                "Sends emails",
                "Runs the server"
              ],
              "answer": 0,
              "explain": "Selector = which element. Rule = how it looks.",
              "hint": "It chooses the target."
            }
          ]
        },
        {
          "id": "t1l3",
          "title": "JavaScript & the DOM",
          "steps": [
            {
              "type": "text",
              "heading": "The page as a tree",
              "body": "The browser turns your HTML into a tree of objects called the <b>DOM</b>. JavaScript can grab any node and change it — text, colors, even whole sections — instantly.",
              "analogy": "HTML is the family tree; the DOM lets you rename or move any relative."
            },
            {
              "type": "quiz",
              "question": "What is the DOM?",
              "options": [
                "A database",
                "The page as a tree of objects JS can change",
                "A CSS framework",
                "A browser setting"
              ],
              "answer": 1,
              "explain": "DOM = your HTML, live and editable from JS.",
              "hint": "A family tree of elements."
            },
            {
              "type": "code",
              "heading": "Quick practice",
              "body": "Log the message a button click would show.",
              "starter": "console.log(\"Button clicked!\");"
            }
          ]
        },
        {
          "id": "t1l4",
          "title": "Fetching Data (APIs)",
          "steps": [
            {
              "type": "text",
              "heading": "Asking servers for data",
              "body": "`fetch()` is how the front-end asks a server for data. It returns a <b>Promise</b> — a box that fills later when the server answers.",
              "analogy": "Like ordering delivery: you get a receipt now, food arrives later."
            },
            {
              "type": "quiz",
              "question": "fetch() returns…",
              "options": [
                "A database",
                "A Promise (fills later)",
                "A CSS file",
                "Instant HTML"
              ],
              "answer": 1,
              "explain": "Network takes time, so you get a Promise.",
              "hint": "A receipt, not the pizza."
            }
          ]
        },
        {
          "id": "t1l5",
          "title": "Events: Buttons That Do Things",
          "steps": [
            {
              "type": "text",
              "heading": "Pages react to you",
              "body": "An <b>event</b> is the page noticing something — a click, a keypress, a scroll. You attach a function to that event and your code runs at the perfect moment.",
              "analogy": "A doorbell. Press it (click), and something happens (handler runs)."
            },
            {
              "type": "quiz",
              "question": "What is an event in JS?",
              "options": [
                "A CSS rule",
                "The page noticing something like a click",
                "A database table",
                "A network error"
              ],
              "answer": 1,
              "explain": "Events = clicks, keys, scrolls. Handlers = your response.",
              "hint": "The doorbell rings."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Log the word 'clicked' — imagine it ran on a button press.",
              "expected": "clicked",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(\"clicked\");"
            }
          ]
        },
        {
          "id": "t1l6",
          "title": "Forms: Talking to Your Site",
          "steps": [
            {
              "type": "text",
              "heading": "Inputs and buttons",
              "body": "A <b>form</b> collects user input: text fields, checkboxes, buttons. Clicking submit sends the data to a server - that's how logins and signups work.",
              "analogy": "A form is a questionnaire dropped in the suggestion box."
            },
            {
              "type": "quiz",
              "question": "What does a submit button do?",
              "options": [
                "Sends the form data onward",
                "Resets the page",
                "Styles the button",
                "Deletes the input"
              ],
              "answer": 0,
              "explain": "Submit packages and sends the form data.",
              "hint": "It's where logs appear too."
            }
          ]
        }
      ]
    },
    {
      "id": "track2",
      "icon": "⚙️",
      "title": "Track 2 — Back-End",
      "lessons": [
        {
          "id": "t2l1",
          "title": "Servers Explained Simply",
          "steps": [
            {
              "type": "text",
              "heading": "A server is just a computer that answers",
              "body": "A server is a computer running a program that listens for requests and responds. That's the whole job. Node.js lets us write that program with JavaScript.",
              "analogy": "Server = a receptionist whose only job is answering requests."
            },
            {
              "type": "quiz",
              "question": "What does a server do?",
              "options": [
                "Only plays videos",
                "Listens for requests and responds",
                "Styles webpages",
                "Stores passwords only"
              ],
              "answer": 1,
              "explain": "Requests in, responses out.",
              "hint": "Receptionist energy 📠"
            },
            {
              "type": "text",
              "heading": "A server all day",
              "body": "Servers listen on a port (like a door number) for incoming requests. Node.js lets that listening be just a few lines of JavaScript.",
              "analogy": "A door number on a busy street."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Log the port number a server might listen on, e.g. 3000.",
              "expected": "3000",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(3000);"
            }
          ]
        },
        {
          "id": "t2l2",
          "title": "APIs: The Waiter Pattern",
          "steps": [
            {
              "type": "text",
              "heading": "APIs connect apps",
              "body": "An API lets one program ask another for data. Your front-end might ask an API for weather data, and the server answers with JSON.",
              "analogy": "The waiter pattern again — front-end orders, API delivers."
            },
            {
              "type": "quiz",
              "question": "An API's job is to…",
              "options": [
                "Style buttons",
                "Connect programs with requests/responses",
                "Delete databases",
                "Play music"
              ],
              "answer": 1,
              "explain": "APIs are messengers between programs.",
              "hint": "Waiter again 🍽️"
            }
          ]
        },
        {
          "id": "t2l3",
          "title": "Express in 5 Minutes",
          "steps": [
            {
              "type": "text",
              "heading": "The tiny king of Node servers",
              "body": "Express makes a server in 3 lines: create it, define routes like `app.get('/hello', ...)`, and listen on a port. Requests in, responses out.",
              "analogy": "Express is a receptionist with name tags that routes visitors."
            },
            {
              "type": "quiz",
              "question": "In Express, a route is defined with…",
              "options": [
                "app.get(...)",
                "<div>",
                "console.style()",
                "SELECT *"
              ],
              "answer": 0,
              "explain": "app.get tells Express what to do when someone visits that path.",
              "hint": "It starts with 'app'."
            },
            {
              "type": "code",
              "heading": "Route brain-teaser",
              "body": "Log the path your route would answer.",
              "starter": "console.log(\"/api/hello\");"
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Write a line that logs the path <b>/api/hello</b>. Show me you remember.",
              "expected": "/api/hello",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(\"/api/hello\");"
            }
          ]
        },
        {
          "id": "t2l4",
          "title": "Databases in 60 Seconds",
          "steps": [
            {
              "type": "text",
              "heading": "Where data lives",
              "body": "A database is a structured warehouse for your app's data. SQL databases store tables (rows & columns); you ask for data with `SELECT`, add with `INSERT`.",
              "analogy": "A database is an Excel file that millions can read safely."
            },
            {
              "type": "quiz",
              "question": "Which SQL word asks for data?",
              "options": [
                "INSERT",
                "SELECT",
                "DELETE",
                "STYLE"
              ],
              "answer": 1,
              "explain": "SELECT = give me this data.",
              "hint": "Like choosing items from a menu."
            }
          ]
        },
        {
          "id": "t2l5",
          "title": "JSON: Data's Favorite Format",
          "steps": [
            {
              "type": "text",
              "heading": "JSON is just object text",
              "body": "<b>JSON</b> (JavaScript Object Notation) is how servers send data. It looks like a JS object: <code>{\"name\": \"Ada\", \"age\": 36}</code>. APIs love it.",
              "analogy": "JSON is a shipping box format every country agrees on."
            },
            {
              "type": "quiz",
              "question": "What does an API usually send back?",
              "options": [
                "Videos only",
                "JSON data",
                "CSS files",
                "Emojis only"
              ],
              "answer": 1,
              "explain": "JSON is the common language for data over HTTP.",
              "hint": "The agreeable shipping format."
            }
          ]
        },
        {
          "id": "t2l6",
          "title": "Environment Variables: Secrets",
          "steps": [
            {
              "type": "text",
              "heading": "Keep secrets out of code",
              "body": "Never hardcode passwords or API keys in your code. Store them in <b>environment variables</b> - like a locked drawer only your server can open.",
              "analogy": "Env vars are a locked drawer; your code is the public room."
            },
            {
              "type": "quiz",
              "question": "Where should API keys live?",
              "options": [
                "Hardcoded in the source",
                "In environment variables",
                "In a comment",
                "In the filename"
              ],
              "answer": 1,
              "explain": "Env vars keep secrets out of the repo.",
              "hint": "Locked drawer."
            }
          ]
        }
      ]
    },
    {
      "id": "track3",
      "icon": "🗄️",
      "title": "Track 3 — Databases & SQL",
      "lessons": [
        {
          "id": "t3l1",
          "title": "Tables, Rows & Columns",
          "steps": [
            {
              "type": "text",
              "heading": "Think spreadsheet",
              "body": "A SQL database stores data in <b>tables</b>. Each table has columns (name, email, age) and rows — one row per person/item. <b>SQL</b> is the language you use to ask it questions.",
              "analogy": "A table is an Excel sheet; SQL is how you talk to it."
            },
            {
              "type": "quiz",
              "question": "In a table, what is a row?",
              "options": [
                "A column name",
                "One item/person",
                "The whole database",
                "An error"
              ],
              "answer": 1,
              "explain": "Columns = fields. Rows = individual records.",
              "hint": "One person = one…"
            },
            {
              "type": "code",
              "heading": "Name the query",
              "body": "Log which SQL word grabs data.",
              "starter": "console.log(\"SELECT\");"
            },
            {
              "type": "text",
              "heading": "Columns have types",
              "body": "Every column has a type: text, number, date. It keeps your data clean and fast to search.",
              "analogy": "Like labeling shelves: books here, toys there."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Log the word \"database\" as if you were naming your table.",
              "expected": "database",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(\"database\");"
            }
          ]
        },
        {
          "id": "t3l2",
          "title": "SELECT, INSERT, DELETE",
          "steps": [
            {
              "type": "text",
              "heading": "The big three",
              "body": "<b>SELECT</b> reads data, <b>INSERT</b> adds a row, <b>DELETE</b> removes one. That's most of day-to-day SQL. Always be careful with DELETE 😄",
              "analogy": "Reading the menu, placing an order, cancelling it."
            },
            {
              "type": "quiz",
              "question": "Which SQL adds a new row?",
              "options": [
                "SELECT",
                "INSERT",
                "DELETE",
                "CREATE TABLE"
              ],
              "answer": 1,
              "explain": "INSERT = add. SELECT = read.",
              "hint": "It inserts something new."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Write a console.log of the word you'd use to read data from a table.",
              "expected": "select",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(\"SELECT\");"
            }
          ]
        },
        {
          "id": "t3l3",
          "title": "WHERE: Filtering Data",
          "steps": [
            {
              "type": "text",
              "heading": "Narrow it down",
              "body": "`WHERE` filters rows: `SELECT * FROM users WHERE age > 18;` — only the rows matching the condition come back.",
              "analogy": "WHERE is the bouncer at the door: it checks IDs."
            },
            {
              "type": "quiz",
              "question": "What does WHERE do?",
              "options": [
                "Sorts the table",
                "Filters rows by a condition",
                "Deletes the table",
                "Adds columns"
              ],
              "answer": 1,
              "explain": "WHERE picks only matching rows.",
              "hint": "Bouncer with a checklist."
            }
          ]
        },
        {
          "id": "t3l4",
          "title": "ORDER BY: Sorting Results",
          "steps": [
            {
              "type": "text",
              "heading": "Make results behave",
              "body": "`ORDER BY` sorts your results: `SELECT * FROM users ORDER BY age DESC;` gives oldest first. Add `LIMIT 5` and you get only five rows — perfect for 'top 5' lists.",
              "analogy": "Like sorting a leaderboard before showing it on screen."
            },
            {
              "type": "quiz",
              "question": "ORDER BY is used to…",
              "options": [
                "Delete rows",
                "Sort rows",
                "Create tables",
                "Encrypt data"
              ],
              "answer": 1,
              "explain": "ORDER BY sorts the rows that come back.",
              "hint": "Leaderboard vibes 🏆"
            }
          ]
        },
        {
          "id": "t3l5",
          "title": "JOIN: Combining Tables",
          "steps": [
            {
              "type": "text",
              "heading": "Match rows across tables",
              "body": "<b>JOIN</b> merges two tables by matching keys: orders know which user made them via <code>user_id</code>. <code>SELECT orders.id, users.name FROM orders JOIN users ON orders.user_id = users.id;</code> — now every order shows its owner's name.",
              "analogy": "Like pairing names on gift tags with the gifts under the tree."
            },
            {
              "type": "quiz",
              "question": "A JOIN lets you…",
              "options": [
                "Delete duplicates",
                "Combine rows from two tables by a key",
                "Encrypt passwords",
                "Sort automatically"
              ],
              "answer": 1,
              "explain": "JOIN links related tables via matching columns.",
              "hint": "Gift tags."
            }
          ]
        }
      ]
    },
    {
      "id": "track4",
      "icon": "🌿",
      "title": "Track 4 — Git & Version Control",
      "lessons": [
        {
          "id": "t4l1",
          "title": "Why Git Exists",
          "steps": [
            {
              "type": "text",
              "heading": "Your code's time machine",
              "body": "Git records every change you make, lets you go back, and lets teams work on the same code without chaos. GitHub is where you host it.",
              "analogy": "Git is a time machine; GitHub is the clubhouse for your code."
            },
            {
              "type": "quiz",
              "question": "What does Git let you do?",
              "options": [
                "Design logos",
                "Track and revert changes",
                "Host videos",
                "Write CSS"
              ],
              "answer": 1,
              "explain": "Git tracks changes like versions of a document.",
              "hint": "Time machine ⏰"
            }
          ]
        },
        {
          "id": "t4l2",
          "title": "The 3-Command Starter",
          "steps": [
            {
              "type": "text",
              "heading": "git add, git commit, git push",
              "body": "<b>git add</b> stages your changes, <b>git commit</b> snapshots them, <b>git push</b> uploads them to GitHub. That loop covers 90% of daily work.",
              "analogy": "Pack your box (add), label it (commit), ship it (push)."
            },
            {
              "type": "quiz",
              "question": "Which command uploads to GitHub?",
              "options": [
                "git add",
                "git commit",
                "git push",
                "git envy"
              ],
              "answer": 2,
              "explain": "Push = upload the shipped box.",
              "hint": "Think shipping."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Log the command that uploads your commits.",
              "expected": "git push",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(\"git push\");"
            }
          ]
        },
        {
          "id": "t4l3",
          "title": "Branches: Safe Experiments",
          "steps": [
            {
              "type": "text",
              "heading": "Try without fear",
              "body": "A <b>branch</b> is a parallel copy of your code. You can break it, experiment wildly, and merge it back only when it works. The main branch stays safe.",
              "analogy": "Like a sketchbook page you can crumple — your real painting stays hidden."
            },
            {
              "type": "quiz",
              "question": "What's the point of a branch?",
              "options": [
                "Deleting code fast",
                "Experimenting safely without touching main code",
                "Hosting files",
                "Styling pages"
              ],
              "answer": 1,
              "explain": "Branches = safe sandboxes for new ideas.",
              "hint": "Sketchbook page."
            }
          ]
        },
        {
          "id": "t4l4",
          "title": "Pull Requests & Code Review",
          "steps": [
            {
              "type": "text",
              "heading": "Teamwork, organized",
              "body": "A <b>pull request (PR)</b> is how you say “hey, review my work before it joins the main code.” Teammates comment, you fix, then merge. It’s a safety gate and a learning moment.",
              "analogy": "A PR is handing in homework and a friend suggests edits before the teacher grades it."
            },
            {
              "type": "quiz",
              "question": "What is a pull request for?",
              "options": [
                "Deleting branches",
                "Getting code reviewed before merging",
                "Uploading files",
                "Running tests"
              ],
              "answer": 1,
              "explain": "PR = review + merge gate.",
              "hint": "Homework review."
            }
          ]
        }
      ]
    },
    {
      "id": "track5",
      "icon": "🏗️",
      "title": "Track 5 — Projects",
      "lessons": [
        {
          "id": "t5l1",
          "title": "Project: Todo List Logic",
          "steps": [
            {
              "type": "text",
              "heading": "Build the brain of a todo app",
              "body": "You won't write HTML yet — you'll build the <b>logic</b>: an array of tasks, a function to add one, a function to list them. That's exactly how apps think.",
              "analogy": "First write the engine, then design the car body."
            },
            {
              "type": "code",
              "heading": "Try the starter",
              "body": "Run this, add your own task, and run it again.",
              "starter": "const tasks = [\"Learn HTML\", \"Practice CSS\"];\nfunction addTask(t) { tasks.push(t); }\naddTask(\"Your first project\");\nconsole.log(tasks);"
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "From memory: create an array called tasks with one item, then log how many tasks there are using tasks.length.",
              "expected": "1",
              "mustInclude": [
                "console.log",
                "tasks"
              ],
              "hint": "console.log(tasks.length);"
            }
          ]
        },
        {
          "id": "t5l2",
          "title": "Project: Mini Calculator",
          "steps": [
            {
              "type": "text",
              "heading": "Four functions, one calculator",
              "body": "A calculator is just 4 tiny functions: add, subtract, multiply, divide. Write them small, test each one. Small pieces = easy debugging.",
              "analogy": "Lego bricks. Each brick works alone; together they become a whole castle."
            },
            {
              "type": "code",
              "heading": "Starter logic",
              "body": "Run it, then change the numbers.",
              "starter": "function add(a, b) { return a + b; }\nfunction multiply(a, b) { return a * b; }\nconsole.log(add(2, 3));\nconsole.log(multiply(4, 5));"
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Write a function called double that returns n * 2, then log double(21).",
              "expected": "42",
              "mustInclude": [
                "function double",
                "console.log"
              ],
              "hint": "function double(n) { return n * 2; } console.log(double(21));"
            }
          ]
        },
        {
          "id": "t5l3",
          "title": "Project: Number Guesser",
          "steps": [
            {
              "type": "text",
              "heading": "A game you can run",
              "body": "Pick a secret number, compare a guess to it, print 'higher' or 'lower'. Loops + conditions + console.log = a whole game.",
              "analogy": "A game is just rules written as code."
            },
            {
              "type": "code",
              "heading": "Starter game",
              "body": "Run it, then change the secret or guess.",
              "starter": "const secret = 7;\nlet guess = 3;\nif (guess < secret) console.log(\"Higher!\");\nelse if (guess > secret) console.log(\"Lower!\");\nelse console.log(\"You got it!\");"
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Write code that logs \"Higher!\" if a guess (3) is below a secret (9).",
              "expected": "higher",
              "mustInclude": [
                "console.log",
                "if"
              ],
              "hint": "if (3 < 9) console.log(\"Higher!\");"
            }
          ]
        },
        {
          "id": "t5l4",
          "title": "Project: Weather Dashboard Logic",
          "steps": [
            {
              "type": "text",
              "heading": "Turn numbers into advice",
              "body": "A dashboard is data + a little logic. Here: a temperature decides the message — cold, comfy, or hot. Same idea every weather app uses.",
              "analogy": "The app is a tiny weatherman giving one-line forecasts."
            },
            {
              "type": "code",
              "heading": "Starter logic",
              "body": "Run it, change temp.",
              "starter": "const temp = 22;\nif (temp < 10) console.log(\"Freezing day!\");\nelse if (temp <= 25) console.log(\"Perfect weather!\");\nelse console.log(\"It’s a scorcher!\");"
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Log \"Perfect weather!\" when a temp (20) is between 10 and 25.",
              "expected": "perfect weather",
              "mustInclude": [
                "console.log",
                "if"
              ],
              "hint": "if (20 >= 10 && 20 <= 25) console.log(\"Perfect weather!\");"
            }
          ]
        }
      ]
    },
    {
      "id": "track6",
      "icon": "💛",
      "title": "Track 6 — JavaScript Foundations",
      "lessons": [
        {
          "id": "t6l1",
          "title": "Variables: Labeled Boxes",
          "steps": [
            {
              "type": "text",
              "heading": "Boxes with names",
              "body": "A <b>variable</b> is a named box that stores a value: <code>let age = 25;</code>. Use <b>const</b> for things that won't change, <b>let</b> for things that will.",
              "analogy": "Variables are labeled lunchboxes. The label is the name, the food inside is the value."
            },
            {
              "type": "quiz",
              "question": "Which keyword should you use when the value won't change?",
              "options": [
                "let",
                "const",
                "var",
                "if"
              ],
              "answer": 1,
              "explain": "const = constant, it can't be reassigned.",
              "hint": "Think 'constant'."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Create a const called name with a string value, then log it.",
              "expected": "a",
              "mustInclude": [
                "const",
                "console.log"
              ],
              "hint": "const name = \"Ada\"; console.log(name);"
            },
            {
              "type": "text",
              "heading": "Reassigning values",
              "body": "With let, you can change the value later. With const, JS stops you — that safety is the point.",
              "analogy": "let = whiteboard, const = carved stone."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Create a const called x with value 5 and log it.",
              "expected": "5",
              "mustInclude": [
                "const",
                "console.log"
              ],
              "hint": "const x = 5; console.log(x);"
            }
          ]
        },
        {
          "id": "t6l2",
          "title": "Functions: Reusable Recipes",
          "steps": [
            {
              "type": "text",
              "heading": "Write once, run many",
              "body": "A <b>function</b> packages steps you can reuse: <code>function greet(name) { console.log('Hi ' + name); }</code>. Call it with different inputs and get different outputs.",
              "analogy": "A recipe. Write it once, cook it a hundred times."
            },
            {
              "type": "quiz",
              "question": "Why use functions?",
              "options": [
                "To make code longer",
                "To reuse logic without rewriting it",
                "To delete variables",
                "To style pages"
              ],
              "answer": 1,
              "explain": "Functions = reusable blocks of logic.",
              "hint": "Recipes, remember?"
            },
            {
              "type": "code",
              "heading": "Call the recipe",
              "body": "Run it, then call greet with your name.",
              "starter": "function greet(name) { console.log('Hi ' + name); }\ngreet('Ada');"
            }
          ]
        },
        {
          "id": "t6l3",
          "title": "Loops: The Robot's Mantra",
          "steps": [
            {
              "type": "text",
              "heading": "Repeat without repeating yourself",
              "body": "A <b>for loop</b> repeats code a set number of times: <code>for (let i = 0; i < 3; i++) { console.log(i); }</code> — prints 0, 1, 2. Computers never get bored.",
              "analogy": "A robot doing jumping jacks: 'again, again, again... stop at 10.'"
            },
            {
              "type": "quiz",
              "question": "How many times does `for (let i = 0; i < 3; i++)` run?",
              "options": [
                "2",
                "3",
                "4",
                "Forever"
              ],
              "answer": 1,
              "explain": "i = 0, 1, 2 → three runs.",
              "hint": "Count from zero."
            }
          ]
        }
      ]
    },
    {
      "id": "track7",
      "icon": "🐍",
      "title": "Track 7 — Python for Beginners",
      "lessons": [
        {
          "id": "t7l1",
          "title": "Why Python?",
          "steps": [
            {
              "type": "text",
              "heading": "The friendly giant",
              "body": "Python reads almost like English and is used for web apps, AI, data, and automation. If JavaScript is the language of the browser, Python is the language of everything else.",
              "analogy": "Python is the friendly giant — huge but gentle."
            },
            {
              "type": "quiz",
              "question": "Which of these is Python famous for?",
              "options": [
                "Styling websites",
                "AI, data, and automation",
                "Image editing",
                "Video streaming"
              ],
              "answer": 1,
              "explain": "Python powers a huge chunk of AI and data work.",
              "hint": "ChatGPT, spreadsheets, scripts..."
            }
          ]
        },
        {
          "id": "t7l2",
          "title": "Print & Variables in Python",
          "steps": [
            {
              "type": "text",
              "heading": "Less punctuation, more thinking",
              "body": "In Python you write: <code>name = \"Ada\"</code> then <code>print(name)</code>. No semicolons, no curly braces — just indentation.",
              "analogy": "It’s like JavaScript without the traffic cones."
            },
            {
              "type": "quiz",
              "question": "What prints text in Python?",
              "options": [
                "console.log",
                "print()",
                "echo",
                "say()"
              ],
              "answer": 1,
              "explain": "Python uses print() where JS uses console.log.",
              "hint": "Just the word."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "In JS, simulate Python: log the word 'Hello from Python'.",
              "expected": "hello from python",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(\"Hello from Python\");"
            }
          ]
        }
      ]
    },
    {
      "id": "track8",
      "icon": "🛠️",
      "title": "Track 8 — Tools of the Trade",
      "lessons": [
        {
          "id": "t8l1",
          "title": "VS Code: Your Workshop",
          "steps": [
            {
              "type": "text",
              "heading": "The editor pros use",
              "body": "<b>VS Code</b> is a free code editor with autocomplete, file explorer, terminal, and extensions. Learn the shortcuts: Ctrl+S saves, Ctrl+Z undoes, and the terminal runs your code.",
              "analogy": "VS Code is your workbench; extensions are your power tools."
            },
            {
              "type": "quiz",
              "question": "What does Ctrl+S do?",
              "options": [
                "Closes everything",
                "Saves the file",
                "Searches Google",
                "Shuts down the PC"
              ],
              "answer": 1,
              "explain": "Save early, save often.",
              "hint": "The most important shortcut."
            }
          ]
        },
        {
          "id": "t8l2",
          "title": "DevTools: X-Ray Vision",
          "steps": [
            {
              "type": "text",
              "heading": "Inspect any website",
              "body": "Right-click any page → <b>Inspect</b>. You can see its HTML, change CSS live, and open the <b>Console</b> to run JavaScript. Every pro uses this daily.",
              "analogy": "DevTools are X-ray goggles for websites."
            },
            {
              "type": "quiz",
              "question": "Where do you type JavaScript live in the browser?",
              "options": [
                "The Console tab",
                "The Elements tab",
                "The Network tab",
                "Settings"
              ],
              "answer": 0,
              "explain": "Console = live JS playground inside any page.",
              "hint": "It's where logs appear too."
            }
          ]
        }
      ]
    },
    {
      "id": "track9",
      "icon": "🎨",
      "title": "Track 9 — CSS Deep Dive",
      "lessons": [
        {
          "id": "t9l1",
          "title": "Flexbox in 5 Minutes",
          "steps": [
            {
              "type": "text",
              "heading": "Layout made easy",
              "body": "<b>Flexbox</b> lays out items in a row or column and centers them without hacks: <code>display: flex; justify-content: center; align-items: center;</code> — instant centered layout.",
              "analogy": "Flexbox is a shelf that nudges its items into perfect alignment for you."
            },
            {
              "type": "quiz",
              "question": "Which property turns on Flexbox?",
              "options": [
                "display: grid",
                "display: flex",
                "position: center",
                "float: both"
              ],
              "answer": 1,
              "explain": "display: flex activates flex layout.",
              "hint": "It's in the name."
            }
          ]
        },
        {
          "id": "t9l2",
          "title": "Make It Responsive",
          "steps": [
            {
              "type": "text",
              "heading": "Phones too",
              "body": "Responsive CSS makes your site look good on any screen. Use relative units (<code>%</code>, <code>rem</code>) instead of fixed pixels, and a <b>media query</b> like <code>@media (max-width: 600px)</code> for small screens.",
              "analogy": "Responsive design is clothes that fit whether you're tall or short."
            },
            {
              "type": "quiz",
              "question": "What does a media query do?",
              "options": [
                "Adds music",
                "Changes styles based on screen size",
                "Deletes CSS",
                "Hosts images"
              ],
              "answer": 1,
              "explain": "@media rules adapt layout to the device.",
              "hint": "Phone vs desktop."
            }
          ]
        },
        {
          "id": "t9l3",
          "title": "CSS Variables: Write Once, Use Everywhere",
          "steps": [
            {
              "type": "text",
              "heading": "Your theme in one place",
              "body": "<b>CSS variables</b> (custom properties) let you define a value once and reuse it: <code>:root { --main: #34d399; }</code> then <code>color: var(--main);</code>. Change one line, restyle the whole site.",
              "analogy": "Like a master light switch for your whole color palette."
            },
            {
              "type": "quiz",
              "question": "What problem do CSS variables solve?",
              "options": [
                "They center divs",
                "They let you reuse/change values site-wide easily",
                "They add animations",
                "They host fonts"
              ],
              "answer": 1,
              "explain": "One change, site-wide effect.",
              "hint": "Master switch."
            }
          ]
        }
      ]
    },
    {
      "id": "track10",
      "icon": "🛡️",
      "title": "Track 10 — Web Safety",
      "lessons": [
        {
          "id": "t10l1",
          "title": "Passwords & HTTPS",
          "steps": [
            {
              "type": "text",
              "heading": "Locks and sealed letters",
              "body": "<b>HTTPS</b> encrypts what passes between you and a site — like a sealed, unbreakable letter. Always use unique, long passwords, and a password manager so you don't reuse them.",
              "analogy": "HTTPS is a sealed envelope; a password manager is your key cabinet."
            },
            {
              "type": "quiz",
              "question": "What does HTTPS do?",
              "options": [
                "Makes sites colorful",
                "Encrypts data between you and the site",
                "Speeds up Wi-Fi",
                "Deletes cookies"
              ],
              "answer": 1,
              "explain": "The S = Secure, via encryption.",
              "hint": "Sealed envelope."
            }
          ]
        },
        {
          "id": "t10l2",
          "title": "Don't Trust Raw Input",
          "steps": [
            {
              "type": "text",
              "heading": "Users are unpredictable (on purpose)",
              "body": "Never build SQL or HTML directly from what a user typed — they might type something dangerous. Use parameterized queries and escape output. Rule one: <b>trust no input</b>.",
              "analogy": "Like a bouncer checking IDs at the door — every 'ID' gets checked, even lookalikes."
            },
            {
              "type": "quiz",
              "question": "Why shouldn't you trust user input?",
              "options": [
                "Users hate typing",
                "It can be malicious or broken — always validate",
                "It's slow",
                "It costs money"
              ],
              "answer": 1,
              "explain": "Validation stops bugs and attacks.",
              "hint": "Bouncer energy."
            }
          ]
        }
      ]
    },
    {
      "id": "track11",
      "icon": "🚀",
      "title": "Track 11 — Career Path",
      "lessons": [
        {
          "id": "t11l1",
          "title": "From Learner to Builder",
          "steps": [
            {
              "type": "text",
              "heading": "Skills → portfolio → first job",
              "body": "1) Finish the tracks. 2) Build 3 small projects (you can host them on GitHub Pages). 3) Write what you built on a short portfolio page. 4) Apply, keep learning, iterate. That ladder has worked for millions.",
              "analogy": "A portfolio is your highlight reel — show what you can make, not just what you know."
            },
            {
              "type": "quiz",
              "question": "Best way to prove to employers you can code?",
              "options": [
                "Memorize syntax",
                "Show real projects you built",
                "Collect certificates only",
                "Watch videos"
              ],
              "answer": 1,
              "explain": "Projects > promises.",
              "hint": "Highlight reel."
            }
          ]
        },
        {
          "id": "t11l2",
          "title": "How to Keep Learning",
          "steps": [
            {
              "type": "text",
              "heading": "Consistency beats intensity",
              "body": "20 minutes a day beats 5 hours once a week — that's spaced practice. Build something you actually want to use, get feedback, and don't fear the bugs. Every senior dev was once confused by a semicolon.",
              "analogy": "Learning to code is like the gym: small reps daily, not one giant session."
            },
            {
              "type": "quiz",
              "question": "Most effective study habit?",
              "options": [
                "One 8-hour weekend session",
                "Short, regular sessions",
                "Only watching videos",
                "Memorizing docs"
              ],
              "answer": 1,
              "explain": "Spaced, short sessions win.",
              "hint": "Gym logic."
            }
          ]
        },
        {
          "id": "t11l3",
          "title": "How to Learn Anything",
          "steps": [
            {
              "type": "text",
              "heading": "The recipe: recall, spacing, projects",
              "body": "A proven loop: <b>read a small chunk</b>, <b>recall it from memory</b>, <b>review it later</b>, <b>build something small</b>. Repeat daily. This works for code, music, languages — anything.",
              "analogy": "Like cooking: study the recipe, cook it, eat it, cook it again days later."
            },
            {
              "type": "quiz",
              "question": "What does the winning loop include?",
              "options": [
                "Just watching videos",
                "Recall + spacing + building small things",
                "Reading the same page forever",
                "Only memorizing terms"
              ],
              "answer": 1,
              "explain": "Recall, space, and build — that's the recipe.",
              "hint": "Read, recall, review, build."
            }
          ]
        }
      ]
    },
    {
      "id": "track12",
      "icon": "⚛️",
      "title": "Track 12 — Intro to React",
      "lessons": [
        {
          "id": "t12l1",
          "title": "Components: LEGO for UIs",
          "steps": [
            {
              "type": "text",
              "heading": "Small pieces, big pages",
              "body": "<b>React</b> splits your page into <b>components</b> — reusable pieces like buttons, cards, and navbars. Each is just a function that returns UI. Compose them like LEGO.",
              "analogy": "A LEGO set: small bricks, snap together into a spaceship."
            },
            {
              "type": "quiz",
              "question": "What is a component?",
              "options": [
                "A database",
                "A reusable piece of UI",
                "A type of server",
                "A CSS color"
              ],
              "answer": 1,
              "explain": "Components = reusable UI blocks.",
              "hint": "LEGO brick."
            }
          ]
        },
        {
          "id": "t12l2",
          "title": "State: A Component's Memory",
          "steps": [
            {
              "type": "text",
              "heading": "What the page remembers",
              "body": "<b>State</b> is data a component remembers and updates — like a click counter. When state changes, React re-renders that part of the page automatically.",
              "analogy": "State is a whiteboard the component keeps for itself."
            },
            {
              "type": "quiz",
              "question": "What happens when state changes?",
              "options": [
                "The page reloads",
                "React re-renders that part",
                "Nothing",
                "The server restarts"
              ],
              "answer": 1,
              "explain": "State change → UI updates.",
              "hint": "Whiteboard edit → display updates."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Log the number 0 — think of it as a click counter's starting state.",
              "expected": "0",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(0);"
            }
          ]
        },
        {
          "id": "t12l3",
          "title": "Props: Passing Data Down",
          "steps": [
            {
              "type": "text",
              "heading": "From parent to child",
              "body": "<b>Props</b> are how a parent component passes data to a child: <code>&lt;Card title=\"Hi\" /&gt;</code>. They flow one way — down.",
              "analogy": "Props are a gift from parent to child — opened, not returned."
            },
            {
              "type": "quiz",
              "question": "Which way do props flow?",
              "options": [
                "Child to parent",
                "Parent to child",
                "Sideways",
                "To the server"
              ],
              "answer": 1,
              "explain": "Props flow down the tree.",
              "hint": "Gifts from parent."
            }
          ]
        }
      ]
    },
    {
      "id": "track13",
      "icon": "🎨",
      "title": "Track 13 — Design Basics (Canva & More)",
      "lessons": [
        {
          "id": "t13l1",
          "title": "Meet Canva",
          "steps": [
            {
              "type": "text",
              "heading": "Design for everyone",
              "body": "<b>Canva</b> is a free tool where you drag, drop, and edit templates to make posters, logos, posts, and slides. You don't need to be a designer — you just follow good defaults.",
              "analogy": "Canva is like a pre-built recipe kit: the parts are measured, you just assemble and serve."
            },
            {
              "type": "quiz",
              "question": "What is Canva primarily for?",
              "options": [
                "Writing code",
                "Designing graphics quickly with templates",
                "Editing videos only",
                "Database management"
              ],
              "answer": 1,
              "explain": "Canva makes visual design fast and accessible.",
              "hint": "Think posters and posts."
            }
          ]
        },
        {
          "id": "t13l2",
          "title": "The 3 Rules That Make Anything Look Good",
          "steps": [
            {
              "type": "text",
              "heading": "Color, type, space",
              "body": "1) Pick one main color and a neutral. 2) Use one big headline font + one readable body font. 3) Give everything room to breathe — empty space is not wasted, it's style.",
              "analogy": "A good design page is like a park bench: one focus, clear paths, no crowds."
            },
            {
              "type": "quiz",
              "question": "The most important rule in that trio?",
              "options": [
                "Use as many colors as possible",
                "One main color + neutrals",
                "Use tiny fonts",
                "Fill every pixel"
              ],
              "answer": 1,
              "explain": "Restraint = professionalism.",
              "hint": "Less is more."
            },
            {
              "type": "text",
              "heading": "Space is style",
              "body": "Empty space around text and images makes designs feel calm and premium. Cramped = amateur. Generous = pro.",
              "analogy": "A crowded room feels loud; an empty gallery feels classy."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Log a one-word design tip: \"whitespace\".",
              "expected": "whitespace",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(\"whitespace\");"
            }
          ]
        },
        {
          "id": "t13l3",
          "title": "Practice Task",
          "steps": [
            {
              "type": "text",
              "heading": "Make one poster",
              "body": "Open Canva, pick one template, change the headline to 'NVR Coding', and swap the main color. Two tweaks, one clean poster. Screenshot it — that's your first proof-of-work.",
              "analogy": "Small edits on a good template beat blank-page panic."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Log the headline you'd put on that poster.",
              "expected": "",
              "mustInclude": [
                "console.log"
              ],
              "hint": "console.log(\"NVR Coding\");"
            }
          ]
        },
        {
          "id": "t13l4",
          "title": "Branding Basics",
          "steps": [
            {
              "type": "text",
              "heading": "Look and feel consistency",
              "body": "A brand is a promise told visually: same logo, same colors, same tone everywhere. Pick 2–3 colors, 1–2 fonts, a logo, and stick to them across your site, posts, and slides.",
              "analogy": "Branding is a costume — once you pick it, everyone recognizes you in the crowd."
            },
            {
              "type": "quiz",
              "question": "What makes branding effective?",
              "options": [
                "Changing your look every post",
                "Consistent colors, fonts, and tone",
                "Using every color",
                "Hiding your logo"
              ],
              "answer": 1,
              "explain": "Consistency builds recognition.",
              "hint": "Same costume."
            }
          ]
        },
        {
          "id": "t13l5",
          "title": "Intro to UX/UI",
          "steps": [
            {
              "type": "text",
              "heading": "Design for humans",
              "body": "<b>UX</b> (user experience) is how it feels to use something; <b>UI</b> (user interface) is how it looks. Good UX = clear, fast, frustration-free. Good UI = pretty and organized. Both need each other.",
              "analogy": "UX is the door handle that works; UI is the pretty paint on it."
            },
            {
              "type": "quiz",
              "question": "UX is mainly about…",
              "options": [
                "Colors",
                "How easy it is to use",
                "Logos",
                "Fonts"
              ],
              "answer": 1,
              "explain": "UX = usability and feel.",
              "hint": "Door handle that works."
            }
          ]
        },
        {
          "id": "t13l6",
          "title": "Meet Figma",
          "steps": [
            {
              "type": "text",
              "heading": "Design in the browser together",
              "body": "<b>Figma</b> is like Canva's older sibling for UI/UX: you design app screens, websites, and prototypes, and your team can comment and edit in real time, all in the browser.",
              "analogy": "Figma is a shared whiteboard for app screens — everyone can scribble at once."
            },
            {
              "type": "quiz",
              "question": "What is Figma mainly used for?",
              "options": [
                "Writing CSS",
                "Designing UI/UX screens and prototypes",
                "Databases",
                "Email hosting"
              ],
              "answer": 1,
              "explain": "Figma = collaborative UI design.",
              "hint": "Shared whiteboard for apps."
            }
          ]
        }
      ]
    },
    {
      "id": "track14",
      "icon": "🤖",
      "title": "Track 14 — AI Basics",
      "lessons": [
        {
          "id": "t14l1",
          "title": "What AI Actually Is",
          "steps": [
            {
              "type": "text",
              "heading": "Patterns, not magic",
              "body": "<b>AI</b> (artificial intelligence) is software that learns patterns from lots of examples and uses them to make guesses — like predicting the next word in a sentence. It doesn't think or understand; it predicts.",
              "analogy": "AI is a parrot that has seen so many conversations it sounds like it understands."
            },
            {
              "type": "quiz",
              "question": "What does AI primarily do?",
              "options": [
                "Read minds",
                "Find and use patterns from examples",
                "Build hardware",
                "Replace electricity"
              ],
              "answer": 1,
              "explain": "AI = pattern finder and predictor.",
              "hint": "Parrot with great memory."
            }
          ]
        },
        {
          "id": "t14l2",
          "title": "Prompts: Talking to AI",
          "steps": [
            {
              "type": "text",
              "heading": "Ask clearly, get better answers",
              "body": "A <b>prompt</b> is what you type to an AI. Good prompts give context ('You are a JS tutor…') and a clear request ('Explain loops like I'm 10'). Small prompt changes = big answer changes.",
              "analogy": "A prompt is a recipe instruction — vague instructions, lumpy cake."
            },
            {
              "type": "quiz",
              "question": "What makes a good prompt?",
              "options": [
                "One vague word",
                "Context + a clear request",
                "As long as possible",
                "No punctuation"
              ],
              "answer": 1,
              "explain": "Context and clarity win.",
              "hint": "Clear recipe instructions."
            }
          ]
        }
      ]
    },
    {
      "id": "track15",
      "icon": "🧮",
      "title": "Track 15 — Data Structures",
      "lessons": [
        {
          "id": "t15l1",
          "title": "Arrays: Ordered Lists",
          "steps": [
            {
              "type": "text",
              "heading": "Collections in a line",
              "body": "An <b>array</b> is an ordered list of items: <code>[\"apple\", \"banana\", \"cherry\"]</code>. You can loop over it, count it (<code>.length</code>), and add/remove items.",
              "analogy": "An array is a shopping list written top to bottom."
            },
            {
              "type": "quiz",
              "question": "Which property tells you how many items are in an array?",
              "options": [
                ".count",
                ".length",
                ".size()",
                ".total"
              ],
              "answer": 1,
              "explain": "arrays use .length in JS.",
              "hint": "It's a word, not a method."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Create an array called fruits with one item and log its length.",
              "expected": "1",
              "mustInclude": [
                "console.log",
                "fruits"
              ],
              "hint": "const fruits = [\"apple\"]; console.log(fruits.length);"
            },
            {
              "type": "text",
              "heading": "Arrays are zero-indexed",
              "body": "The first item is at position 0, not 1. So fruits[0] is \"apple\". Forgetting this is the #1 beginner bug.",
              "analogy": "Like floors in Europe — ground floor is called 0."
            },
            {
              "type": "write",
              "heading": "Your turn ✍️",
              "body": "Log the length of a two-item array.",
              "expected": "2",
              "mustInclude": [
                "console.log"
              ],
              "hint": "const a = [1,2]; console.log(a.length);"
            }
          ]
        },
        {
          "id": "t15l2",
          "title": "Objects: Labeled Bundles",
          "steps": [
            {
              "type": "text",
              "heading": "Key-value pairs",
              "body": "An <b>object</b> bundles related data with labels: <code>{ name: \"Ada\", age: 36 }</code>. Unlike arrays, you access items by name (<code>user.name</code>) not by position.",
              "analogy": "An object is a character sheet in a game — name, level, HP all labeled."
            },
            {
              "type": "quiz",
              "question": "How do you get an object's property?",
              "options": [
                "object[0]",
                "object.propertyName",
                "object->propertyName",
                "object(item)"
              ],
              "answer": 1,
              "explain": "Dot notation reads labeled properties.",
              "hint": "Dot brings it home."
            }
          ]
        }
      ]
    },
    {
      "id": "track16",
      "icon": "☁️",
      "title": "Track 16 — Cloud Basics",
      "lessons": [
        {
          "id": "t16l1",
          "title": "What the Cloud Is",
          "steps": [
            {
              "type": "text",
              "heading": "Someone else's computer",
              "body": "The <b>cloud</b> is just someone else's computer running your app, 24/7, somewhere with a big power bill. Instead of buying a server, you rent space on AWS, Google Cloud, or Azure.",
              "analogy": "Cloud hosting is like a hotel room — you don't build the hotel, you just rent a room."
            },
            {
              "type": "quiz",
              "question": "Why use the cloud?",
              "options": [
                "To save money on power bills at home",
                "No need to buy/maintain your own servers",
                "It makes code run faster always",
                "It's free forever"
              ],
              "answer": 1,
              "explain": "Renting beats owning for most people.",
              "hint": "Hotel vs building your own hotel."
            }
          ]
        },
        {
          "id": "t16l2",
          "title": "CDNs: Copies Everywhere",
          "steps": [
            {
              "type": "text",
              "heading": "Cache close to users",
              "body": "A <b>CDN</b> (Content Delivery Network) stores copies of your site's files on servers around the world, so users load from the nearest copy — fast anywhere.",
              "analogy": "A CDN is a chain of franchise restaurants — your food (site) is always nearby."
            },
            {
              "type": "quiz",
              "question": "What does a CDN mainly do?",
              "options": [
                "Blocks users",
                "Serves content from servers near the user for speed",
                "Writes your HTML",
                "Deletes old files"
              ],
              "answer": 1,
              "explain": "Closer copy = faster load.",
              "hint": "Franchise locations."
            }
          ]
        }
      ]
    },
    {
      "id": "track17",
      "icon": "⚛️",
      "title": "Track 17 — Quantum Computing Basics",
      "lessons": [
        {
          "id": "t17l1",
          "title": "Bits vs Qubits",
          "steps": [
            {
              "type": "text",
              "heading": "A different kind of math",
              "body": "Normal computers think in <b>bits</b> (0 or 1). Quantum computers use <b>qubits</b>, which can be 0, 1, or both at once (superposition). That lets them explore many possibilities in parallel — great for certain hard problems.",
              "analogy": "A bit is a light switch. A qubit is a dimmer that’s on and off at the same time until you look."
            },
            {
              "type": "quiz",
              "question": "What’s special about a qubit?",
              "options": [
                "It’s always 0",
                "It can be 0, 1, or both at once",
                "It runs twice as fast",
                "It only stores 1s"
              ],
              "answer": 1,
              "explain": "Superposition lets qubits hold both states until measured.",
              "hint": "Dimmer switch trick."
            }
          ]
        },
        {
          "id": "t17l2",
          "title": "Why It Matters",
          "steps": [
            {
              "type": "text",
              "heading": "Jobs for the quantum age",
              "body": "Quantum computers could crack drug discovery, cryptography, and logistics optimization. Even if you never program one, knowing the basics makes you a smarter builder of the future.",
              "analogy": "Like knowing how a rocket engine works, even if you drive a car."
            },
            {
              "type": "quiz",
              "question": "Which field is a natural fit for quantum computing?",
              "options": [
                "Simple websites",
                "Drug discovery and optimization",
                "CSS styling",
                "Image compression only"
              ],
              "answer": 1,
              "explain": "Quantum shines where lots of possibilities must be explored.",
              "hint": "Hard puzzles love it."
            }
          ]
        }
      ]
    },
    {
      "id": "track18",
      "icon": "🧊",
      "title": "Track 18 — 3D on the Web (Three.js)",
      "lessons": [
        {
          "id": "t18l1",
          "title": "The Browser as a Stage",
          "steps": [
            {
              "type": "text",
              "heading": "Scene, camera, renderer",
              "body": "<b>Three.js</b> is a JS library that turns your browser into a 3D stage. You define a <b>scene</b> (what’s in it), a <b>camera</b> (where you look from), and a <b>renderer</b> (the screen that draws it).",
              "analogy": "Scene = the theater set, camera = your seat, renderer = the projector."
            },
            {
              "type": "quiz",
              "question": "What does the renderer do?",
              "options": [
                "Makes coffee",
                "Draws the 3D scene to the screen",
                "Stores music",
                "Manages users"
              ],
              "answer": 1,
              "explain": "Renderer paints the 3D world on your screen.",
              "hint": "Projector."
            }
          ]
        },
        {
          "id": "t18l2",
          "title": "Your First 3D Object",
          "steps": [
            {
              "type": "text",
              "heading": "A spinning cube",
              "body": "You create a shape (like a cube), give it a material (color/texture), add a light, and spin it over time. That’s a web 3D starter — the rest is just more shapes and lights.",
              "analogy": "Building a 3D world is like a stop-motion film: one frame at a time."
            },
            {
              "type": "quiz",
              "question": "What do you add so you can see an object?",
              "options": [
                "A light",
                "A CSS class",
                "A database",
                "A cookie"
              ],
              "answer": 0,
              "explain": "No light, no visible shape.",
              "hint": "Stage needs lighting."
            }
          ]
        }
      ]
    },
    {
      "id": "track19",
      "icon": "🌿",
      "title": "Track 19 — Git Internals",
      "lessons": [
        {
          "id": "t19l1",
          "title": "Commits Are Snapshots",
          "steps": [
            {
              "type": "text",
              "heading": "Not just diffs",
              "body": "A <b>commit</b> is like a save point in a video game — it records a full snapshot of your project at that moment, linked to the previous one with a unique ID (hash).",
              "analogy": "Commits are save slots; you can load any of them."
            },
            {
              "type": "quiz",
              "question": "What is a commit really?",
              "options": [
                "A small text diff only",
                "A snapshot of the project at a point in time",
                "A background process",
                "A bug report"
              ],
              "answer": 1,
              "explain": "Every commit = full project snapshot.",
              "hint": "Save slot."
            }
          ]
        },
        {
          "id": "t19l2",
          "title": "Branches Are Just Pointers",
          "steps": [
            {
              "type": "text",
              "heading": "Cheap and fast",
              "body": "A <b>branch</b> is just a movable name that points to a commit. Creating one costs almost nothing, and when you commit, the pointer moves forward — that’s why branches are so fast.",
              "analogy": "A branch is a sticky note on a commit saying 'this is where we are on this feature.'"
            },
            {
              "type": "quiz",
              "question": "Why are branches cheap in Git?",
              "options": [
                "They copy the whole project",
                "They’re just pointers to commits",
                "They delete old files",
                "They compress everything"
              ],
              "answer": 1,
              "explain": "A branch = a lightweight label on a commit.",
              "hint": "Sticky note, not a photocopy."
            }
          ]
        }
      ]
    },
    {
      "id": "track20",
      "icon": "🎞️",
      "title": "Track 20 — CSS Animations",
      "lessons": [
        {
          "id": "t20l1",
          "title": "Transitions vs Animations",
          "steps": [
            {
              "type": "text",
              "heading": "Motion with purpose",
              "body": "CSS <b>transitions</b> animate a change (hover: color 0.3s). <b>Animations</b> run on their own timeline with keyframes (@keyframes). Hus, keep it subtle — motion should guide, not distract.",
              "analogy": "Transition = walking; animation = dancing. Both move, different vibes."
            },
            {
              "type": "quiz",
              "question": "Which runs continuously by itself?",
              "options": [
                "transition",
                "animation",
                "hover",
                "display"
              ],
              "answer": 1,
              "explain": "Animations loop or play solo; transitions need a trigger.",
              "hint": "Walking vs dancing."
            }
          ]
        }
      ]
    },
    {
      "id": "track21",
      "icon": "🔌",
      "title": "Track 21 — APIs in Practice",
      "lessons": [
        {
          "id": "t21l1",
          "title": "Calling Real APIs",
          "steps": [
            {
              "type": "text",
              "heading": "From JSON to jokes",
              "body": "Free APIs like JokeAPI or CatFacts give you JSON. Use fetch to grab it, pick the field you need, and show it on your page. That's a real app feature.",
              "analogy": "An API call is like ordering from a menu — you ask, they send back a plate."
            },
            {
              "type": "code",
              "heading": "Try the pattern",
              "body": "Run to see the flow (network may not work offline).",
              "starter": "fetch(\"https://api.example.com/data\")\n  .then(r => r.json())\n  .then(d => console.log(d));"
            },
            {
              "type": "quiz",
              "question": "What do APIs usually return?",
              "options": [
                "HTML pages only",
                "JSON data",
                "ZIP files only",
                "Videos"
              ],
              "answer": 1,
              "explain": "JSON is the lingua franca of APIs.",
              "hint": "Shipping boxes of data."
            }
          ]
        }
      ]
    }
  ]
};
