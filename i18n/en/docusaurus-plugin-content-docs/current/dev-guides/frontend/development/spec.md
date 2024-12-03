---
sidebar_position: 16
---

# Development Standards

The development standards for this project have been extracted into an independent sub-repository. Developers can view the source code and make corresponding customizations in `packages/spec`. The following sections introduce the usage and basic standards.

## Getting Started

### JavaScript Project Configuration:

```js
// .eslintrc.js
module.exports = {
  root: true,
  extends: [require.resolve("@milesight/spec/src/eslint-config/base")],
};
```

### TypeScript Project Configuration:

```js
// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    require.resolve("@milesight/spec/src/eslint-config/base"),
    require.resolve("@milesight/spec/src/eslint-config/typescript"),
  ],
};
```

### React + TypeScript Project Configuration:

```js
// .eslintrc.js
module.exports = {
  root: true,
  extends: [
    require.resolve("@milesight/spec/src/eslint-config/base"),
    require.resolve("@milesight/spec/src/eslint-config/react-typescript"),
  ],
};
```

### Stylelint Configuration:

```js
// .stylelintrc.js
module.exports = {
  extends: require.resolve("@milesight/spec/src/stylelint-config"),
};
```

### Prettier Configuration:

```js
// .prettierrc.js
module.exports = require("@milesight/spec/src/prettier-config");
```

### Commitlint Configuration:

```js
// .commitlintrc.js
module.exports = require("@milesight/spec/src/commitlint-config");
```
