import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('resolver', async (req) => {
    console.log('TeXBloX resolver request:', JSON.stringify(req, null, 2));
    
    const { context } = req;
    
    // Try multiple ways to get the formula
    let formula = 'E = mc^2';
    let source = 'default';
    
    if (context?.extension?.macro?.parameters?.formula) {
        formula = context.extension.macro.parameters.formula;
        source = 'macro.parameters';
    } else if (context?.extension?.config?.formula) {
        formula = context.extension.config.formula;
        source = 'config';
    }
    
    console.log(`Resolver: formula="${formula}" from ${source}`);
    
    return { 
        success: true,
        formula: formula,
        source: source,
        message: 'TeXBloX resolver active',
        debug: {
            hasParameters: !!context?.extension?.macro?.parameters,
            hasConfig: !!context?.extension?.config,
            extension: context?.extension
        }
    };
});

export const handler = resolver.getDefinitions();