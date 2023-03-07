const InterviewBuddy = require("../../src/interviewbuddy.js");
require("jest-fetch-mock").enableMocks();
/**
 * @jest-environment jsdom
 */

describe("InterviewBuddy appInit", () => {
  let interviewBuddy;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="start-button"></button>
      <p id="timer"></p>
      <p id="question-display"></p>
    `;
    fetch.resetMocks();

    interviewBuddy = new InterviewBuddy("start-button", null, null);
  });

  test("adds a click event listener to the start button with the correct callback functions", async () => {
    // Function called when appInit is called:
    interviewBuddy.loadQuestions = jest.fn();
    // Functions called when a click happens:
    interviewBuddy.displayQuestion = jest.fn();
    interviewBuddy.startTimer = jest.fn();

    await interviewBuddy.appInit();
    expect(interviewBuddy.loadQuestions).toHaveBeenCalled();
    interviewBuddy.startButton.click();
    expect(interviewBuddy.displayQuestion).toHaveBeenCalled();
    expect(interviewBuddy.startTimer).toHaveBeenCalled();
  });
});
