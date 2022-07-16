# Monorepo

Testing yarn workspaces. All packages including the root folder is native ESM module.

# Technologies

- yarn workspaces
- TypeScript
- Server 
  - Express.js
- Web
  - Vite (vanilla)
- Common
  - Node.js
- API SDK
  - Axios (http client)

# Commands
Run `common` and `api-sdk` packages in watch mode
```bash
yarn lib:watch
```
Start dev server in watch mode
```bash
yarn server start
```
Start web client in watch mode
```bash
yarn web dev
```
Build all packages
```bash
yarn build
```
