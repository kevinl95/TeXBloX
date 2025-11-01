import Resolver from '@forge/resolver';

const resolver = new Resolver();

// Minimal resolver — we simply pass the formula through to the Custom UI.
resolver.define('getFormula', async (req) => {
    const { formula = '' } = req.payload || {};
    return { formula };
});

export const handler = resolver.getDefinitions();