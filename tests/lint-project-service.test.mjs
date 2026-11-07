import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { clearCaches, parseForESLint } from '@typescript-eslint/parser';

test('the lint parser supports its patched glob-matching dependency', (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'cat-breed-parser-'));
  t.after(() => {
    clearCaches();
    rmSync(directory, { recursive: true, force: true });
  });

  writeFileSync(path.join(directory, 'tsconfig.json'), JSON.stringify({
    compilerOptions: { strict: true },
    include: ['src/**/*.ts'],
  }));

  const source = 'const breed: string = "Abyssinian";';
  const options = {
    tsconfigRootDir: directory,
    projectService: { allowDefaultProject: ['*.ts'] },
  };

  const allowedFile = path.join(directory, 'breed.ts');
  writeFileSync(allowedFile, source);
  const result = parseForESLint(source, { ...options, filePath: allowedFile });
  assert.equal(result.ast.body[0].type, 'VariableDeclaration');
  assert.ok(result.services.program, 'type information remains available');

  assert.throws(
    () => parseForESLint(source, {
      ...options,
      filePath: path.join(directory, 'nested', 'breed.ts'),
    }),
    /not found by the project service/,
    'files outside the allowed glob remain excluded',
  );
});
