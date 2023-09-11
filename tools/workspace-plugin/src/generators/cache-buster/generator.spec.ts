import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';
import cacheBusterGenerator from './generator';
import { CacheBusterGeneratorSchema } from './schema';

describe('cache-buster generator', () => {
  let tree: Tree;
  const options: CacheBusterGeneratorSchema = { distPath: 'error-logger' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await cacheBusterGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'error-logger');
    expect(config).toBeDefined();
  });
});
