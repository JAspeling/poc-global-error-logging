import { Tree } from '@nx/devkit';
import * as fg from 'fast-glob';
import { CacheBusterGeneratorSchema as Schema } from './schema';
import { createHash } from 'crypto';
import { output } from '../utils';

/**
 *
 *
 * View the README for more info
 */
export default async function (tree: Tree, schema: Schema) {
  console.log('EXECUTING CACHE-BUSTING GENERATOR');
  const indexFiles = await fg(['apps/**/src/index.html']);

  // loop through each index file in the apps folder
  indexFiles.forEach(indexFilePath => {
    if (!tree.exists(indexFilePath)) {
      return;
    }

    const indexFileContents = tree.read(indexFilePath);

    if (!indexFileContents) {
      return;
    }

    const scriptFileContents = tree.read(schema.distPath);

    if (!scriptFileContents) {
      return;
    }

    const scriptFileName = schema.distPath.split('/').pop();

    // check if the script src matches the name defined in the provided distPath argument
    if (
      !indexFileContents
        .toString()
        .match(new RegExp(`<script.*${scriptFileName}`, 's'))
    ) {
      return;
    }

    const hash = createHash('md5').update(scriptFileContents).digest('hex');

    // matches the filename and everything up to the closing double quote
    const fileAndHashRegex = new RegExp(`${scriptFileName}.*"`);

    // replace the matching filename and regex with the filename and a new hash
    tree.write(
      indexFilePath,
      indexFileContents
        .toString()
        .replace(fileAndHashRegex, `${scriptFileName}?v=${hash}"`)
    );

    output.single(`${scriptFileName} version updated in ${indexFilePath}`);
  });
}
