import 'setimmediate';
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
  const indexFiles = await fg.glob(['apps/**/src/index.html']);

  console.log('indexFiles file(s) found: ', indexFiles.length)
  // loop through each index file in the apps folder
  indexFiles.forEach(indexFilePath => {
    if (!tree.exists(indexFilePath)) {
      console.log('!tree.exists(indexFilePath)');
      return;
    }

    const indexFileContents = tree.read(indexFilePath);

    if (!indexFileContents) {
      console.log('!indexFileContents');
      return;
    }

    const scriptFileContents = tree.read(schema.distPath);

    if (!scriptFileContents) {
      console.log('!scriptFileContents');
      return;
    }

    const scriptFileName = schema.distPath.split('/').pop();

    // check if the script src matches the name defined in the provided distPath argument
    if (
      !indexFileContents
        .toString()
        .match(new RegExp(`<script.*${scriptFileName}`, 's'))
    ) {
      console.log('!indexFileContents.toString().match', scriptFileName, `<script.*${scriptFileName}`);
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
