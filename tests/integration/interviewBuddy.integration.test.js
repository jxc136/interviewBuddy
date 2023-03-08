const InterviewBuddy = require("../../src/interviewbuddy.js");
const { waitFor, screen } = require("@testing-library/dom");

require("jest-fetch-mock").enableMocks();
/**
 * @jest-environment jsdom
 */

describe("InterviewBuddy integration test", () => {
  let interviewBuddy;

  beforeEach(() => {
    document.body.innerHTML = `
    <button id="start-button">New Question</button>
    <p id="timer"></p>
    <p data-testid="question-display" id="question-display"></p>    
    `;
    fetch.resetMocks();
    jest.useFakeTimers();
    interviewBuddy = new InterviewBuddy(
      "start-button",
      "timer",
      "question-display"
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("loads questions and starts timer when start button is clicked", async () => {
    const questionData = [
      "What are the benefits of a SQL database over other types of data-stores?",
      "How often do you refactor your code?",
    ];
    fetch.mockResponseOnce(JSON.stringify({ data: questionData }));

    await interviewBuddy.appInit();

    expect(interviewBuddy.questionData.data).toEqual(questionData);
    expect(interviewBuddy.startButton).toBeDefined();

    interviewBuddy.startButton.click();
    expect(interviewBuddy.timerInterval).toBeDefined();
    expect(interviewBuddy.appTimer.innerText).toEqual(60);

    // When we click the button we need time for our callback functions to fire
    await waitFor(() => {
      // Test ID needed because waitFor ignores our mock HTML
      expect(screen.getByTestId("question-display").textContent).toBeDefined();
    });

    jest.advanceTimersByTime(1000);
    expect(interviewBuddy.appTimer.innerText).toEqual(59);

    jest.advanceTimersByTime(59000);
    expect(interviewBuddy.appTimer.innerText).toEqual(0);
    expect(interviewBuddy.timerInterval).toBeNull();
  });
});
