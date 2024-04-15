import * as crypto from 'node:crypto';
import { hostname } from 'node:os';
import { MD5 } from 'crypto-js';
import { assert, test } from 'vitest';
import { Kubeflake, kubeflake, parse } from './kubeflake.js';

test('kubeflake', () => {
  const id = kubeflake();
  console.log(id);
  console.log(parse(id));
});

test('Kubeflake with custom startTime', () => {
  const kf = new Kubeflake({ startTime: new Date('2024-04-15T00:00:00Z') });
  const id = kf.next();
  console.log(id);
  console.log(kf.parse(id));
});

test('Use crypto-js for Web compatibility', () => {
  const host = hostname();

  const buf1 = crypto.createHash('md5').update(host).digest();
  const buf2 = Buffer.from(MD5(host).toString(), 'hex');

  assert.deepEqual(buf1, buf2);
});
