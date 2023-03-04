class InterviewBuddy {

  constructor(buttonID, timerEl, questionEl) {
    this.startButton = document.getElementById(buttonID);
    this.appTimer = document.getElementById(timerEl)
    this.questionDisplay = document.getElementById(questionEl);
    this.questionData = null;
    this.timerInterval = null;
  }

  async loadQuestions(){
    try {
      const response = await fetch('http://localhost:3000/questions');
      const data = await response.json();
      this.questionData = data;
    } catch (error) {
      console.error('Error while fetching questions:', error);
    }
  }
  

  displayQuestion(){
    const randomNumber = Math.floor(Math.random() * this.questionData.length);
    const randomQuestion = this.questionData[randomNumber];
    this.questionDisplay.innerText = randomQuestion;
  }

  startTimer(){
    let countdown = 60;
    this.appTimer.innerText = countdown;
  
    this.timerInterval = setInterval(() => {
      countdown --;
      this.appTimer.innerText = countdown;
      if (countdown === 0) {
        clearInterval(this.timerInterval)
        this.timerInterval = null;
      }
    }, 1000);
  }
  
  
  async appInit(){
    await this.loadQuestions();
    this.startButton.addEventListener("click", () => {
      this.displayQuestion();
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      this.startTimer();
    })
  }
}

module.exports = InterviewBuddy;