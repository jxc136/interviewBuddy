const InterviewBuddy = require("../../src/interviewBuddy.js");
require("jest-fetch-mock").enableMocks();

describe("InterviewBuddy loadQuestions", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("fetches data and stores it in the questionData property", async () => {
    const interviewBuddy = new InterviewBuddy();
    fetch.mockResponseOnce(
      JSON.stringify({
        data: [
          "What are the benefits of a SQL database over other types of data-stores?",
          "How often do you refactor your code?",
        ],
      })
    );
    await interviewBuddy.loadQuestions();
    expect(interviewBuddy.questionData.data.length).toBe(2);
    expect(interviewBuddy.questionData.data[0]).toBe(
      "What are the benefits of a SQL database over other types of data-stores?"
    );
  });
});
