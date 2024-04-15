import { test } from 'vitest';
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
