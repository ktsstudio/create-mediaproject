# Медиапроект <%= projectName %>

### Технологии

- React
- Typescript
- Webpack 5 + Babel
- MobX
- React-router v6
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
|--/static <- папка со статикой, которая копируется при сборке
|--/store <- mobx-сторы
|--/styles <- глобальные стили и переменные
|--/types <- глобальные типы
|--/utils <- утилиты
|--App.tsx <- главный компонент приложения
|--index.html
|--index.tsx <- точка входа в приложение
```

### Описание проекта

На старте в [index.tsx](src/index.tsx) рендерится главный компонент приложения [App](src/App.tsx). Внутри него расположен компонент [Root](src/pages/Root/Root.tsx), который отвечает за роутинг и рендер страниц приложения. Навигация осуществляется с помощью [react-router v6](https://reactrouter.com/docs/en/v6/getting-started/tutorial). Все пути приложения хранятся в [конфиге](src/config/routes.ts), а в компоненте Root описывается их структура. Также к проекту подключен [MobX](https://mobx.js.org/), которые создает глобальный стор [RootStore](src/store/RootStore.ts), который может содержать любые подсторы.

### Основные скрипты

* Запуск dev-сервера:
```
yarn dev
```

* Сборка:
```
yarn build
```

* Запуск ts:

```
yarn ts-check
```

* Запуск eslint:

```
yarn lint-fix
```

* Запуск prettier:

```
yarn codestyle-fix
```
