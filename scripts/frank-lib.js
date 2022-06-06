// based on frank-dist.js from https://github.com/Izhaki/regraph

/* eslint-disable no-console */
const { resolve, join, basename } = require('path');
const { readFile, writeFile, copy } = require('fs-extra');

const packagePath = process.cwd();
const libPath = join(packagePath, './lib');

const writeJson = (targetPath, obj) => writeFile(targetPath, JSON.stringify(obj, null, 2), 'utf8');

async function createPackageFile() {
  const packageData = await readFile(resolve(packagePath, './package.json'), 'utf8');
  const { scripts, devDependencies, husky, ...packageOthers } = JSON.parse(packageData);
  const newPackageData = {
    ...packageOthers,
    private: false,
  };

  const targetPath = resolve(libPath, './package.json');

  await writeJson(targetPath, newPackageData);
  console.log(`Created package.json in ${targetPath}`);
}

async function includeFileInBuild(file) {
  const sourcePath = resolve(packagePath, file);
  const targetPath = resolve(libPath, basename(file));
  await copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

async function run() {
  try {
    await createPackageFile();
    await includeFileInBuild('./README.md');
    await includeFileInBuild('./LICENSE');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
