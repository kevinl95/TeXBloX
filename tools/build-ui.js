const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
  const outdir = path.resolve(__dirname, '..', 'static');
  
  if (!fs.existsSync(outdir)) {
    fs.mkdirSync(outdir);
  }

  // Bundle the frontend entry
  await esbuild.build({
    entryPoints: [path.resolve(__dirname, '..', 'src', 'frontend', 'index.js')],
    bundle: true,
    outfile: path.resolve(outdir, 'bundle.js'),
    loader: { 
      '.js': 'jsx', 
      '.css': 'css',
      '.woff2': 'file',
      '.woff': 'file',
      '.ttf': 'file'
    }
  });

  // Copy index.html into project root so Forge can serve it from static
  fs.copyFileSync(
    path.resolve(__dirname, '..', 'src', 'frontend', 'index.html'),
    path.resolve(outdir, 'index.html')
  );

  console.log('Built UI -> static/');
}

build().catch(err => { 
  console.error(err); 
  process.exit(1); 
});