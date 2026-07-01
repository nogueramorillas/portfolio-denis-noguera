const http = require("http");
const handler = require("serve-handler");

const port = process.env.PORT || 3000;

http
  .createServer((request, response) => handler(request, response))
  .listen(port, () => {
    console.log(`Serving portfolio-denis-noguera on port ${port}`);
  });
