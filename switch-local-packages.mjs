/*
Toggle use local or remote dependencies for '@spiff-radio/' packages.
npm run switch-local-packages <--use remote packages
npm run switch-local-packages local <--use local packages
*/


import fs from 'fs';
import { execSync } from 'child_process';

const args = process.argv.slice(2);
const toLocal = args.includes('local');

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies, ...packageJson.peerDependencies };
const packagePrefix = '@spiff-radio/';
const localPathPrefix = 'file:../';

// Array to store the extracted names
const packageNames = [];

const getDependencyType = pName => {
  if (pName in (packageJson.dependencies || [])) {
    return 'dependencies'
  }else if (pName in (packageJson.devDependencies || [])) {
    return 'devDependencies'
  }else if (pName in (packageJson.peerDependencies || [])) {
    return 'peerDependencies'
  }
}

// Iterate over dependencies and extract names
for (const [name, value] of Object.entries(dependencies)) {
  if (!name.startsWith(packagePrefix)) continue;

  const toggle = ( (toLocal && !value.startsWith(localPathPrefix) ) || (!toLocal && value.startsWith(localPathPrefix) ) );
  if (!toggle) continue;

  const pName = name.split('/')[1];
  packageNames.push(pName);
}

if (!packageNames.length){
  console.log("No need to switch packages")
}else{

  console.info(`Converting ${packageNames.length} ${toLocal ? 'remote' : 'local'} dependencies to ${toLocal ? 'local' : 'remote'} packages...`);

  // Install original/local packages with appropriate flags
  for (const pName of packageNames) {
    console.info();
    const dependencyType = getDependencyType(pName);
    const installFlag = dependencyType === 'devDependencies' ? '--save-dev' : '';

    const fullName = packagePrefix + pName;
    const oldPath = toLocal ? fullName : localPathPrefix + pName;
    const newPath = toLocal ? localPathPrefix + pName : fullName;


    // Uninstall original package
    console.info(`Uninstalling ${toLocal ? 'remote' : 'local'} package '${oldPath}'...`);

    try {
      execSync(`npm uninstall ${fullName}`);
    } catch (error) {
      console.error(`Error uninstalling ${toLocal ? 'remote' : 'local'} package '${fullName}': ${error.message}`);
    }


    // Install local package with appropriate flag
    console.info(`Installing ${toLocal ? 'local' : 'remote'} package '${newPath}'...`);

    try {
      execSync(`npm install ${newPath} ${installFlag}`);
    } catch (error) {
      console.error(`Error installing ${newPath}: ${error.message}`);
    }

  }
}
