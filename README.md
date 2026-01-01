# My Water FootPrint - BackEnd

This is the **BackEnd** API of the **My Water FootPrint** project.

 The **BackEnd** is responsible for processing user input from the **FrontEnd**, calculating an estimated daily water footprint, and returning structured results and personalised advice.

---

## Project Purpose

The **BackEnd** provides:
- A REST API for calculating water usage
- Core calculation logic for showers, laundry, and diet impact
- Structured JSON responces used by the **FrontEnd**
- Seperation of concerns between logic and presentation

The **BackEnd** does not render UI, it strictly handles data and business logic

---

## Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **CORS** - cross-origin request handling
- **Body-Parser** - request body parsing
- **Mongoose** - data modelling 

---

## Getting Started

1. Install Dependancies

    ```bash
    npm install
    ```

2. Start the development server
    ```bash
    npm run dev
    ```

- The API will run on:
    - http://localhost:3000

---

## Folder Structure

This list contains the main folders and files for the **BackEnd**.

- Src/ -> contains all the **BackEnd** source code 

    - Routes/ -> API route definitions
        - `calculate.ts` -> Handles water footprint calculations and responces
    
    - Models/ -> Data models
        - `Submission.ts` -> Mongoose schema for storing calculation submissions
    
    - `Server.ts` -> application entry point
        - configures middleware and routes
        - starts the **Express** server

---

## API Endpoints

Health Check
```html
GET /
```



