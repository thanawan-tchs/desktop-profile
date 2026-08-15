import { useState } from 'react'

// Mirrors vscodeProject.js's src/App.jsx + src/index.css — a real, running
// React component, not a screenshot, so the "npm run dev" preview actually works.
const MockDevPreview = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="flex h-full w-full flex-col items-center bg-white px-10 py-10 font-sans text-[#213547]">
      <h1 className="text-2xl font-bold">Hello, React!</h1>
      <p className="mt-2">You clicked {count} times</p>
      <button
        type="button"
        onClick={() => setCount((prev) => prev + 1)}
        className="mt-3 rounded-md border-0 bg-[#646cff] px-4 py-2 text-white"
      >
        Click me
      </button>
    </div>
  )
}

export default MockDevPreview
