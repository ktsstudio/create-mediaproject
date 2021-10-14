# create-mediaproject
CLI for creating a React-based application.

It will setup new project with:
* React
* Typescript
* Webpack 5 + Babel
* MobX
* React-router
* CSS Modules with babel-plugin
* Eslint + Prettier
* Dockerfile + nginx config for deploy

### Install
Install globally:

`npm i -g @ktsstudio/create-mediaproject` 

### Usage

In command line: `create-mediaproject`

```
$ create-mediaproject --help
Options:
      --version   Show version number                                  [boolean]
  -d, --dir       Project directory (also name)                         [string]
  -t, --template  Template name                                         [string]
      --dev       Dev mode                                             [boolean]
  -h, --help      Show help                                            [boolean]
```

It will ask several questions:
```
? Select project type vk-mini-app
? Project name my-project
```

For now there is only one project type available: [vk mini apps](https://vk.com/dev/vk_apps_docs)

After that you will have project in specified directory with git initialized and dependencies installed.

### Dev Mode
* Setup new project at temorary directory 'dev'
* Run 'yarn dev'
* Watch src/templates/<%templateName%> content and copy to temporary directory

### Project structure
Project description and file structure described in template's readme.
* [vk-mini-app template](dist/templates/vk-mini-app/README.template.md)

#### Proposals & feedback
Please, fell free to write on [hello@ktsstudio.ru](mailto:hello@ktsstudio.ru) with theme "create-mediaproject feedback"