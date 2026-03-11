import { renderToString } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import AllPizzaPage from '../pages/AllPizza';
describe('App', () => {
    it('tartalmazza a Vite szöveget', () => {
        const html = renderToString(<AllPizzaPage />);
        expect(html).toContain('Margherita');
    });
});