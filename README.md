# Todo and Weather API

An API to manage a Todo list and request weather conditions, using nextjs and swagger. 

Includes unit tests and end-to-end
tests for the API.

---

## Prerequisites

- Node.js (>= 20.x) [preferably 22.x]
- npm (>= 6.x) [preferably 10.x]

---

## Installation

### Clone the repository:

```
git clone git@github.com:Charl88/givengain-challenge.git
cd givengain-challenge
```

### Install the dependencies:

```
npm install
```   

---

## Running the Application

### Environment Variables

Create a .env file in the root directory and add the following environment variables:

```plaintext
WEATHER_API_KEY=your_weather_api_key
WEATHER_API_URL=https://api.openweathermap.org/data/3.0/onecall
```

Please contact me for an API key if needed.

### Start the application:

```
npm run start
```

The application will be running at http://localhost:3000.

---

## API Documentation
The Swagger/OpenAPI documentation is available at http://localhost:3000/api once the API is running locally. 

For testing purposes, use [basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) with the following credentials:

```plaintext
Username: testuser
Password: testpassword
```

---

## Running Tests

### Run unit tests:

```
npm run test
```

### Run only the end-to-end tests:

```
npm run test:e2e
```

### Run test coverage:

```
npm run test:cov
```

---

## Project Structure
`src/main.ts`: Entry point of the application.

`src/app.module.ts`: Main application module.

`src/todos`: Contains the Todo feature modules, controllers, services, and DTOs.

`src/weather`: Contains the Weather feature modules, controllers, services, and DTOs.

`src/common`: Contains common filters, interceptors, and other shared utilities.

---

## TODO:
I would have liked to add some more robust error handling and validation on the weather endpoint. I felt that in
the interest of time, I would rather focus on the core functionality of the API, and leave this as a future improvement.
Ideally, the user does not need to know the exact error message from the weather API as it may give away sensitive information, but rather a more user-friendly version should be shown.
It would therefore need a mapping mechanism and a deeper investigation into the types of errors that can be returned.