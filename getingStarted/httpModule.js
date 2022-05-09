const http = require('http')
const url = require('url')
const myFirstModule = require('./myFirstModule')

http.createServer((req, res) => {
    //header for adding type of content
    res.writeHead(200, {'Content-Type': 'text/html'});

    //my modules use
    // res.write(`Date now ${myFirstModule.myDateTime()}`)

    //url property
    // res.write('Url ' + req.url)

    //query string
    const q = url.parse(req.url, true).query
    const txt = q.year
    res.end(txt)
}).listen(8080);