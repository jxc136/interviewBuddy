const InterviewBuddy = require("../../src/interviewBuddy.js");
/**
 * @jest-environment jsdom
 */

describe("InterviewBuddy constructor", () => {
  test("loads the class properties correctly", () => {
    document.body.innerHTML = `
    <!DOCTYPE html>
    <html>
      <body>
        <div>
          <button id="start-button">New Question</button>
          <p id="timer">1:00</p>
          <p id="question-display"></p>
        </div>
      </body>
    </html>
  `;
    const interviewBuddy = new InterviewBuddy(
      "start-button",
      "timer",
      "question-display"
    );
    expect(interviewBuddy.startButton.textContent).toBe("New Question");
    expect(interviewBuddy.appTimer.textContent).toBe("1:00");
    expect(interviewBuddy.questionDisplay).toBeDefined();
  });
});
