var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var root = __dirname+'/public'

var server = http.createServer((req,res)=>{
  switch(req.method)
  {
    /*
    {GET,/} 获得主页面 index.html
    {GET,/todo} ajax获得Todo的JSON数据
    */ 
    case 'GET':
      var requestUrl = url.parse(req.url);
      if(requestUrl.path=='/todo'){
        getTodoList(res);
      }else{
        getStaticFile(req,res);
      }
      break;
    default:
      res.statusCode=400;
      res.end('Bad Requst');
  };
})

function getStaticFile(req,res) {
   //解析请求
   console.log('User: '+req.connection.remoteAddress+' connect.')
   var requestUrl = url.parse(req.url);
   if(requestUrl.pathname==='/'){
     requestUrl.pathname='/index.html'
   }
   var requestPath = path.join(root,requestUrl.pathname);

   //检查文件是否存在
   console.log('request file:'+requestPath);
   fs.stat(requestPath,(err,stat)=>{
     if(err){
       res.statusCode=404;
       res.end('Page Not Found');
     }else{
       //响应
      var readStream = fs.createReadStream(requestPath);
      readStream.pipe(res);
     }
   });
}

//获得数据
function getTodoList(res) {
  fs.readFile(__dirname+'/data/data.json',(err,data)=>{
    if(err){
      res.statusCode=500;
      res.end('Internal Error');
    }else{
      res.end(data);
    }
  });
}

server.listen(3000);