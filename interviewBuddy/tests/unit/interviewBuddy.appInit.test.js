const InterviewBuddy = require('../../src/interviewBuddy.js');

/**
 * @jest-environment jsdom
 */

describe('InterviewBuddy appInit', () => {
  let interviewBuddy;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="start-button"></button>
      <p id="timer"></p>
      <p id="question-display"></p>
    `;

    interviewBuddy = new InterviewBuddy('start-button', null, null);
  });

  test('adds a click event listener to the start button with the correct callback functions', async () => {
    // Mock the functions called when a click happens 
    interviewBuddy.displayQuestion = jest.fn(); 
    interviewBuddy.startTimer = jest.fn(); 
    await interviewBuddy.appInit();
    interviewBuddy.startButton.click();
    expect(interviewBuddy.displayQuestion).toHaveBeenCalled();
    expect(interviewBuddy.startTimer).toHaveBeenCalled();
  });
});