## Before starting app

Create .env file at project root and add env variable.\
`REACT_APP_APPID=OPENWEATHER_API_KEY`

## To start application

`npm install`\
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Documentation

weather result from open weather api is stored in state of root app component.\
weather result is passed down as prop to WeatherData component to display information

search history stored using a custom hook in root app component with past history recovered from browser local storage\
search history will persists if user closes the app\
search history will be passed down as props to SearchHistory component

