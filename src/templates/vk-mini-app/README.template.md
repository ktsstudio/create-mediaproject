# vk-mini-app <%= projectName %>

### Technologies

- React
- Typescript
- Webpack 5 + Babel
- MobX
- React-router
- CSS Modules with babel-plugin
- Eslint + Prettier
- Dockerfile + nginx config for deploy

### Project structure

```
/src
|--/components <- shared components
|--/config <- common configs
|--/img <- images
|--/pages <- pages
|--/store <- mobx stores & models
|--/styles <- global styles & fonts
|--/types <- global types
|--/utils <- some utils
```

### Project description

On start (index.tsx) it will collect [vk app start params](https://vk.com/dev/vk_apps_docs3?f=6.%2B%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%2B%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%B0) and call [VKWebAppInit](https://vk.com/dev/vkbridge/vkwebappinit).

In [App](src/templates/vk-mini-app/src/App.tsx) component you can find Root Component and [Splash Screen](src/templates/vk-mini-app/src/pages/Splash/Splash.tsx). Splash screen is used to preload all project images and make login api calls in [UserStore](src/templates/vk-mini-app/src/store/UserStore.ts). After that [Root](src/templates/vk-mini-app/src/pages/Root/Root.tsx) component will be shown. It contains [VKUI views and panels](https://vkcom.github.io/VKUI/#section-%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%BE%D0%B2) for navigation.

Navigation in project uses [react-router](https://reactrouter.com/web/guides/quick-start) and handles active VKUI View and Panel in URL by specifying following format: `/activeView/activePanel`. Be careful, there must always be and active view and panel according to VKUI documentation.

For global data project uses [MobX](https://mobx.js.org/). There is a [RootStore](src/templates/vk-mini-app/src/store/RootStore.ts) that contains any other stores of project. For example there is [UserStore](src/templates/vk-mini-app/src/store/UserStore.ts).

### Available scripts

```
yarn start # start dev mode
yarn build # build production bundle
```
