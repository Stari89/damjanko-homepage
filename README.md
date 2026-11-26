## damjanko-homepage

Live page: [damjanko.com](https://damjanko.com)

- [`v1/`](v1): the current site (Create React App). This is what is deployed.
- [`v2/`](v2): the rewrite, in progress.

### Running v1

```
cd v1
npm install
npm run build
```

`npm start` does not work on current Node versions; the old dev server crashes. Build instead and serve the `v1/build` folder with any static server.
