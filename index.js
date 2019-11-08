const http2 = require('http2');
const fs = require('fs');
const process = require('process');
 process.on('beforeExit', (code) => {
  console.log('进程 beforeExit 事件的代码: ', code);
});

process.on('exit', (code) => {
  console.log('进程 exit 事件的代码: ', code);
});

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
console.log('此消息最新显示');

fs.rename('showFiles','shows',(err)=>{
  if(err) throw err;
  console.log('重命名完成')
})

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
});
server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {

  stream.respond({
    'content-type': 'text/html',
    'content-type':'text/js',
    'content-type':'text/css',
    ':status': 200
  });
  stream.end('<h1>Hello World</h1>');
});


server.listen(8443);