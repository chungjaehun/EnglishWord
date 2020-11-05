// 사용변수
const GAME_TIME = 4;
let isPlaying = false;
let timeInterval;
let words =[];

const wordHangle = document.querySelector('.word-Hangle');
const wordDisplay = document.querySelector('.word-display');
const button = document.querySelector('.button');

init();

function init(){
    buttonChange('게임 로딩중');
    getWords();
}

// 게임 실행
function run(){
    isPlaying =true;
    console.log(button.innerText);
    if (button.innerText == "게임중"){
        buttonChange('게임시작');
        clearInterval(timeInterval);
        return;
    }
    timeInterval = setInterval(loadWord, GAME_TIME * 1000);
    buttonChange('게임중')
}

// 단어 불러오기
function getWords(){
    //loadCSV();
    readTextFile()
    buttonChange('게임시작');
}

function readTextFile()
{
    let file = './Data.csv';
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                const spe = /\n\r|\n/;
                const alldatas = allText.split(spe);
                for (let i = 1 ; i < alldatas.length ; i++){
                    let rows = alldatas[i].split(',');
                    let col=[];
                    for (let j = 0 ; j < rows.length ; j++){
                        col.push(rows[j])
                    }
                    words.push(col); 
                }
            }
        }
    }
    rawFile.send(null);
}



// 문서에서 파일을 불러오기
let datas=[];


// Load CSV
function loadCSV(){
    fetch('Data.csv')
    .then(function(response){
        return response.text();
    })
    .then(function(data){
        const spe = /\n\r|\n/;
        const alldatas = data.split(spe);
        for (let i = 1 ; i < alldatas.length ; i++){
            let rows = alldatas[i].split(',');
            let col=[];
            for (let j = 0 ; j < rows.length ; j++){
                col.push(rows[j])
            }
            words.push(col); 
        }
    })
    .catch(function(error){
        console.log(error);
    })
}

// 단어를 불러온다
let index = 0;
function loadWord(){
    if (index >= words.length){
        index = 0;
    }
    wordDisplay.innerText = words[index][1];
    wordHangle.innerText = words[index][0];
    index++;
}

// 단어를 불러온다
function loadWord_Random(){
    const randomIndex = Math.floor(Math.random()*words.length);
    wordDisplay.innerText = words[randomIndex][1];
    wordHangle.innerText = words[randomIndex][0];
}


// 버튼명 변경
function buttonChange(text){
    button.innerText = text;
}