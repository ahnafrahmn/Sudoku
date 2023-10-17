//      Ahnaf's Code    
//       IG : @ahnaf.rahmn   
//       Mail : ahnaf.rahmn@gmail.com

// ==========================================================================

// =============    Variables   =============

let chance = 3,
difficulty = 0,
clicked = false,
preSelected = null,
counterID = 0,
solution = [],
row = [''];





// ============     Functions   ==============

randomNumbers();


function randomNumbers(){
  const contents = document.querySelectorAll('.content');
  contents.forEach(function(item){
    item.classList.add('vanish');
  });
  document.querySelector('.chance').classList.add('chanceMsg');
  const msgBox = document.querySelector('.msg1');
  msgBox.innerHTML = '';
  msgBox.classList.add('msg');
  msgBox.textContent = "SUDOKU";
  sleep(1000).then(() => {
    contents.forEach(function(item){
      item.classList.remove('vanish');
    });
    msgBox.classList.remove('msg');
    document.querySelector('.chanceMsg').classList.remove('chance');
  });
  row = sudokuSolution();
  startGame();
}


function startGame(){
  const chnaceText = document.querySelector('.chanceMsg');
  chnaceText.innerHTML = `You have ${chance} chances!`;
  // 9x9 Box!!
  for(let i=1; i<=9; i++){
      for(let j=1; j<=9; j++){
          let newbox = document.createElement('div');
          newbox.classList.add('small-box');
          if(j==3 || j==6){
              newbox.classList.add('vertical-line');
          }
          if(i==3 || i==6){
              newbox.classList.add('horizontal-line');
          }
          solution.push(row[i-1][j-1]);
          newbox.id = counterID;
          counterID++;

          // Difficulty Setting ::
          if(difficulty==0){
              newbox.innerHTML = boxValues_difficulty_easiest( '', row[i-1][j-1]);
          } else if(difficulty==1){
              newbox.innerHTML = boxValues_difficulty_easy('', '', row[i-1][j-1]);
          } else if(difficulty==2){
              newbox.innerHTML = boxValues_difficulty_midium('', '', '', row[i-1][j-1]);
          }

          if(newbox.innerHTML != ''){
              newbox.classList.add(`NUM${row[i-1][j-1]}`);
          }

          if(newbox.innerHTML == ''){
              newbox.classList.add('gap');
          }
          document.querySelector('.box').appendChild(newbox);

          newbox.addEventListener('click', function(){
              if(preSelected){
                  const allClicked = document.querySelectorAll('.clicked');
                  const allClicked2 = document.querySelectorAll('.selectedNum');
                  allClicked.forEach(function(unClick){
                      unClick.classList.remove('clicked');
                      unClick.classList.remove('selected');
                  });
                  allClicked2.forEach(function(unClick){
                      unClick.classList.remove('selectedNum');
                  });
              }
              this.classList.add('selected');
              clicked = true;
              preSelected = this;
              for(let k=0; k<9; k++){
                  let key=true;
                  for(let l=0; l<9; l++){
                      if(9*k+l == this.id){
                          for(let m=0; m<9; m++){
                              document.getElementById(9*m+l).classList.add('clicked');
                          }
                          for(let n=0; n<9; n++){
                              document.getElementById(9*k+n).classList.add('clicked');
                          }
                          key=false;
                          break;
                      }
                  } 
                  if(!key){break;}
              }
              highlightBox(this);
          });
      }
  }
  // ================================================       Option numbers!! 

  for(let i=1; i<=9; i++){
      let num = document.createElement('div');
      num.classList.add('optNums');
      num.innerHTML = i;
      document.querySelector('.nums').appendChild(num);

      num.addEventListener('click', function(){
          if(clicked){
              if(solution[preSelected.id] == i){
                  preSelected.innerHTML = i;
                  preSelected.classList.add(`NUM${i}`);
                  highlightBox(preSelected);
                  checkWin();
              } else{
                chance--;
                if(chance==0){
                  msgPrint(0);
                }
                chnaceText.innerHTML = `You have ${chance} chances!`;
              }
          }
      });
  }
}

function msgPrint(x){
  const contents = document.querySelectorAll('.content');
  contents.forEach(function(item){
    item.classList.add('vanish');
  });
  document.querySelector('.chanceMsg').classList.add('vanish');
  const msgBox = document.querySelector('.msg1');
  msgBox.innerHTML = '';
  msgBox.classList.add('msg');
  if(x){
    msgBox.textContent = "You Won The Game!!";
  } else{
    msgBox.textContent = "Game Over!!";
  }
  sleep(1500).then(() => {
    location.reload();
  });
}

function checkWin(){
  let key=true;
  const chosen = document.querySelectorAll('.small-box');
  chosen.forEach(function(target){
      if(target.innerHTML == ''){
        key = false;
      }
  });
  if(key){
    msgPrint(1);
  }
}

function highlightBox(a){
  if(a.innerHTML != ''){
    let temp = a.innerHTML;
    const chosen = document.querySelectorAll(`.NUM${temp}`);
    chosen.forEach(function(target){
        target.classList.add('selectedNum');
    });
    clicked = true;
  }
}

function sudokuSolution(){
    let arr = [];
    const randomNum = Math.floor(Math.random() * 6);
    console.log(randomNum);
    switch (randomNum) {
        case 0:
          return ['452716839', '169853247', '837429561', '214567983', '685394712', '973182654', '326945178', '541278396', '798631425'];
        case 1:
          return ['524163897', '791854263', '683729154', '412976385', '857341926', '369582741', '976235418', '248617539', '135498672'];
        case 2:
          return ['957613284', '483257196', '612849537', '178364952', '524971368', '369528741', '845792613', '291436875', '736185429'];
        case 3:
          return ['845792613', '291436875', '736185429', '178364952', '524971368', '369528741', '957613284', '483257196', '612849537'];
        case 4:
          return ['326945178', '541278396', '798631425', '214567983', '685394712', '973182654', '452716839', '169853247', '837429561'];
        case 5:
          return ['976235418', '248617539', '135498672', '412976385', '857341926', '369582741', '524163897', '791854263', '683729154'];
      }      
}

// ==============================================================================================


function boxValues_difficulty_midium(param1, param2, param3, param4) {
    const paramsArray = [param1, param2, param3, param4];
    const randomIndex = Math.floor(Math.random() * paramsArray.length);
    return paramsArray[randomIndex];
}
function boxValues_difficulty_easy(param1, param2, param3) {
    const paramsArray = [param1, param2, param3];
    const randomIndex = Math.floor(Math.random() * paramsArray.length);
    return paramsArray[randomIndex];
}
function boxValues_difficulty_easiest(param1, param2) {
    const paramsArray = [param1, param2];
    const randomIndex = Math.floor(Math.random() * paramsArray.length);
    return paramsArray[randomIndex];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}