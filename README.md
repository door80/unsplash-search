# Unsplash Photo Search

This is a simple app that uses the Unsplash API to search for photos. It was built using Next.js 13 (app router), with Typescript, CSS Modules, React Query and `unsplash-js` for easy API access and type definitions.

You can search for any term by typing in the search box and hitting enter or clicking the "Search" button. You will see pages of results, which get cached to reduce the number of API calls, and make for quick navigation between pages.

You can also filter the results by color, by clicking on the filter dropdown next to the search box. This will filter the results to only show photos that have the selected color as the dominant color. You can also sort the results by `relevant`, `latest` or `editorial` by clicking on the sort dropdown.

Some consideration has been given to the results of the API calls, and the app will display a loading state during the fetching of data, and a message if there are no results, or if there is an error.

## Setup

Clone the repo and install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser, and tada 🎉.

## Testing

I've added some basic integration testing to make sure that we display the various states of the data correctly, and the pagers work as expected. To run the tests, run:

```bash
npm run test
```
