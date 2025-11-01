import Resolver from '@forge/resolver';

const resolver = new Resolver();

// Pass the formula from macro parameters to the Custom UI
resolver.define('getFormula', async (req) => {
    console.log('Resolver request:', req);
    
    // Extract formula from macro parameters
    const formula = req.context?.extension?.macro?.parameters?.formula || 'E = mc^2';
    
    return { formula };
});

export const handler = resolver.getDefinitions();