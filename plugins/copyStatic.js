import { cp } from 'fs/promises';

export function copyStatic(dir = 'static') {
  return {
    name: 'copy-files',
    async buildEnd() {
      await cp(dir, 'dist', { recursive: true });
      console.log(`\n===> Success Copy: ${dir} \n`);
    },
  };
}