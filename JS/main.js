// 사용변수
let proTime = 1;
let isPlaying = false;
let timeInterval;
let words =[];
let file = "./" + "full" + ".csv";

const progressTime = document.querySelector('.progressTime');
const wordHangle = document.querySelector('.word-Hangle');
const wordDisplay = document.querySelector('.word-display');
const button = document.querySelector('.button');
var hangleDisplay = document.querySelector('.hangle-display');
var optLanguage = document.querySelector('.hangleOrEnglish');
var selectedItem = document.querySelector('.selectedItem');

init();

function init(){
    buttonChange('게임 로딩중');
    getWords();
}

// 게임 실행
function run(){

    proTime =progressTime.value;
    isPlaying =true;
    if (button.innerText == "게임중"){
        
        buttonChange('게임시작');
        clearInterval(timeInterval);
        progressTime.disabled =false;
        hangleDisplay.disabled =false;
        optLanguage.disabled =false;
        selectedItem.disabled =false;
        return;
    }
    timeInterval = setInterval(loadWord, proTime * 1000);
    buttonChange('게임중')
    progressTime.disabled =true;
    hangleDisplay.disabled =true;
    optLanguage.disabled =true;
    selectedItem.disabled =true;
}

// unit 선택
function unitChange(selectObj) {
    var selectIndex=selectObj.selectedIndex;
    file = "./" + selectObj.options[selectIndex].text + ".csv";
    getWords();
}


// 단어 불러오기
function getWords(){
    readTextFile()
    buttonChange('게임시작');
}

function readTextFile()
{
    words=[];
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

function setTime(){
   console.log(progressTime.text);
}


// 단어를 불러온다
let index = 0;
function loadWord(){
    if (index >= words.length){
        index = 0;
    }

    let main_lan;
    let sub_lan;
    if (optLanguage.checked){
        main_lan = words[index][1];
        sub_lan = words[index][0];
    } else{
        main_lan = words[index][0];
        sub_lan = words[index][1];
    }
    wordDisplay.innerText = main_lan;

    if (hangleDisplay.checked){
        wordHangle.innerText = sub_lan;
    } else {
        wordHangle.innerText = "";
    }
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