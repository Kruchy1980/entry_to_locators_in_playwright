# entry_to_lokators_in_playwright

Repository which contains some base informations about locators and their usage in Playwright

# Instalation and initialization of repo

1. Install Playwright with one browser only run in proper folder command: `npm init playwright@latest --yes "--" . '--quiet' '--browser=chromium'`
2. Install node plugins: `npm i` or `npm install`
3. Husky plugin adding: `npm install husky --save-dev`
4. Husky initialization husky to project (new project only): `npx husky init`

## Proper initialized pre-commit file content

```typescript
`npm run lint`;
```

## Other pre commit commands can be added as following (Remember to prepare the proper scripts in package.json)

```json
    "format": "npx prettier -c *.ts --write .",
    "format:check": "npx prettier . --check \"!**.ts\"",
    "lint": "npx eslint . --max-warnings=0",
```

### Than add the runners to husky file to final view

```typescript
npm run lint
npm run format
npm run format:check
```
