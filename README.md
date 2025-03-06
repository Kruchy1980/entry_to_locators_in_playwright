# entry_to_locators_in_playwright

Repository which contains some base information's about locators and their usage in Playwright

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

## Detailed information's about that course other than setting env and base commands are described in _Description.md_ file

# CDP links:

1. Official Chrome Network manager docs: ***https://github.com/ChromeDevTools/devtools-frontend/blob/main/front_end/core/sdk/NetworkManager.ts***
2. Info about WebSockets (Genera;): ***https://www.diffusiondata.com/what-are-web-sockets-and-how-do-they-work/#:~:text=WebSockets%20are%20a%20protocol%20for,between%20the%20client%20and%20server.***
3. CDP Session & Playwright: ***https://playwright.dev/docs/api/class-cdpsession***
4. Official CDP URL: ***https://chromedevtools.github.io/devtools-protocol/***
5. Official performance Docs: ***https://developer.chrome.com/docs/devtools/performance-insights?hl=pl***
6. (Additional) Playwright with Mozilla Ff: ***https://playwright.dev/docs/browsers#firefox***

# How to read results of CDP Metrics - different docs and blogs links

1. Stackoverflow (metrics from pupepeter): ***https://stackoverflow.com/questions/53723263/understanding-chrome-devtools-performance-getmetrics-results***
2.
