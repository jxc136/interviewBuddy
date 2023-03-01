const InterviewBuddy = require('../../src/interviewBuddy.js');
/**
 * @jest-environment jsdom
 */

describe ('InterviewBuddy constructor', () => {
  // let interviewBuddy;
  // beforeAll(() => {
  //   const dom = new JSDOM(`
  //     <!DOCTYPE html>
  //     <html>
  //       <body>
  //         <div>
  //           <button id="start-button"></button>
  //           <p id="timer"></p>
  //           <p id="question-display"></p>
  //         </div>
  //       </body>
  //     </html>
  //   `);
  //   const interviewBuddy = new InterviewBuddy(
  //     "start-button",
  //     "timer",
  //     "question-display"
  //   );
  // });

  test('loads the class properties correctly', () => {
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
    expect(interviewBuddy.startButton.textContent).toBe('New Question');
    expect(interviewBuddy.appTimer.textContent).toBe('1:00');
    expect(interviewBuddy.questionDisplay).toBeDefined();
    
  });
})
// 1. It loads the startButton correctly

// 2. It loads the appTimer correctly

// 3. It loads the questionDisplaycorrectly