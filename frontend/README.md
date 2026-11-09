# Installing

Requires [Node.js](https://nodejs.org/) `^20.19 || >=22.12` (needed by Vite). From the `frontend/` directory:

```
npm install
```

This installs all dependencies from `package-lock.json` into `node_modules/`.

# Running locally

`npm run dev` - TODO: enable cors since backend is on different port. or setup dev forwarding.

# Running in Production

`npm run build` - TODO: set up the Flask backend to server the production code

# Notes

Created a react app with Vite, Typescript and NPM using `npm create vite@latest . --`.

- Chose Typescript without the React Compiler, since this is just for a takehome assignment.
- Chose ESLint since it's most widely used