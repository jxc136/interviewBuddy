class InterviewBuddy {
  constructor(buttonID, timerEl, questionEl) {
    this.startButton = document.getElementById(buttonID);
    this.appTimer = document.getElementById(timerEl);
    this.questionDisplay = document.getElementById(questionEl);
    this.questionData = null;
    this.timerInterval = null;
  }

  async loadQuestions() {
    try {
      const response = await fetch("http://localhost:3000/questions");
      const data = await response.json();
      this.questionData = data;
      console.log(`[${new Date().toISOString()}] Question data loaded`);
    } catch (error) {
      console.error(
        `[${new Date().toISOString()}] Error while fetching questions:`,
        error
      );
    }
  }

  displayQuestion() {
    const randomNumber = Math.floor(Math.random() * this.questionData.length);
    const randomQuestion = this.questionData[randomNumber];
    this.questionDisplay.innerText = randomQuestion;
    console.log(
      `[${new Date().toISOString()}] Question displayed: ${randomQuestion}`
    );
  }

  startTimer() {
    let countdown = 60;
    this.appTimer.innerText = countdown;
    console.log(`[${new Date().toISOString()}] Timer started`);
    this.timerInterval = setInterval(() => {
      countdown--;
      this.appTimer.innerText = countdown;
      if (countdown === 0) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }, 1000);
  }

  async appInit() {
    await this.loadQuestions();
    this.startButton.addEventListener("click", () => {
      console.log(`[${new Date().toISOString()}] New question button clicked`);
      this.displayQuestion();
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      this.startTimer();
    });
  }
}
module.exports = InterviewBuddy;
