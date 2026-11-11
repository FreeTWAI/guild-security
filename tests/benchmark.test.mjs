import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {renderWorkspace} from '../scripts/build.mjs';

const workspace = JSON.parse(await readFile(new URL('../workspace.json', import.meta.url), 'utf8'));

test('renderWorkspace performance meets latency requirements', () => {
  const iterations = 10000;
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    renderWorkspace(workspace);
  }
  const end = performance.now();
  const duration = end - start;

  // Upper bound for 10000 renders should be well within 500ms
  assert.ok(duration < 500, `renderWorkspace took ${duration}ms for ${iterations} iterations, exceeding 500ms limit`);
});
