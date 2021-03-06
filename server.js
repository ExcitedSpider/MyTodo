var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
var root = __dirname+'/public'

var server = http.createServer((req,res)=>{

  var requestUrl = url.parse(req.url);

  switch(req.method)
  {
    /*
    {GET,/} 获得主页面 index.html
    {GET,/todo} ajax获得Todo的JSON数据
    */ 
    case 'GET': 
      if(requestUrl.path==='/todo'){
        getTodoList(res);
      }else{
        getStaticFile(req,res);
      }
      break;
    /*
     * {POST,/new_todo} 添加待办事项 
     */
    case 'POST':
      if(requestUrl.path==='/new_todo'){
        newTodoItem(req,res);
      }else{
        res.statusCode=400;
        res.end('Bad Requst');
      }
      break;
      /*
       * {DELETE,/delete_todo }删除待办事项 
       */
    case 'DELETE':
      if(requestUrl.path==='/delete_todo'){
        deleteTodoItem(req,res);
      }else{
        res.statusCode=400;
        res.end('Bad Requst');
      }
      break;
    default:
      res.statusCode=400;
      res.end('Bad Requst');
  };
})
function deleteTodoItem(req,res) {
  var body = '';
  req.on('data',(chunk)=>{
    console.log(chunk);
    body+=chunk;
  })
  req.on('end',()=>{
    var reqData = JSON.parse(body);
    var data = fs.readFileSync(__dirname+'/data/data.json')
    var todo = JSON.parse(data);
    todo.todos.splice(reqData.index,1);
    fs.writeFile(__dirname+'/data/data.json',JSON.stringify(todo),(err)=>{
      if(err){
        res.statusCode = 500;
        res.end('Internal Error');
      }else{
        res.end(JSON.stringify({status:'OK'}));
      }
    });
  })
}

function newTodoItem(req,res) {
  var body='';
  req.setEncoding('utf8');
  req.on('data',(chunk)=>{
    body+=chunk;
  })
  req.on('end',()=>{
    var reqData = JSON.parse(body);
    var data = fs.readFileSync(__dirname+'/data/data.json')
    var todo = JSON.parse(data);
    todo.todos.push(reqData);
    fs.writeFile(__dirname+'/data/data.json',JSON.stringify(todo),(err)=>{
      if(err){
        res.statusCode = 500;
        res.end('Internal Error');
      }else{
        res.end(JSON.stringify({status:'OK'}));
      }
    });
  })
}

function getStaticFile(req,res) {
   //解析请求
   var requestUrl = url.parse(req.url);
   if(requestUrl.pathname==='/'){
     requestUrl.pathname='/index.html'
   }
   var requestPath = path.join(root,requestUrl.pathname);

   //检查文件是否存在
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