export const PROJECT_ROOT = {
  name: 'my-app',
  type: 'folder',
  children: [
    {
      name: 'src',
      type: 'folder',
      children: [
        {
          name: 'App.jsx',
          type: 'file',
          language: 'jsx',
          content: `import { useState } from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>Hello, React!</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}

export default App
`,
        },
        {
          name: 'main.jsx',
          type: 'file',
          language: 'jsx',
          content: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`,
        },
        {
          name: 'index.css',
          type: 'file',
          language: 'css',
          content: `body {
  margin: 0;
  font-family: sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}

button {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: #646cff;
  color: white;
  cursor: pointer;
}
`,
        },
      ],
    },
    {
      name: 'index.html',
      type: 'file',
      language: 'html',
      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,
    },
    {
      name: 'package.json',
      type: 'file',
      language: 'json',
      content: `{
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
`,
    },
    {
      name: 'vite.config.js',
      type: 'file',
      language: 'js',
      content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`,
    },
  ],
}

function collectFiles(node, path, acc) {
  const fullPath = path ? `${path}/${node.name}` : node.name
  if (node.type === 'file') {
    acc[fullPath] = { ...node, path: fullPath }
  } else {
    node.children.forEach((child) => collectFiles(child, fullPath, acc))
  }
  return acc
}

export const FILES_BY_PATH = collectFiles(PROJECT_ROOT, '', {})
export const DEFAULT_FILE_PATH = 'my-app/src/App.jsx'
