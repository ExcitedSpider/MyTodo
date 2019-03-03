var todos = {};
var currentIndex = 0;

function onClickTodo(index){

  document.getElementById('delete_button').style.display='block';
  document.querySelector("#info ul").style.display='block';
  currentIndex = index;

  var todo = todos[index]
  document.getElementById('todo_name').innerHTML = todo.name;
  document.getElementById('discription').innerHTML = todo.discription;
  document.getElementById('createTime').innerHTML = todo.createTime;
  document.getElementById('dueTime').innerHTML = todo.dueTime;
};

function getTodos(){
  $.ajax({url:"todo",success:(result)=>{
    todos = JSON.parse(result).todos;
    var list = document.getElementById('list');
    for(var i = todos.length-1; i !== -1; i--){
      list.innerHTML = '<a href="javascript:void(0);" onclick="onClickTodo('+i+');return false;">'+todos[i].name+'</a>'
                      +list.innerHTML;
    };
  }});
};

function onClickDelete() {
  var requstBody = {};
  requstBody.index = currentIndex;
  $.ajax({
    url:"delete_todo",
    data:JSON.stringify(requstBody),
    type:'DELETE',
    success:()=>{
      alert('删除成功');
      self.location.href=''
    },
    error:()=>{
      alert('删除失败');
    }
  })
}

onload=function(){
  getTodos();
};