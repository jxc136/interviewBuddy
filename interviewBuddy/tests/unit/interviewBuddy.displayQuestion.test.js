const InterviewBuddy = require("../../src/interviewBuddy.js");

/**
 * @jest-environment jsdom
 */

describe("InterviewBuddy displayQuestion", () => {
  let mockInterviewBuddy;

  beforeEach(() => {
    mockInterviewBuddy = new InterviewBuddy(null, null, null);
    mockInterviewBuddy.questionData = [
      "What are the benefits of a SQL database over other types of data-stores?",
      "How often do you refactor your code?",
      "What is your experience with test-driven development?",
    ];
    mockInterviewBuddy.questionDisplay = { innerText: "" }; // Mock questionDisplay element
  });

  test("displays a random interview question from the questionData", () => {
    // Spy on the Math object and control its output
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    mockInterviewBuddy.displayQuestion();

    expect(mockInterviewBuddy.questionDisplay.innerText).toEqual(
      "How often do you refactor your code?"
    );
  });
});
