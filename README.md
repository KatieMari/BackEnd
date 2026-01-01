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
``` ts
GET /
```
- Returns a simple responce to confirm the server is running

Responce
```JSON
{ "message": "Hello World!" }
```

---

## Water FootPrint Calculation

```ts
POST /api/calculate
```

Accepts user water usage data and returns and estimated daily footprint

Example request body:
```JSON
{
  "showersPerWeek": 7,
  "avgShowerMinutes": 10,
  "laundryLoadsPerWeek": 3,
  "diet": "balanced"
}
```
Example Responce:
```JSON
{
  "totalLitresPerDay": 140,
  "breakdown": {
    "showerLitres": 100,
    "laundryLitres": 40,
    "dietMultiplier": 1
  },
  "advice": [
    "Try shorter showers to reduce water use.",
    "Your diet has a moderate water impact."
  ]
}
```

---

## Contribution Rules

The following conventions are used throughout the backend codebase

### Coding Style

- Use **TypeScript** for all source files
- Use `export deault` where appropiate
- Use **camelCase** for variables and functions
- Use **PascalCase** for types, interfaces, and models

---

## Data Handling

- Request bodies are validated through type conversion
- Numeric values are safely converted using `Number()`
- Default values are applied where required
- Calculations are isolated from **Express** routing logic

---

## Dependencies


---

## Useful Links
- [Express Documentation](https://devdocs.io/express/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
