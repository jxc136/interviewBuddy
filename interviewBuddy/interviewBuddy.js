class InterviewBuddy {

  constructor(buttonID, timerEl, questionEl) {
    this.startButton = document.getElementById(buttonID);
    this.appTimer = document.getElementById(timerEl)
    this.questionDisplay = document.getElementById(questionEl)
    this.questionData = null
    console.log(this.questionDisplay);
  }

  async loadQuestions(){
    const response = await fetch('http://localhost:3000/questions');
    const data = await response.json();
    this.questionData = data;
    console.log(this.questionData);
  }
}
