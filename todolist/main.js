let UserInput = document.getElementById("user__input")
let AddButton = document.getElementById("addbutton")
let DeleteButton = document.getElementById("deletebutton")
let CheckButton = document.getElementById("checkbutton")
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div")
let mode = "all"; //초기값 설정 
let filterList = [];

for(let i=1; i<tabs.length; i++){ //tab 슬라이드 효과
    tabs[i].addEventListener("click",function(event){filter(event)})
}

AddButton.addEventListener("click", addTask);
UserInput.addEventListener("focus",function clear(){UserInput.value=''});
function enterkey() { //enter key 눌렀을 때, 일정 추가하기 
    if (window.event.keyCode == 13) {
    let task = {
        id: randomIDGenerate(),
        taskContent: UserInput.value,
        isComplete:false,
    };
    taskList.push(task)
    render();
    }
}

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: UserInput.value,
        isComplete:false,
    };
    taskList.push(task)
    console.log(taskList)
    render();
}


function render(){ //ui upate
    let list = []
    if(mode == "all"){
        list = taskList;
    } else if(mode == "ongoing" || mode == "done"){
        list = filterList;
    }
    let resultHTML = ''; //string변수
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML+= `<div class="task task-done">
            <div>${list[i].taskContent}</div>
            <div class="btnbox">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button></i>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-square-minus"></i></button>
            </div>
        </div>`;
        }
        else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div class="btnbox"> 
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-circle-check"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-square-minus"></i></button>
            </div>
        </div>`;
        } //onclick이벤트로 클릭이벤트 넣어줌 
        }
      
    document.getElementById("task-board").innerHTML = resultHTML;
}


function toggleComplete(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete; //가지고 있는 값의 반대값을 넣어줌
            break;
        }
    }
    render()
    console.log(taskList);
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1) //삭제 
            break;
        }
    }
    render()
}

function filter(event){
    document.getElementById("underline").style.width=event.target.offsetWidth + "px";
    document.getElementById("underline").style.top=event.target.offsetTop + event.target.offsetHeight + "px";
    document.getElementById("underline").style.left=event.target.offsetLeft + "px";

    mode=event.target.id;
    filterList = [];
    if(mode == "all"){
        render()
    } else if(mode == "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        } 
        render();
    } else if (mode == "done"){
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}


function randomIDGenerate(){ //랜덤id생성 
    return '_' + Math.random().toString(36).substr(2, 9);
}