const fs = require('fs');
const path = require('path');
const glob = require('glob');

const absRootDir = '../';
const staticDir = path.join(__dirname, absRootDir, 'static/');
const excludedStaticFile = new Set([
  path.join(staticDir, 'img/icon.svg'), // logo svg
]);

const searchDirs = [
  path.join(__dirname, absRootDir, 'docs'), // zh-Hans
  path.join(__dirname, absRootDir, 'i18n'), // other langs
  path.join(__dirname, absRootDir, 'src'), // codes
];
const additionalSearchFiles = [
  path.join(__dirname, absRootDir, 'docusaurus.config.ts'), // config file
];

function getAllImageFiles(dir) {
  return glob
    .sync('**/*.{png,jpg,jpeg,gif,svg,webp}', { cwd: dir, absolute: true })
    .filter(file => !excludedStaticFile.has(file));
}

const fileCache = {};

function getAllSourceFiles(dirs) {
  let files = [];
  dirs.forEach(dir => {
    files = files.concat(glob.sync('**/*.{md,mdx,js,jsx,ts,tsx}', { cwd: dir, absolute: true }));
    files.forEach(file => fileCache[file] = fs.readFileSync(file, 'utf8'))
  });

  files = files.concat(additionalSearchFiles);
  additionalSearchFiles.forEach(file => {
    fileCache[file] = fs.readFileSync(file, 'utf8');
  });

  return files;
}

function isImageUsed(imageFile, sourceFiles) {
  const imageName = imageFile.slice(staticDir.length);
  for (const file of sourceFiles) {
    const content = fileCache[file];
    if (content.includes(imageName)) {
      return true;
    }
  }
  return false;
}

const images = getAllImageFiles(staticDir);
const sources = getAllSourceFiles(searchDirs);

images.forEach(img => {
  if (!isImageUsed(img, sources)) {
    console.log('Unused static file:', img);
    fs.unlinkSync(img);
  }
});
