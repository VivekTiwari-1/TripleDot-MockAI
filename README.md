# AI-Powered Mock Interview Application

## Overview

Welcome to the AI-Based Mock Interview Application! This platform is designed to help you practice and improve your interview skills through personalized feedback, recorded video sessions, quizzes, and more. It offers a comprehensive set of features to simulate real interview experiences and enhance candidates' skills. Whether you're preparing for coding interviews, technical assessments, or HR rounds, our application provides the tools you need to succeed.

## Features

1. **Variety of Interview types**: Our application supports a variety of interview types to help you prepare comprehensively like technical, coding, HR, Situational and behavioral interviews.

2. **AI-Driven Personalized Feedback**: Receive detailed, constructive feedback on your interview performance, tailored to your responses and presentation.

3. **Video Recording**: Each mock interview session is recorded, allowing you to review and analyze your performance later.

4. **Timed Practice Sessions**: Simulate real interview conditions with customizable timer settings for each question or the entire interview.

5. **Integrated Coding Environment**: Practice coding challenges within the application, mimicking real technical interview scenarios.

6. **Technology Quizzes**: Test and improve your knowledge with quizzes covering various technologies and concepts.

7. **Extensive Question Bank**: Access a vast collection of interview questions across different difficulty levels and topics.

8. **Previous Mock Rounds**: Keep track of all your previous mock interviews, allowing you to monitor your progress over time.

## Tech Stack

- **Frontend**: React, NextJS
- **Styling**: TailwindCSS
- **Backend**: DrizzleORM
- **Database**: NeonDB
- **AI Integration**: Google Gemini
- **Authentication**: Clerk

## Usage

- **Sign Up / Sign In**: Start by creating an account or signing in using your Clerk credentials.

- **Dashboard**: After logging in, you'll be taken to the dashboard where you can start a new mock interview, view previous sessions, or take a quiz.

- **Mock Interview**: Select your desired interview type (e.g., Technical, Coding, HR, Behavioral, Situational) and begin the session. The integrated coding environment allows you to solve problems in real-time.

- **Review Sessions**: After completing an interview, review the recorded video and feedback provided by the AI.

- **Quiz**: Test your knowledge on various technical topics with timed quizzes.

## API Routes

- `/`: Home page
- -- `/dashboard`: Create new interview or quiz and get list of previous interviews and quizzes and their feedback
- --- `/dashboard/interview/[id]`: Interview interface
- --- `/dashboard/interview/[id]/feedback`: Feedback of your interview session
- -- `/questionBank`: Question bank with each questions and their answer of previous sessions
- -- `/community`: Community section will be added soon

## Environment Variables

Here’s a list of environment variables used in the project:

- `NEXT_PUBLIC_CLERK_FRONTEND_API`: Clerk Frontend API key for authentication.
- `CLERK_API_KEY`: Clerk API key for backend authentication.
- `DATABASE_URL`: NeonDB database connection URL.
- `GEMINI_API_KEY`: Google Gemini API key for AI functionalities.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature-name).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature/your-feature-name).
6. Open a pull request.

## Contact

Contact me at `vivektiwarii4545@gmail.com` for any queries or support.

## License

This project is licensed under the MIT License.
