window.addEventListener('load',function(){

 const addForm=document.querySelector('#add');

 // 添加学生信息表单的submit事件
 addForm.addEventListener('submit',function(e){
  e.preventDefault();
  const fd=new FormData(this);
  addStudentInfo(fd);
 })

 getStudentsInfo();

})

// 修改axios默认配置
const axiosInstance=axios.create({
 baseURL: 'http://127.0.0.1'
});

/**
 * 从服务器获取学生信息
 */
function getStudentsInfo() {
 axiosInstance({
  method:'get',
  url:'/my/results'
 })
  .then(function(res){
   if(res.data.status===0){
    renderList(res.data.data);
   }else{
    console.log(res.data.message);
   }
  })
}

/**
 * 将数据渲染到页面上,同时为页面上的按钮注册相应的事件
 * @param {Object} data 学生信息数据
 */
function renderList(data){
 const tbody=document.querySelector('tbody');
 const arr=[];
 data.forEach((value)=>{
  arr.push(`
  <tr>
  <td>${value.id}</td>
  <td>${value.name}</td>
  <td>${value.subject}</td>
  <td>${value.age}</td>
  <td>${value.gender}</td>
  <td>${value.degree}</td>
  <td id="${value.id}">
    <button class="delete">删除</button>
    <button class="info">编辑</button>
  </td></tr>
  `)
 })
 // 将动态生成的标签添加到页面中
 tbody.innerHTML=arr.join('');
 const delBtns=tbody.querySelectorAll('.delete');
 // 为删除按钮注册click事件
 delBtns.forEach((value)=>{
  value.addEventListener('click',function(){
   if(confirm('确定要删除这条学生信息么?')) deleteStudentInfo(Number(this.parentNode.id));
  })
 })
 const editBtns=tbody.querySelectorAll('.info');
 editBtns.forEach((value)=>{
  // 为每个编辑按钮注册click事件
  value.addEventListener('click',function(){
   const editBox=document.querySelector('#editorBox');
   const modal=document.querySelector('#editorModal');
   const close=document.querySelector('#close');
   const inputs=editBox.querySelectorAll('input');
   const confirmBtn=document.querySelector('#over');
   const updateForm=document.querySelector('#update');
   editBox.style.display='block';
   modal.style.display='block';
   // 点击关闭按钮,关闭编辑界面
   close.addEventListener('click',function(){
    editBox.style.display='none';
    modal.style.display='none';
    inputs.forEach((item)=>{
     item.value='';
    })
   })
   // 根据id发送请求获取学生信息,将信息填入对应的表单
   axiosInstance({
    method:'get',
    url:'/my/results/student'+this.parentNode.id,
   }).then(function(res){
    if(res.data.status===0){
     inputs.forEach((item)=>{
      item.value=res.data.data[item.name];
     })
    }else{
     console.log(res.data.message);
    }
   })
   // 点击确认按钮,提交修改后的学生数据.同时关闭编辑页面
   confirmBtn.addEventListener('click',function(){
    // 更新数据
    updateStudentInfo(new FormData(updateForm));
    editBox.style.display='none';
    modal.style.display='none';
   })
  })
 })
}

/**
 * 添加学生数据
 * @param {FormData} data 表单数据
 */
function addStudentInfo(data) {
 axiosInstance({
  method:'post',
  url:'/my/results',
  data:data
 }).then(function(res){
  if(res.data.status===0){
   getStudentsInfo();
  }else{
   alert(res.data.message)
   console.log(res.data.message);
  }
 })
}

/**
 * 更新学生信息
 * @param {FormData}} data 更新的学生信息
 */
function updateStudentInfo(data){
 axiosInstance({
  method:'post',
  url:'/my/results/update',
  data:data
 }).then(function(res){
  if(res.data.status===0){
   getStudentsInfo();
  }else{
   console.log(res.data.message);
  }
 })
}

/**
 * 根据学生id删除学生信息
 * @param {Number} id 学生id
 */
function deleteStudentInfo(id) {
 axiosInstance({
  method:'delete',
  url:'/my/results/delete'+id
 }).then(function(res){
  if(res.data.status===0){
   getStudentsInfo();
  }else{
   console.log('删除学生信息失败!');
  }
 })
}