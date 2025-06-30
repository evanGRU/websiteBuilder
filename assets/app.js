import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from 'react-router-dom';

function Home() {
    return <h1>Accueil</h1>;
}

function About() {
    return <h1>À propos</h1>;
}

function NotFound() {
    return <h1>Page non trouvée</h1>;
}

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Accueil</Link> | <Link to="/about">À propos</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* Route pour page 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
