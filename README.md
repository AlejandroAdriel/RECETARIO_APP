# 🍳 Super Recetario

<div align="center">

![Expo](https://img.shields.io/badge/Expo-SDK_54-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Architecture](https://img.shields.io/badge/Architecture-Expo_Router-4630EB?style=for-the-badge&logo=expo&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

## 💡 Resumen del Proyecto

**Super Recetario** es una aplicación móvil nativa desarrollada con **React Native** y **Expo (SDK 54)**. Diseñada para organizar y descubrir recetas, ofrece una experiencia de usuario fluida con soporte para temas (Claro/Oscuro), autenticación segura y un sistema robusto de búsqueda y filtrado.

---

## 📑 Índice

- [Funcionalidades](#-funcionalidades)
- [Arquitectura Técnica](#-arquitectura-técnica)
- [Sistema de Diseño](#-sistema-de-diseño)
- [Guía de Instalación](#-guía-de-instalación)
- [Generación de APK (Android)](#-generación-de-apk-android)
- [Estructura del Proyecto](#-estructura-del-proyecto)

---

## 🚀 Funcionalidades

La aplicación cuenta con las siguientes funcionalidades:

### 1. 🏠 Feed de Recetas (Home)

Ubicación: `app/(tabs)/index.js`

- **Grid Adaptativo**: Utiliza `useWindowDimensions` para mostrar 2 o 3 columnas según el ancho del dispositivo.
- **Búsqueda Avanzada**: Barra de búsqueda integrada (`SearchBar`) para filtrar por nombre o ingredientes.
- **Filtros Compuestos**: Panel de filtros (`Filters.js`) que permite refinar por:
  - Tiempo de cocina (15-30, 30-45 mins, etc.)
  - Dificultad (Fácil, Media, Difícil)
  - Tipo de plato
  - Restricciones alimentarias

### 2. 🔐 Autenticación y Seguridad

Ubicación: `src/store/authContext.js`

- **Registro y Login**: Flujos completos conectados a una API REST.
- **Persistencia Segura**: Utiliza `expo-secure-store` para guardar el token de sesión (`recetario_session_v1`) y datos del usuario de forma encriptada.
- **Roles**: Soporte para roles de usuario (`admin` vs `user`).

### 3. ⭐ Sistema de Favoritos

Ubicación: `app/(tabs)/favorites.js`

- **Gestión Local**: Permite marcar/desmarcar recetas como favoritas.
- **Integración Global**: El estado de favorito se sincroniza en tiempo real entre el Home y la tarjeta de detalle (`RecipeCard`).

### 4. 💬 Comentarios

Ubicación: `src/components/Comments.js`

- **Interacción Social**: Los usuarios autenticados pueden leer y publicar comentarios en las recetas.

### 5. ⚙️ Panel de Administración

Ubicación: `app/admin`

- Funcionalidad dedicada para usuarios con rol `admin` para la gestión de contenido.

---

## 🏗️ Arquitectura Técnica

### Stack Principal

- **Framework**: Expo SDK 54 (`~54.0.27`).
- **Navegación**: [Expo Router v6](https://docs.expo.dev/router/introduction/) (Routing basado en archivos).
- **Componentes**: React Native 0.81.
- **HTTP Client**: `fetch` nativo encapsulado en `src/services/api.js`.

### Gestión de Estado (`src/store`)

- **`AuthContext`**: Gestiona el ciclo de vida de la sesión (Login/Logout/Validación).
- **`ThemeContext`**: Controla el cambio entre modo Claro y Oscuro.

---

## 🎨 Sistema de Diseño

El diseño se maneja a través de tokens semánticos definidos en `src/constants/Colors.js` y consumidos vía `useThemeColor`.

- **Modo Oscuro/Claro**: La app responde automáticamente a la configuración del sistema.
- **Componentes Clave**:
  - `RecipeCard`: Componente visual principal con soporte de imágenes y badge de favoritos.
  - `SearchBar`: Input estilizado con botones de acción.
  - `Comments`: Lista optimizada para lectura.

---

## 📱 Generación de APK (Android)

Comando verificado en `package.json` y logs de construcción:

1.  **Instalar EAS CLI**:
    ```bash
    npm install -g eas-cli
    ```
2.  **Compilar**:
    ```bash
    npx eas-cli build -p android --profile apk
    ```

---

## 💻 Guía de Instalación

1.  **Clonar**:

    ```bash
    git clone https://github.com/AlejandroAdriel/RECETARIO_APP
    cd SuperRecetario/App
    ```

2.  **Instalar**:

    ```bash
    npm install
    # Si hay advertencias de peer dependencies:
    npx expo install --fix
    ```

3.  **Ejecutar**:
    ```bash
    npx expo start
    ```

---

## 📂 Estructura del Proyecto

Estructura validada:

```text
App/
├── app/                    # Rutas (Screens)
│   ├── (tabs)/             # [index, favorites, account]
│   ├── admin/              # Panel Admin
│   ├── recipe/             # [id].js (Detalle)
│   └── _layout.js          # Configuración de Stack
│
├── src/
│   ├── components/         # [RecipeCard, SearchBar, Comments, Filters]
│   ├── constants/          # [Colors, avatars, theme]
│   ├── context/            # (No existe, movido a store)
│   ├── hooks/              # [useThemeColor]
│   ├── services/           # [api.js]
│   └── store/              # [authContext, themeContext]
│
└── assets/                 # Recursos estáticos
```
