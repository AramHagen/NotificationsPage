# Frontend Mentor - Notifications page solution

This is a solution to the [Notifications page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/notifications-page-DqK5QAmKbC). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)

## Overview

A standalone Angular application built with Angular 18. The project uses Firebase as its database and Vercel for deployment. It also leverages environment variables for secure configuration.

### Screenshot

![](/src/assets/images/Screenshot-desktop.png)
![](/src/assets/images/Screenshot-mobile.png)

### Links

- Solution URL: [Add solution URL here](https://github.com/AramHagen/NotificationsPage)
- Live Site URL: [Add live site URL here](https://notifications-page-arams-projects-a1ce9533.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties (CSS variables)
- Flexbox
- CSS Grid
- Sass (SCSS)
- Firebase
- Environment Variables in Vercel
- Facade state management

### Getting Started

1. **Clone the Repository**  
   Clone the project from your repository:

   ```bash
    git clone git@github.com:AramHagen/NotificationsPage.git
    cd <NotificationsPage>
   ```

2. **Install Project Dependencies**  
   Run the following command to install the required packages:

   ```bash
    npm install
   ```

3. **Configure Firebase**
   1. Sign in to your Firebase account.
   2. Create a new project in Firebase (if you don’t have one already).
   3. Generate your Firebase credentials (API key, authDomain, etc.).
   4. Add your Firebase configuration to the project’s environment file.
      Modify the src/environments/environment.ts file (or equivalent):

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  },
};
```

4. **Run the Project**
   Start the development server locally:
   ```bash
    npm run start
   ```

### Deployment

The project is deployed on Vercel.

Steps to Deploy on Vercel:

1. Ensure your project is connected to a Vercel account.
2. Add your environment variables in Vercel for Firebase credentials.
3. Deploy the project via the Vercel dashboard or CLI.

### Environment Variables

This project uses environment variables to store sensitive information. Add the following variables to your Vercel environment settings:
• FIREBASE_API_KEY
• FIREBASE_AUTH_DOMAIN
• FIREBASE_PROJECT_ID
• FIREBASE_STORAGE_BUCKET
• FIREBASE_MESSAGING_SENDER_ID
• FIREBASE_APP_ID

### What I Learned

- **Facade Architecture for State Management**: I learned how to implement facade architecture for managing application state in a clean and scalable way.
- **Using Firebase for Database**: I integrated Firebase as the database, learning how to perform CRUD operations (Create, Read, Update, Delete) with Firebase in an Angular project.
- **Environment Variables in Vercel**: I configured environment variables in Vercel to manage different environments for the project, ensuring secure handling of sensitive data such as API keys and credentials.
- **Standalone Angular Project**: I worked with a standalone Angular project using the latest version (Angular 18.2.13), creating a project without modules for a simplified structure and better maintainability.
- **Deploying on Vercel**: I deployed the project on Vercel, taking advantage of its CI/CD features to automate deployments and manage production and staging environments efficiently.
