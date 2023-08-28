# PencePulse

![Project Logo]()

A personal finance tracker app built using React Native and Node.js.

## Table of Contents

- [Screenshots](#screenshots)
- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Screenshots

<details>
  <summary>Home Screen - Overview</summary>
  
  <img align="left" src="common/img/HomeScreen.png" alt="Home Screen - Overview">
  
  **Home Screen Overview**
  
  The Home Screen displays a comprehensive overview of your finances. Monthly charts and statistics allow users to track their expenses and incomes. A real-time balance calculation provides instant insights into their financial status.
</details>

<details>
  <summary>Home Screen - Statistics</summary>
  
  <img align="right" src="common/img/HomeScreen2.png" alt="Home Screen - Statistics">
  
  **Home Screen Statistics**
  
  In-depth statistics provide a detailed breakdown of expenses and incomes. Gain insights into categories, trends, and financial patterns through graphical representation.
</details>

<details>
  <summary>Profile Page</summary>
  
  <img align="left" src="common/img/ProfilePage.png" alt="Profile Page">
  
  The Profile Page allows users to manage their account settings. They can change their username, password, or log out. This page ensures a personalized experience for each user of the app.
</details>

## Description

PencePulse is a mobile application built using React Native. The app helps users manage their expenses and incomes, providing insightful statistics and charts to visualize their financial situation. Users can sign up, log in, add transactions, and view their financial overview.

## Features

- User authentication (sign up, log in, profile settings)
- Add transactions with title, amount, category, and type
- Monthly expense and income overview
- Expense category breakdown chart
- Real-time balance calculation
- Responsive and user-friendly design

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Shakhrai8/PencePulse.git
   cd your-project
   ```

2. Install dependencies for the frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../api
   npm install
   ```

3. Configure your backend:

   Create a .env file in the api directory and set up your MongoDB connection URL.

4. Start the frontend and backend servers:

   ```bash
   # Inside the frontend directory
   npx react-native start

   # Inside the api directory
   npm run start:test
   ```

## Usage

1. Open the app on your Android/iOS device or emulator.
2. On the landing page, you can sign up or log in.
3. After logging in, you'll be directed to the home screen with financial insights.
4. Add transactions to track your expenses and incomes.
5. Explore charts and statistics to manage your finances effectively.

## Technologies

- React Native
- Redux for state management
- React Navigation for navigation
- Node.js and Express for the backend
- MongoDB for data storage
- Detox for end-to-end testing
- Jest for unit testing

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.
