# React + TypeScript + Vite 🚀

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration 🏁

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Achieved UIs 🛠️
## Login
This two images shows the login page and the result when trying to authenticate with wrong credantials . <br><br>
<div style="display: flex; justify-content: center;">
  <img src="/assets/login.png" width="250">
  <img src="/assets/error-login.png" width="250">
</div>

## Register
The pages show the test created each time a field input doesn't match the required input format. <br><br>
<div style="display: flex; justify-content: center;">
  <img src="/assets/register.png" width="250">
  <img src="/assets/error-register.png" width="250">
</div>

## Clients
### List
This page shows the list of all clients with a very reactive pagination and a posibility to view, delete and update each client or delete a  groupe of them. <br><br>
<div style="display: flex; justify-content: center;">
  <img src="/assets/clients.png" width="700">
</div>

### Client Informations
Additionally, we can view each client's profile along with all the required information.<br><br>
<div style="display: flex; justify-content: center;">
  <img src="/assets/client-informations.png" width="700">
</div>

### Temporarily removed clients
Furthermore, the project invloves a way to keep the deleted clients in saved place in case of needing to restore . <br><br>
<div style="display: flex; justify-content: center;">
  <img src="/assets/removed-clients.png" width="700">
</div>

## Services
The interfaces is showing a list of services existed with very insightful informations about each. <br><br>
<div style="display: flex; justify-content: center;">
  <img src="/assets/services.png" width="700">
</div>

## Schedule 
This page shows the schedule that contains informations about meetings with clients. <br><br>
<div style="display: flex; justify-content: center;">
  <img src="/assets/schedule.png" width="700">
</div>

# Frontend with React 💡
### Description:
React.js is a JavaScript library used to create dynamic and responsive user interfaces for web and mobile applications.  

### Role in the Project: 
In the **BizServe** project, React.js was used to develop an **admin dashboard** that controls API data. This dashboard allows administrators to manage **users, roles, services, client payments, and schedules**. With this interface, administrators can efficiently monitor and manage all system operations.
