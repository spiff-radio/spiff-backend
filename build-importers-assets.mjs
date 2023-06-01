import * as fs from 'fs-extra';

const INPUT_PATH = '../spiff-importer/src/importers/presets/images';
const OUTPUT_PATH = './public/images/importers';

const copyImages = async () => {

  try {
    // Clear the destination directory if it exists
    await fs.remove(OUTPUT_PATH);

    // Create the destination directory
    await fs.ensureDir(OUTPUT_PATH);

    // Copy images from the source directory to the destination directory
    await fs.copy(INPUT_PATH, OUTPUT_PATH);

    console.info('Created assets from spiff-importer module.');
  } catch (error) {
    console.error('Error creating assets from spiff-importer module:', error);
  }
    console.log();
};

copyImages();
