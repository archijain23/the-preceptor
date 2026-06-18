'use strict';
/**
 * sanity.cli.cjs — CommonJS so the Sanity CLI (which uses require()) can read it
 * even though the rest of the project is ESM ("type": "module" in package.json).
 */
module.exports = {
  api: {
    projectId: 'y9w7fo0ix',
    dataset: 'production',
  },
  studioHost: 'thepreceptor',
};
