# Tomatino
A simple cross platform [pomodoro](https://en.wikipedia.org/wiki/Pomodoro_Technique) timer app built with Electron and Vue 

## Getting started

First, clone the repo via git and install dependencies:

```bash
git clone https://github.com/javjimb/electron-pomodoro your-project-name
cd your-project-name
npm install
```

## Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
npm run electron:serve
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run electron:build
```

## Built With

-   [Electron](https://www.electronjs.org/) 
-   [Vue.js](https://vuejs.org/)

## Author
[Javier Jimenez Blasco](https://github.com/javjimb)
