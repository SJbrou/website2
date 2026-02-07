---
layout: vscode.njk
title: "Understanding React Hooks"
description: "Deep dive into React Hooks and how they revolutionize state management in functional components."
date: 2026-01-20
tags: ["dev", "react", "javascript"]
---

## What are Hooks?

React Hooks are functions that let you "hook into" React state and lifecycle features from function components.

## useState Hook

The most commonly used hook is `useState`:

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## useEffect Hook

The `useEffect` hook handles side effects:

```javascript
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

## Custom Hooks

You can create your own hooks to reuse stateful logic:

```javascript
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  
  return [value, setValue];
}
```

Hooks make React code more reusable and easier to understand.
