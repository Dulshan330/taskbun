
---

# Taskbun React Web Application

## Introduction

Welcome to the Taskbun React Web Application! This web application empowers users to efficiently manage their daily tasks. With a user-friendly interface, Taskbun ensures a seamless task management experience. Before diving in, make sure you have the Firebase JavaScript SDK set up for authentication and data storage.

## Prerequisites

Before you proceed, ensure you have the following prerequisites installed and set up:

- Node.js and npm installed on your machine
- Firebase project created (Sign up at https://firebase.google.com/ and set up a project)

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/Dulshan330/taskbun.git
   cd taskbun
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project and note down the Firebase configuration.
   - Initialize Firebase in your project by running:
     ```
     npm install firebase
     ```
   - Configure Firebase in your project by adding your Firebase configuration details in the appropriate files.

4. Update your project information in firebase.js file

   ```
   apiKey: "your API key",
   authDomain: "your firebase domain",
   projectId: "your project ID",
   storageBucket: "your storage bucket",
   messagingSenderId: "your messaging sender ID",
   appId: "your App ID",
   measurementId: "your measurement ID",
   ```

6. Start the development server:

   ```
   npm start
   ```

7. Open the application in your web browser.

## Usage

Once the application is running, you can start managing your tasks. Use the intuitive interface to add, edit, and delete tasks. Taskbun stores your tasks securely in Firebase, ensuring they are always accessible.

## Contributing

We welcome contributions to Taskbun! Whether you want to report bugs, suggest enhancements, or contribute code, feel free to open issues or submit pull requests.

---
