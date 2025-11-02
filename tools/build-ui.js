const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
  const outdir = path.resolve(__dirname, '..', 'static');
  
  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir);
  }

  // Bundle the main display
  await esbuild.build({
    entryPoints: [path.resolve(__dirname, '..', 'src', 'frontend', 'index.js')],
    bundle: true,
    outfile: path.resolve(outdir, 'bundle.js'),
    platform: 'browser',
    format: 'iife',
    target: 'es2020',
    loader: { 
      '.js': 'jsx', 
      '.css': 'css',
      '.woff2': 'file',
      '.woff': 'file',
      '.ttf': 'file'
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  });

  // Create config directory
  const configOutdir = path.resolve(__dirname, '..', 'static-config');
  if (!fs.existsSync(configOutdir)) {
    fs.mkdirSync(configOutdir);
  }

  // Bundle the config
  await esbuild.build({
    entryPoints: [path.resolve(__dirname, '..', 'src', 'frontend', 'config.js')],
    bundle: true,
    outfile: path.resolve(configOutdir, 'config.js'),
    platform: 'browser',
    format: 'iife',
    target: 'es2020',
    loader: { 
      '.js': 'jsx', 
      '.css': 'css',
      '.woff2': 'file',
      '.woff': 'file',
      '.ttf': 'file'
    },
    define: {
      'process.env.NODE_ENV': '"production"'
    }
  });

  // Copy HTML files
  fs.copyFileSync(
    path.resolve(__dirname, '..', 'src', 'frontend', 'index.html'),
    path.resolve(outdir, 'index.html')
  );

  fs.copyFileSync(
    path.resolve(__dirname, '..', 'src', 'frontend', 'config.html'),
    path.resolve(configOutdir, 'index.html')
  );

  // Copy CSS files
  fs.copyFileSync(
    path.resolve(__dirname, '..', 'src', 'frontend', 'config.css'),
    path.resolve(configOutdir, 'config.css')
  );

  console.log('Built UI -> static/ (main) + static-config/ (config)');
}

build().catch(err => { 
  console.error(err); 
  process.exit(1); 
});