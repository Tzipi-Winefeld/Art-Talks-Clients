# Project Setup Instructions

This project includes both a server and a client. Follow these instructions to set up and run the project locally.

## Getting Started

1. **Extract the ZIP file**:  
   Extract the contents of the ZIP file to a directory on your computer.

2. **Open the Project Directory**:  
   Open a terminal and navigate to the root project directory.

3. **Install Node.js and npm**:  
   Make sure you have Node.js installed (version 14 or higher). You can download Node.js from [https://nodejs.org/](https://nodejs.org/).  
   npm (Node Package Manager) is included with Node.js, so it should already be installed.

4. **Install Dependencies for Both Server and Client**:  
   In the root directory, run the following commands to install dependencies for both the server and the client:

   ```bash
   cd art-talks-server
   npm install
   cd art-talks-client
   npm install
   ```

5. **Running the Server and Client**:  
    After installing dependencies, open two separate terminal windows:

   ```bash
   cd art-talks-server
   node server.js
   cd art-talks-client
   npm start
   ```
