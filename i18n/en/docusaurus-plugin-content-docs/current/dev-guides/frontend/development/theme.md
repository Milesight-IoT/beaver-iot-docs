---
sidebar_position: 12
---

# Theme Customization

The MUI component library provides a comprehensive theme customization solution. However, strictly following this solution means we can only use the CSS-in-JS approach for handling multi-theme styles. This can be less flexible in certain scenarios, and developers need to familiarize themselves with a new style handling approach. Therefore, our current multi-theme solution supports both CSS Variables and CSS-in-JS. The multi-theme service in the system handles the differences and compatibility issues between these two approaches and exposes necessary interfaces to assist with rapid business development.

The following sections introduce various ways to handle multi-theme requirements in the application.

## CSS Variables

```less
/** style.less */
body {
  // Custom CSS variable
  background-color: var(--body-background);
  // MUI palette variable
  background-color: var(--mui-palette-background-default);
}
```

In the above example, the `--mui-palette-background-default` variable is provided by the MUI palette. The Theme service does not extend this palette with tokens; the available tokens can be found in the official documentation. The `--body-background` is a custom variable that can be added as needed (ensure it adheres to the appropriate naming and usage conventions).

## CSS-in-JS

```tsx
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomElem = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  "&:hover": {
    backgroundColor: theme.palette.common.black,
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  "&:hover": {
    backgroundColor: theme.palette.common.black,
  },
}));

const Box2 = () => <Box sx={{ bgcolor: "background.default" }} />;

const Box3 = () => (
  <Box sx={(theme) => ({ bgcolor: theme.palette.background.default })} />
);
```

## Summary

The main difference between these two approaches is that CSS-in-JS can only use MUI palette tokens, whereas CSS Variables can use both MUI palette tokens and custom variables. Because the CSS-in-JS approach can increase runtime overhead and impact application performance, it is currently recommended to use it only for handling global issues. For business development, the CSS Variables approach is still recommended.
