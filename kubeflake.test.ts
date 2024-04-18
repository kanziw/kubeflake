import * as crypto from 'node:crypto';
import { hostname } from 'node:os';
import { MD5 } from 'crypto-js';
import { assert, test } from 'vitest';
import { Kubeflake, kubeflake, parse } from './kubeflake.ts';

test('kubeflake', () => {
  const [id1, id2] = [kubeflake(), kubeflake()];
  assert.notStrictEqual(id1, id2);
  console.log(id1);
  console.log(parse(id1));
});

test('Kubeflake with custom startTime', () => {
  const kf = new Kubeflake({ startTime: new Date('2024-04-15T00:00:00Z') });
  const id = kf.next();
  console.log(id);
  console.log(kf.parse(id));
});
