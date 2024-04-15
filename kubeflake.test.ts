import { test } from 'vitest';
import { kubeflake } from './kubeflake.js';

test('kubeflake', () => {
  console.log(kubeflake());
});
