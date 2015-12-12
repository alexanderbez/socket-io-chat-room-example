# Chat Room with Socket.io

A sample chatroom using [socket.io](http://socket.io) and Nodes.js/Express based of the tutorial found [here](http://socket.io/get-started/chat/).

## Usage

Install dependencies:

```shell
$ npm install
```

Run server locally:

```shell
$ npm start
```

Access the client(s) via visiting: `http://localhost:3000`

App structure:

```
.
├── api                   # API files
|   ├── router            # API router files
|   |   ├── home.js       # API routes
|   |   ├── index.js      # Router exports (mounts routes)
│   ├── socket            # API socket files
|   |   ├── index.js      # Server Socket.io implementation
│   └── index.js          # API exports
├── assets                # Client side files
|   ├── js                # Client javascript files
|   |   ├── chatroom.js   # Client Socket.io implementation
├── index.html            # Main view
└── server.js             # Express entry point file
```
__Note__: Runs on Node.js v4.2.2+