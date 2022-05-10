const url = require('url')

const adr = 'http://localhost:8080/default.htm?year=2017&month=february';
const q = url.parse(adr, true)

console.log(q.host)
console.log(q.pathname)
console.log(q.search)

const qdata = q.query

console.log(qdata.month)