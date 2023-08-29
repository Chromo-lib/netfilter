import { cp } from 'fs/promises';
// import { resolve } from 'path';

export function copyStatic(dir = 'static') {
  return {
    name: 'copy-files',
    async buildEnd() {
      await cp(dir, 'dist', { recursive: true });
      console.log('\n===> Files are copied: success\n');
    },
  };
}