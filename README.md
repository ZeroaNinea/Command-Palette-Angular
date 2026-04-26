# Command Palette Angular

This repository contains a tutorial how to create a custom, reusible and customizable command palette in Angular.

There are two main components here `ColorInput` and `CommandPalette`. Currently I've implemented only the `ColorInput` component. It's a part of the color theme generation logic in the `app.ts` file. I used this component six times to generate six color palettes for the application. The `ColorInput` component uses the colors generated with its help for its own design.

## `angular-cli-phpages` for Deployment

I used the `angular-cli-phpages` module for deployment.

```bash
npm install -g angular-cli-ghpages
```

```bash
ng build --base-href="https://ZeroaNinea.github.io/Command-Palette-Angular/"
```

```bash
npx angular-cli-ghpages --dir=dist/Command-Palette-Angular/browser
```

## Links

- Medium (Part 1): [https://medium.com/@heghine.dev357/creating-a-command-palette-component-in-angular-part-1-466a8f2dd7f5](https://medium.com/@heghine.dev357/creating-a-command-palette-component-in-angular-part-1-466a8f2dd7f5)
- Dev.to (Part 1): [https://dev.to/zeroaninea_8bec34a4e7d029/creating-a-command-palette-component-in-angular-part-1-bh1](https://dev.to/zeroaninea_8bec34a4e7d029/creating-a-command-palette-component-in-angular-part-1-bh1)
- Medium (Part 2): [https://medium.com/@heghine.dev357/creating-a-command-palette-component-in-angular-part-2-708e32fd4d06](https://medium.com/@heghine.dev357/creating-a-command-palette-component-in-angular-part-2-708e32fd4d06)
- Dev.to (Part 2): [https://dev.to/zeroaninea_8bec34a4e7d029/creating-a-command-palette-component-in-angular-part-2-2em6](https://dev.to/zeroaninea_8bec34a4e7d029/creating-a-command-palette-component-in-angular-part-2-2em6)
