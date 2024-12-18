const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
const dotenv = require("dotenv").config({ path: "src/.env" }); // Load .env file

// Firebase configuration template for both environments
const generateEnvFile = (env) => {
  return `export const environment = {
    production: ${env === "prod" ? "true" : "false"},
    firebaseConfig: {
      apiKey: '${process.env.FIREBASE_API_KEY}',
      authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
      projectId: '${process.env.FIREBASE_PROJECT_ID}',
      storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
      messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
      appId: '${process.env.FIREBASE_APP_ID}'
    }
  };
`;
};
// Generate the environment files based on environment (dev or prod)
const generateEnvironmentFiles = () => {
  // Generate the development environment file
  const devEnvFile = generateEnvFile("dev");
  const devTargetPath = path.join(
    __dirname,
    "./src/environments/environment.ts"
  );
  fs.writeFile(devTargetPath, devEnvFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        successColor,
        `${checkSign} Successfully generated environment.ts`
      );
    }
  });

  // Generate the production environment file
  const prodEnvFile = generateEnvFile("prod");
  const prodTargetPath = path.join(
    __dirname,
    "./src/environments/environment.prod.ts"
  );
  fs.writeFile(prodTargetPath, prodEnvFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        successColor,
        `${checkSign} Successfully generated environment.prod.ts`
      );
    }
  });
};

// Run the function to generate the environment files
generateEnvironmentFiles();
