// two players computer and person
// possible moves Rock paper scissors
// possible outcomes win lose draw
const GAME_CHOICES = ['ROCK', 'PAPER', 'SCISSORS'];


function getPlayerChoice(){
    let player_choice = prompt("Please choose between Rock, scissors, or Paper: ");
    return player_choice.toLowerCase();
}

function getCompChoice(){
    let choice_index = Math.floor((Math.random() * 3) + 0 );
    return GAME_CHOICES[choice_index].toLowerCase();
}

function EvaluateChoices(person_score,computers_score){
    let persons_choice = '', computers_choice = '';
    try{
        persons_choice = getPlayerChoice();
        computers_choice = getCompChoice();
    
        if(persons_choice === 'rock' && computers_choice === 'scissors'){
            person_score ++;
        }
        else if(persons_choice === 'scissors' && computers_choice === 'rock')
        {computers_score ++;}

        else if(persons_choice === 'paper' && computers_choice === 'rock')
        {person_score ++;}

        else if(persons_choice === 'rock' && computers_choice === 'paper')
        {computers_score ++;}

        else if(persons_choice ==='scissors' && computers_choice === 'paper'){person_score ++;}

        else if(persons_choice === 'paper' && computers_choice === 'scissors'){ computers_score ++;}
        
        else{
            computers_score ++;
            person_score ++;
        }

    }
    catch (e) {
        console.log(e.message)// TODO: handle exception
    }
    return {person_score, computers_score}
}

function HandleGameTrials(){
    let trials = 0, person_score = 0, computers_score = 0;
    while(trials < 5){
        const updatedScores = EvaluateChoices(person_score, computers_score);
        person_score = updatedScores.person_score;
        computers_score = updatedScores.computers_score;
        trials ++
    }
    return [person_score, computers_score];
}

function determineWinner(person_score, computers_score) {
    let results = '';
    if(person_score > computers_score){
        results = `You Win, scores ${person_score} - ${computers_score}`
    }
    else if(computers_score > person_score){
        results = `You Lose,  scores ${person_score} - ${computers_score}`
    }
    else{
        results = `Its a draw, scores ${person_score} - ${computers_score}`
    }

    return results;
}

function PlayGame(){
    let scores = HandleGameTrials();
    let game_scores = determineWinner(...scores);
    alert(game_scores);
    return;
}

