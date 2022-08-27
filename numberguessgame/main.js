//랜덤 번호 지정
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면 -> 맞췄습니다
// 랜덤범호 < 유저번호 down!!
// 랜덤범호 > 유저번호 up!!
// reset버튼을 누르면 게임 리셋(버튼이 disable됨)
// 5번의 기회를 다쓰면 게임이 끝난다 
// 유저가 1-100 범위 밖 숫자를 입력하면 알려준다 (기회를 깍지않음)
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다 (기회 깍지않음) 

let computerNum = 0;
let playButton = document.getElementById("playbutton");
let UserInput = document.getElementById("userinput");
let ResultArea = document.getElementById("result__area");
let ResetButton = document.getElementById("resetbutton");
let chances = 5; //기회는 5번 
let GameOver = false;
let ChanceArea = document.getElementById("chance__area");
let History = []; //사용자가 입력한 값들을 저장 


playButton.addEventListener("click",play); //play를 매개변수로 넣어줌 
ResetButton.addEventListener("click",reset);
UserInput.addEventListener("focus", clear = () => UserInput.value = ''); //짧은 함수 혹은 여기서밖에 안쓰일 때는 안에 넣어주는게 더 나음 (메모리차지 덜함)

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*50)+1; //+1을 안하면 0-99까지만 나오기 때문
    console.log("정답", computerNum);
}

function play(){
    let Uservalue = UserInput.value

    if(Uservalue < 1 || Uservalue > 50){
        ResultArea.textContent = "1~50사이 숫자를 입력해주세요";
        return; //if문을 만족하지 못하면 찬스를 깍지 않고 바로 종료 
    }
    if(History.includes(Uservalue)){ //히스토리에 이미 유저가 입력한 값을 포함하고 있다면 
        ResultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요";
        return; //if문을 만족하지 못하면 찬스를 깍지 않고 바로 종료  
    }
    
    chances --; //play버튼을 누를때마다 찬스가 1씩 줄어듦 
    ChanceArea.textContent = `기회:${chances}`; //정적인값 동적인값 합칠때 백틱+${}
    // console.log("찬스:",chances)
    History.push(Uservalue); //사용자가 입력한 값 저장 
    console.log(History)

    if(Uservalue < computerNum){
       ResultArea.textContent = "Up!!";
       
    } else if(Uservalue > computerNum){
       ResultArea.textContent = "Down!!";
    } else {
        ResultArea.textContent = "정답입니다!!";
        Gameover = true; //정답 맞추면 플레이버튼 disbled
    }


    if(chances == 0){
        GameOver = true;
        ResultArea.textContent = "실패!!";
    }

    if(GameOver == true){
        playButton.disabled = true; //찬스를 다 쓰면 플레이버튼 disbled
    }
}

function reset(){
    pickRandomNum(); 
    //user input창이 깨끗하게 정리되고 히스토리 초기화됨 
    UserInput.value = '';
    GameOver = false;
    History = []; 
    //기회가 다시 5번으로 됨
    chances = 5;
    ChanceArea.textContent = `기회:${chances}`;
    //play버튼이 다시 활성화되고 새로운 번호가 생성됨 
    ResultArea.textContent = "다시 시작합니다.";
    playButton.disabled = false;
}
pickRandomNum();

