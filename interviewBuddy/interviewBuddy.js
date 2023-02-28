class InterviewBuddy {

  constructor(buttonID, timerEl, questionEl) {
    this.startButton = document.getElementById(buttonID);
    this.appTimer = document.getElementById(timerEl)
    this.questionDisplay = document.getElementById(questionEl)
    console.log(this.questionDisplay);
  
  }
}
