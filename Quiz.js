class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
  
    background("yellow");

    textSize(30);
    fill(0);
    text("Result of the Quiz",400,50);

    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
    var display_Answers = 230;
    fill(0);
    textSize(20);
    text("*NOTE: Contestants who answered correct are highlighted in green color!");

    for(var plr in allContestants ){
      debugger;
      var correctAns = "4"
      if(correctAns === allContestants[plr].answer)
      fill("Green")
      else
      fill("Red");

      display_Answers+=30;
      textSize(22);
      text(allContestants[plr].name + ": " + allContestants[plr].answer, 220, display_Answers);
    }
  }
  }

}
