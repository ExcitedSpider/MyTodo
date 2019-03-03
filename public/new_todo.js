function onClickSubmit() {
  var reqBody = {};
  reqBody.createTime = formatTime(" ");
  reqBody.name = document.getElementById('name').value;
  reqBody.discription = document.getElementById('description').value;
  var datetime_local=document.getElementById('duetime').value.split('T');
  reqBody.dueTime = datetime_local[0]+' '+datetime_local[1];
  if(reqBody.name==="" || reqBody.discription === "" || reqBody.dueTime === ""){
    alert("待办事项未填完整。")
  }else{
    $.ajax({
      url:'/new_todo',
      type:'POST',
      dataType:'json',
      data:JSON.stringify(reqBody),
      success:()=>{
        alert('添加成功')
        self.location.href='/';
      },
      error:()=>{
        alert('添加成功');
      }
    })
  }
}

onload=()=>{
  document.getElementById('duetime').value = formatTime('T');
}

//formatTimefor XXXX-YY-ZZ*AA:BB
function formatTime(separator) {
  var date = new Date();
  var month = date.getMonth() < 10? '0'+date.getMonth() : date.getMonth();
  var day = date.getDate() < 10? '0'+date.getDate():date.getDate();
  var hours = date.getHours() < 10 ? '0'+date.getHours():date.getHours();
  var minutes = date.getMinutes() < 10 ? '0' +date.getMinutes():date.getMinutes();
  return date.getFullYear()+'-'+month+'-'+day+separator+hours+':'+minutes;
}

function onClickBack() {
  self.history.back();
}