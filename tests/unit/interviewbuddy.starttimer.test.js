const InterviewBuddy = require("../../src/interviewbuddy.js");

describe("InterviewBuddy startTimer", () => {
  let mockInterviewBuddy;

  beforeEach(() => {
    mockInterviewBuddy = new InterviewBuddy(null, "timer", null);
    mockInterviewBuddy.appTimer = { innerText: "" };
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("starts a timer and updates the timer element", () => {
    mockInterviewBuddy.startTimer();
    jest.advanceTimersByTime(1000);
    expect(mockInterviewBuddy.appTimer.innerText).toEqual(59);
  });
});
