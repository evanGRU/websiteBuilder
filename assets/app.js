import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return <h1>Hello React in Symfony!</h1>;
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
