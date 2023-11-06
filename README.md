# DHIS2 Test Project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and TailwindCSS. Here's the [link](https://dhis2.vercel.app) to the app.

### How to test the app
```yarn test```

### Initial/Supposed implementation
- Use TailwindCSS for styling - the DHIS2UI `@types` wasn't successfully installed via yarn; decided to use the next minimalistic framework there is!
- Fetch the list of dashboards from the API on page load.
- Fetch each dashboard data on click and save in a cache to avoid unnecessary endpoint(AJAX) requests.
- Fetch the list of dashboards with the filter query on filter. (e.g.: `/api/dashboards?type=map`).
- Call a PUT request to star a dashboard (this, of course, persists the starred dashboards in the database.).

### Decisions
- Fetch the list of dashboards from the API.
- Also, fetch each dashboard's data and save it in a cache.
  > Though this is expensive cause it makes a lot of AJAX calls at once. But since there are only 5 dashboards, this isn't all that expensive.
  
  > This decision was made because the filtering was done in the frontend so we need all the data available in the UI.
- Handle filtering from the frontend
  > This approach was taken because of the unavailability of the endpoint.
  
  > Utilized `react.memo` to cache components and avoid unnecessary re-rendering. 
- Include the star value (true or false) of each dashboard in `sessionStorage` to persist it on one's device.
- Handle the starring of dashboards by updating the `sessionStorage`, cache, and dashboard state!
  > This approach, even though it is a 3-step approach (updating cache, state, and sessionStorage), it's still a fast implementation as it would've been persisting on an actual database

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
