var todos = {}

function onClickTodo(index){
  console.log('click todo');
  console.log(todos[index]);
};

function onClickAdd() {
  console.log('click add');
};

function getTodos(){
  $.ajax({url:"todo",success:(result)=>{
    todos = JSON.parse(result).todos;
    console.log(todos);
    var list = document.getElementById('list');
    for(var i = todos.length-1; i !== -1; i--){
      list.innerHTML = '<a href="javascript:void(0);" onclick="onClickTodo('+i+')">'+todos[i].name+'</a>'
                      +list.innerHTML;
    };
  }});
};

onload=function(){
  getTodos();
};