# Website

Beaver IoT online [Document](https://www.milesight.com/beaver-iot/).

This website is built using [Docusaurus](https://docusaurus.io/).

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Problems

Using Markdown's '**' for bolding may cause issues in some language characters. Please use the regular expression `\*\*(.*?)\*\*` to replace it with `<b>$1</b>`.
