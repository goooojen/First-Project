//canvas setting
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400; //px
canvas.height = 700;
document.body.appendChild(canvas); //html-body에 canvas를 넣음 

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameoverImage;
let gameOver=false; //true이면 게임이 끝남 
let score = 0; //점수

//우주선 좌표 64*64
let spaceshipX = canvas.width/2-32;
let spaceshipY = canvas.height-64;

let bulletList= [] //총알 저장소 
//총알 
function Bullet(){
    this.x = 0; //bullet의 x값
    this.y = 0; //bullet의 y값

    this.init = function(){ 
        this.x = spaceshipX + 20; //bullet 위치 초기값
        this.y = spaceshipY;
        this.alive = true; // false면 죽은 총알 

        bulletList.push(this) //총알 위치를 bullet list에 저장
    };
    this.update = function(){
        this.y -= 7; //-7씩 y좌표가 줄어듦 (총알이 위로 움직임)
    };

    this.checkHit = function(){ //총알과 적군이 닿았을 때 
        for(let i=0; i<enemyList.length; i++){
            if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x+50){
                score++; //닿으면 점수를 1씩 증가 
                this.alive = false; //총알이 죽음 
                enemyList.splice(i,1); //닿은 적군을 없앰 
            }

        }
    }
}

let enemyList = []//적군 저장소 
function Enemy(){
    this.x = 0;
    this.y = 0;

    function generateRandomValue(min, max){
        let randomNum = Math.floor(Math.random()*(max-min+1))+min; //랜덤 위치 
        return randomNum;
    }

    this.init = function(){
        this.x = generateRandomValue(0, canvas.width-50);
        this.y = 0; //위에서 내려오기때문에 0부터 시작  
        enemyList.push(this)
    };
    this.update = function(){
        this.y += 3; //적군이 아래로 내려감 
    
        if(this.y >= canvas.height-50){
            gameOver = true;
            console.log("gameover")
        }
    }
}

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src="img/background.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src="img/jet.png";

    bulletImage = new Image();
    bulletImage.src = "img/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "img/enemy.png";

    gameoverImage = new Image();
    gameoverImage.src = "img/gameover.png";
}

let keysDown = {}
function setupKeyboardListener(){
    document.addEventListener("keydown", function(event){ //key눌렀을때
        keysDown[event.keyCode] = true;
        // console.log("키다운객체 값은?",keysDown)
        // console.log("무슨 키가 눌렸어?",event.keyCode)
    });
    document.addEventListener("keyup", function(event){ //key뗐을 때
        delete keysDown[event.keyCode];
        // console.log("버튼 클릭 후",keysDown)

        if(event.keyCode == 32) { //space bar 키를 뗐을 때
            createBullet() //총알 생성 함수 
        }
    });
}

function createBullet(){
    console.log("총알생성")
    let b = new Bullet() //총알 하나 생성
    b.init();
    console.log("총알 리스트",bulletList)
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy() //적군 한명 생성
        e.init();
    },1000) //1초마다 적군생성
}

function update(){
    if(39 in keysDown){ //39=오른쪽 버튼 
        spaceshipX += 5; //우주선의 속도
    } 
    if(37 in keysDown){ //37=왼쪽 방향 
        spaceshipX -= 5; 
    }
  
      //우주선이 배경을 벗어나지 않도록 
    if(spaceshipX <=0){
        spaceshipX = 0; //x좌표가 마이너스가 되지 않도록 0으로 고정
    }
    if(spaceshipX >= canvas.width-64){
        spaceshipX = canvas.width-64; //x좌표가 400이상이 되지 않도록 고정
    }

    //총알 y좌표 업데이트 함수
    for(let i=0; i<bulletList.length; i++){
        if(bulletList[i].alive){
            bulletList[i].update();
            bulletList[i].checkHit(); //적군과 닿았는지도 항상 확인 
        }
    }

    //적군 y좌표 업데이트 
    for(let i=0; i<enemyList.length; i++){
        enemyList[i].update();
    }
}

function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    ctx.fillText(`Score:${score}`,20,20);
    ctx.fillStyle = "white"; 
    ctx.font = "20px Arial"; 
    for(let i=0;i<bulletList.length;i++){ //총알 render
        if(bulletList[i].alive){
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        }
    }

    for(let i=0;i<enemyList.length;i++){ //적군 render
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
    }
}

function main(){
    if(!gameOver){
        update(); //좌표값(움직임)을 업데이트하고 
        render(); //그려줌 
        // console.log("animation calls main function")
        requestAnimationFrame(main); //무한 함수 호출 
    } else { //게임오버 시 
        ctx.drawImage(gameoverImage,0,150,400,400)
    }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();

//방향키를 누르면
//우주선의 xy좌표가 바뀌고
//다시 render를 그려준다.

//총알 만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알 발사 = y값이 줄어듬 , 총알의 x값 =  우주선의 x위치 
//3. 발사된 총알들은 배열에 저장
//4. 모든 총알들은 x,y좌표값이 있어야 함
//5. 총알 배열을 가지고 render 

//적군의 위치가 랜덤하다
//적군은 밑으로 내려온다 == y좌표가 증가함
//1초마다 하나씩 적군이 생성됨 
//적군이 바닥에 닿으면 게임오버 = y가 700-적군크기 

//적군과 총알이 만나면 적군은 사라지고 점수를 1점 획득함 
//=적군과 총알이 만난다 즉, 총알.y <= 적군.y && 총알.x >= 적군.x && 총알.x <= 적군.x+50 
