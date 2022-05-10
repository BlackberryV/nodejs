const fs = require('fs')
const http = require('http')

http.createServer((req, res) => {

    //read files
    fs.readFile('files/index.html', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
}).listen(8080)

//CREATE FILES

//append: appends content to a file, if the file does not exist, the file will be created
fs.appendFile('files/append.txt', 'appended content \n', (err) => {
    if (err) throw err
    console.log('Saved append!')
})

//open() method takes a "flag" as the second argument,
// if the flag is "w" for "writing", the specified file is opened for writing.
// If the file does not exist, an empty file is created
fs.open('files/openWrite.txt', 'w', (err, file) => {
    if (err) throw err
    console.log('Saved open!')
})

//writeFile() method replaces the specified file and content if it exists.
// If the file does not exist, a new file, containing the specified content, will be created
fs.writeFile('files/writeFile.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved write file!');
});

//UPDATE FILES

//appendFile() method appends the specified content at the end of the specified file
fs.appendFile('files/append.txt', ' This is my text.', function (err) {
    if (err) throw err;
    console.log('Updated append!');
});

//writeFile() method replaces the specified file and content
fs.writeFile('files/writeFile.txt', 'This is my text', function (err) {
    if (err) throw err;
    console.log('Replaced writeFile!');
});

//DELETE FILE

//unlink() method deletes the specified file
fs.unlink('files/openWrite.txt', function (err) {
    if (err) throw err;
    console.log('File deleted!');
});

//RENAME FILE

//rename() method renames the specified file
fs.rename('files/append.txt', 'files/appendToFile.txt', function (err) {
    if (err) throw err;
    console.log('File Renamed!');
});