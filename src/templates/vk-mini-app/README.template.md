# vk-mini-app <%= projectName %>

### Технологии

- React
- Typescript
- Webpack 5 + Babel
- MobX
- React-router
- CSS Modules with babel-plugin
- Eslint + Prettier
- styled-components

### Структура проекта

```
/src
|--/components <- общие компоненты
|--/config <- общие конфиги
|--/img <- общие картинки
|--/pages <- компоненты-страниц приложения
|--/store <- mobx-сторы
|--/styles <- глобальные стили и переменные
|--/types <- глобальные типы
|--/utils <- утилиты
|--App.tsx <- главный компонент приложения
|--index.html
|--index.tsx <- точка входа в приложение
```

### Описание проекта

На старте в [index.tsx](src/index.tsx) вызывает [VKWebAppInit](https://vk.com/dev/vkbridge/vkwebappinit) и инициализирует [параметры запуска vk-mini-app](https://vk.com/dev/vk_apps_docs3?f=6.%2B%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B%2B%D0%B7%D0%B0%D0%BF%D1%83%D1%81%D0%BA%D0%B0). В главном компоненте [App](src/App.tsx) создаются компонент [Root](src/pages/Root/Root.tsx) (отвечает за роутинг и рендер страниц приложения) и экран загрузки [Splash](src/pages/Splash/Splash.tsx) (отвечает за предзагрузку ресурсов и авторизацию). [Root](src/pages/Root/Root.tsx) будет отрендерен только после того, как будет выполнена вся логика в [Splash](src/pages/Splash/Splash.tsx). Внутри [Root](src/pages/Root/Root.tsx) осуществляется навигация с использованием [VKUI views & panels](https://vkcom.github.io/VKUI/#section-%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%BE%D0%B2) и [react-router](https://reactrouter.com/web/guides/quick-start). Навигация реализована с помощью самописной обертки над react-router'ом, которая лежит в [src/utils/router](src/utils/router).
URL'ы для страниц создаются в следующем формате: `/view/panel`. Вью и панели приложения хранятся в [конфиге](src/config/routes) в виде enum. Так же к проекту подключен [MobX](https://mobx.js.org/), которые создает глобальный стор [RootStore](src/store/RootStore.ts), который может содержать любые подсторы.

### Основные скрипты

* Запуск dev-сервера:
```
yarn start
```

* Сборка:
```
yarn build
```

* Сборка [odr-архива](https://vk.com/dev/_vk_apps_docs_ios_odr): 
```
yarn build-zip
```

* Запуск eslint:

```
yarn lint-fix
```

* Запуск prettier:

```
yarn codestyle-fix
```


* Запуск ts:

```
yarn ts-check
```