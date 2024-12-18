const fs = require("fs");
const path = require("path");

// Paths
const configPath = path.join(__dirname, "src", "assets", "config.json"); // Updated to point to 'src/assets/config.json'
const outputPath = path.join(__dirname, "src", "assets", "config.runtime.json"); // Writing to 'src/assets/config.runtime.json'

// Environment variables
const config = {
  firebaseConfig: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  },
};

try {
  // Check if config.json exists in the src/assets folder
  if (!fs.existsSync(configPath)) {
    console.error(`Error: config.json not found at ${configPath}`);
    process.exit(1);
  }

  // Assuming you're modifying the config with environment variables
  const jsonContent = JSON.stringify(config, null, 2);

  // Write the modified config to the output path in src/assets
  fs.writeFileSync(outputPath, jsonContent, "utf8");
  console.log(`Config file successfully generated at ${outputPath}`);
} catch (err) {
  console.error("Error writing config.runtime.json:", err);
  process.exit(1);
}
