import { cp, mkdir, readdir } from 'node:fs/promises';
import { extname } from 'node:path';

const root=new URL('../',import.meta.url);
const output=new URL('../dist/',import.meta.url);
const extensions=new Set(['.html','.css','.js','.png','.svg','.webmanifest']);
const files=await readdir(root);
const websiteFiles=files.filter(file=>extensions.has(extname(file)));

// Sites development keeps web files in dist; GitHub Pages keeps them at the root.
// Copy root web assets when present so both layouts produce the same Android bundle.
if(websiteFiles.includes('index.html')){
  await mkdir(output,{recursive:true});
  await Promise.all(websiteFiles.map(file=>cp(new URL(`../${file}`,import.meta.url),new URL(`../dist/${file}`,import.meta.url))));
  console.log(`Prepared ${websiteFiles.length} website files in dist/`);
}else{
  console.log('Using the existing dist/ website files.');
}
