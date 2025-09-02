## Configurar inicio de sesión con Google

1. Crea un OAuth 2.0 Client ID en Google Cloud Console (tipo Web).
2. Agrega tu dominio/origen a Authorized JavaScript origins (p. ej. http://localhost:5173).
3. Crea un archivo `.env` en la raíz del proyecto con:

```
VITE_GOOGLE_CLIENT_ID=tu_client_id_de_google.apps.googleusercontent.com
```

4. Reinicia el servidor de desarrollo para que Vite lea las variables.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
