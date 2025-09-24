# CrewAI Agent Orchestrator (Latest)
A polished React + Tailwind + shadcn/ui component to orchestrate CrewAI agents (Researcher, Writer, Summarizer, Reviewer, Emailer, Delivery).

## Quick Start (drop-in)
1) Copy `src/CrewAIAgentOrchestrator.tsx` into your app (e.g. Next.js, Vite, CRA).
2) Ensure **Tailwind** and **shadcn/ui** are installed and the `@/components/ui/*` aliases resolve in your project.
3) Install peer deps if missing:
   ```bash
   npm i framer-motion lucide-react
   ```
4) Render the component:
   ```tsx
   import CrewAIAgentOrchestrator from "@/components/CrewAIAgentOrchestrator"; // or correct path
   export default function Page(){ return <CrewAIAgentOrchestrator/>; }
   ```

## Hook up your backend
Replace the mocked `runAgent` implementation with your API call. The component POSTs: `{ prompt, agent, execution, temperature, maxTokens, email }` and expects `{ output, latencyMs }`.

## Notes
- Right pane supports horizontal + vertical scrolling; results grid has `min-w-[1100px]` to enable horizontal scroll.
- Left controls are sticky under the header.
- If you don't use shadcn/ui, swap imports with your own UI components or basic HTML elements.




<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
``` -->
