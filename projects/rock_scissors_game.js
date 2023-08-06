const GAME_CHOICES = ['ROCK', 'PAPER', 'SCISSORS'];
const computerButtons = document.querySelectorAll('.computers');
const playerButtons = document.querySelectorAll('.player1');
const gameStartBtn = document.querySelector('.start_game');
const INSTRUCTIONS_PANEL = document.querySelector('.instructions_container');
const FINAL_RESULTS_PANEL = document.querySelector('.textBox')
const scores_history = document.querySelector('.individual_game_container');

async function getGameChoices() {
  return new Promise((resolve, reject) => {
    function choiceClickHandler(event) {
      INSTRUCTIONS_PANEL.textContent = `You selected ${event.target.textContent.toLowerCase()}`;
      
      for (let btn of playerButtons) {btn.removeEventListener('click', choiceClickHandler);}
      
      setTimeout(() => {resolve(event.target.textContent.toLowerCase());},1000);}

    for (let btn of playerButtons) {
      btn.addEventListener('click', choiceClickHandler);
    }
  });}

async function getComputerChoices(){
    let choice = await getCompChoice();
    for (let btn of computerButtons){
        if (btn.textContent.toLocaleLowerCase() === choice){
            forceHover(btn);
            setTimeout(()=>{
                removeHover(btn)
            },500);
        }
    }
    return new Promise((resolve, reject)=>{
             setTimeout(()=>{resolve(choice);},1000)});}

async function getCompChoice(){
    let choice_index = Math.floor((Math.random() * 3) + 0 );
    let choice = GAME_CHOICES[choice_index].toLowerCase();
    
    INSTRUCTIONS_PANEL.textContent = `The computer selected ${choice}`;
    return choice;
}


function EvaluateChoices(person_score,computers_score, computers_choice, persons_choice){
    let explanation = '';
    if(persons_choice === 'rock' && computers_choice === 'scissors'){
        explanation = 'its a win';
        person_score ++;
    }
    else if(persons_choice === 'scissors' && computers_choice === 'rock'){
        explanation = 'its a lose';
        computers_score ++;
    }

    else if(persons_choice === 'paper' && computers_choice === 'rock'){
        explanation = 'its a win';
        person_score ++;}

    else if(persons_choice === 'rock' && computers_choice === 'paper'){
        explanation = 'its a lose';
        computers_score ++;
    }

    else if(persons_choice ==='scissors' && computers_choice === 'paper'){
        explanation = 'its a win';
        person_score++;
    }

    else if(persons_choice === 'paper' && computers_choice === 'scissors'){
        explanation = 'its a lose';
        computers_score ++;}
        
    else{
        explanation = 'its a draw'
        computers_score ++;
        person_score ++;
    }
    scores_history.innerHTML += ` &gt; current scores ${person_score} : ${computers_score} -- ${explanation}<br/>`
    return {person_score, computers_score}
}

async function HandleGameTrials(){
    let trials = 0;
    let person_score = 0;
    let computers_score = 0;

    while(trials < 5){
        let persons_choice = '';
        let computers_choice = '';
        try{
            persons_choice = await getGameChoices();
            computers_choice = await getComputerChoices();
        }
        catch (error){
            console.log(error)
        }
        
        const updatedScores = EvaluateChoices(person_score, computers_score, computers_choice, persons_choice);
        person_score = updatedScores.person_score;
        computers_score = updatedScores.computers_score;
        trials ++
    }
    INSTRUCTIONS_PANEL.textContent = '';
    return [person_score, computers_score];
}

function determineWinner(person_score, computers_score) {
    let results = '';
    if(person_score > computers_score){
        results = `You Win<br/> Scores : ${person_score} - ${computers_score}`
    }
    else if(computers_score > person_score){
        results = `You Lose<br/>  Scores : ${person_score} - ${computers_score}`
    }
    else{
        results = `Its a Draw<br/> Scores : ${person_score} - ${computers_score}`
    }

    return results;
}

function forceHover(element){
    element.classList.add('hover-effect')
}
function removeHover(element) {
  element.classList.remove('hover-effect');
}

async function PlayGame(){
    let scores = await HandleGameTrials();
    let game_scores = determineWinner(...scores);
    FINAL_RESULTS_PANEL.innerHTML =  game_scores;
    gameStartBtn.textContent = 'GAME OVER !!!'
    setTimeout(()=>{
        window.location.reload();
    },15000);
    return;
}

gameStartBtn.addEventListener('click',(event)=>{
    event.target.textContent = 'GAME ON PROGRESS'
    FINAL_RESULTS_PANEL.textContent = '';
    PlayGame();
})