# Vite React Boilerplate

This project is structured to offer a comprehensive starting point for React applications, leveraging Vite for enhanced development experience. The architecture is modular, facilitating easy expansion, maintenance, and understanding.

## Features

This boilerplate is equipped with a robust set of features and technologies designed to streamline the development of high-quality React applications:

- **React 18**: Leverages the latest React features, including concurrent mode, for building modern user interfaces with improved performance and developer experience.

- **Vite**: Utilizes Vite as the build tool, offering a fast, hot-reloading development environment and optimized production builds.

- **TypeScript**: Full TypeScript support for type-safe code, enhancing reliability and maintainability.

- **Chakra UI**: Incorporates Chakra UI for building accessible and responsive user interfaces with ease.

- **React Query**: Integrated for efficient, powerful server-state management in React applications, enhancing data fetching, caching, and synchronization.

- **React Router Dom**: For declarative routing in React, facilitating the development of single-page applications with dynamic, client-side routing.

- **Zod**: Implements Zod for schema declaration and validation, ensuring robust API data validation and error handling.

- **Framer Motion**: Integrated for adding smooth and complex animations to React apps, enhancing user interaction and engagement.

- **Testing Library & Vitest**: Configured for unit and integration testing, supporting a test-driven development (TDD) approach.

- **ESLint & Prettier**: Ensures code quality and consistency with ESLint for linting and Prettier for code formatting, set up with pre-configured rules.

- **Stylelint**: For CSS linting, ensuring style sheets are clean and consistent.

- **Husky & lint-staged**: Utilizes Husky for Git hooks and lint-staged for running linters on pre-committed files, preventing code quality issues.

## Project Structure

The project is organized into several key directories within the `src` folder, each serving a specific purpose:

### `src/modules`

Contains the core business logic of the application, divided into domain-specific modules. Each module encapsulates the functionality related to a particular domain (e.g., `Cryptocurrency`, `JsonPlaceholder`), including components, utilities, and API schema definitions using Zod for validation.

- **Cryptocurrency**: Implements features related to cryptocurrency data display and manipulation. Includes components like `CryptoDetail` and `CryptoList` for detailed views and listings, respectively.

- **JsonPlaceholder**: Demonstrates integration with the JsonPlaceholder API, showcasing how to fetch and display data in a structured format. Includes a component for displaying posts.

### `src/pages`

Hosts the main pages of the application, mapping directly to the routes. Each page is a React component that may incorporate multiple modules and shared components.

- **HomePage**: The landing page of the application, showcasing its main features.

- **JsonPlaceholderPage**: Page displaying posts fetched from the JsonPlaceholder API.

- **CryptocurrencyPage**: Dedicated page for cryptocurrency-related features.

### `src/shared`

Contains shared resources and utilities that can be used across the entire application, such as components, hooks, utilities, and constants.

- **components**: Reusable UI components like `Header`, `Footer`, `Layout`, and more, promoting a consistent look and feel across the app. These components form the basic building blocks of the application's user interface.

- **constants**: Contains application-wide constants that define configuration settings, API endpoints, and other reusable values. Centralizing constants in this manner aids in maintaining consistency and ease of updates.

- **context**: Implements React Context for global state management, allowing for state to be shared across components without prop drilling. Includes:

  - `GlobalContext.tsx` for defining the global context and its provider, enabling global state management and access.

- **hooks**: Custom React hooks for common functionalities, such as fetching data (`useGetApi`), managing global context (`useGlobalContext`), and others.

- **routes**: Defines the routing configuration for the application, utilizing React Router. This setup facilitates the mapping of URL paths to application pages, supporting navigation and deep linking.

- **test**: Houses testing utilities and setup configurations to support unit and integration testing of the application components and hooks. Includes:

  - `TestWrapper.tsx` for wrapping components in tests with necessary providers and configurations.

  - `setup.ts` for global test setup, including Jest configurations and mock implementations.

  - `mocks` directory for specific mock implementations like `matchMedia.ts` and `server.ts`, aiding in testing components that use media queries and network requests.

- **types**: Central location for TypeScript type definitions that are shared across the application. This directory helps in maintaining a clean and organized codebase, promoting type safety and reducing duplication.

- **utils**: Helper functions and utilities, including API interaction handlers (`api.ts`, `handleApiError.ts`) and local storage management (`handleLocalStorage.ts`).

## API Validation with Zod

API validation is an integral part of ensuring data integrity and consistency throughout the application. It is implemented using Zod, a TypeScript-first schema declaration and validation library.

In the `src/modules/<ModuleName>/schemas.ts` files, you'll find Zod schemas defining the expected structure and types of data received from API calls. These schemas are then used to validate the data at runtime, providing a robust mechanism to catch and handle data-related issues early in the development process.

For example, the `Cryptocurrency` module defines schemas for cryptocurrency data, ensuring each piece of data adheres to the specified structure before being processed or displayed in the UI.

## Available Scripts

In the project directory, you can run the following scripts defined in `package.json`:

### `pnpm dev`

Runs the app in the development mode.

### `pnpm build`

Compiles the TypeScript files and builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include the hashes.

### `pnpm preview`

Runs the built app in preview mode. After building the app using `pnpm build`, you can use this command to preview the production build locally.

### `pnpm lint`

Runs ESLint and Stylelint across your project for `.js`, `.jsx`, `.ts`, `.tsx`, and `.css` files. It identifies and reports on patterns found in ECMAScript/JavaScript code and CSS, with the aim of making code more consistent and avoiding bugs.

### `pnpm lint:fix`

Similar to `pnpm lint`, but attempts to fix any linting errors automatically.

### `pnpm format`

Runs Prettier to automatically format `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.css`, and `.md` files according to the project's style guidelines. This helps maintain consistency and readability across the codebase.

### `pnpm run test`

Runs tests with Vitest.

### `pnpm test:coverage`

Runs tests with Vitest and generates a coverage report. It provides insights into how much of your code is covered by tests.

### `pnpm component`

Utilizes `generate-react-cli` to scaffold a new React component. This command helps streamline the creation of new components by setting up a consistent structure automatically.

### `pnpm prepare`

Executes Husky, setting up Git hooks to ensure scripts like linting and testing are automatically run at appropriate times, such as before commits. This helps maintain code quality and prevent issues from being pushed to the repository.

## Conclusion

This boilerplate is designed to kickstart development of complex React applications, offering a structured yet flexible architecture. By leveraging modern tools and practices, it aims to provide a solid foundation that can be easily adapted to suit various project requirements.
