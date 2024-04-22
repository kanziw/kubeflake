#!/usr/bin/env node

import { argv } from 'node:process';
import minimist from 'minimist';
import { kubeflake, parse } from './kubeflake.js';

const helpMessage = `
Usage: kubeflake [OPTIONS]

Generate 64-bit orderable unique IDs using Kubeflake.

Options:
  -n, --number INTEGER  Number of Kubeflake IDs to generate (default is 1).
                        Please provide a positive integer value.
  -p, --parse STRING    Parse a Kubeflake ID and display its components in JSON format.
                        Only valid formats that can be parsed into a BigInt are accepted.
  -h, --help            Show this message and exit.
`;

const parsedArgs = minimist(argv.slice(2));

if (parsedArgs.h || parsedArgs.help) {
  console.log(helpMessage);
  process.exit(0);
}

const fatal = (message: string): never => {
  console.error(message);
  process.exit(1);
};

const [parsedN, parsedP] = [parsedArgs.n ?? parsedArgs.number, parsedArgs.p ?? parsedArgs.parse];
if (parsedN && parsedP) {
  fatal(`Error: The -n and -p options cannot be used together.
    Please use either the -n option to generate Kubeflake IDs or the -p option to parse a Kubeflake ID.`);
}

const n = parsedN ?? 1;
if (typeof n !== 'number' || n < 1) {
  fatal(`Error: The -n option requires a positive integer value.
Please provide a valid positive integer for the number of Kubeflake IDs to generate.`);
}

const p = parsedP;
if (p) {
  let v: bigint;

  switch (typeof p) {
    case 'number':
      console.log(parse(BigInt(p)));
      break;
    case 'string':
      try {
        console.log(parse(BigInt(p.slice(0, -1))));
      } catch {
        fatal(`Error: Failed to parse the input string as a BigInt.
Please provide a valid string that can be parsed into a BigInt.`);
      }
      break;
    default:
      fatal(`Error: Failed to parse the input string as a BigInt.
The input string is in an unrecognized format or contains invalid characters.
Please provide a valid string that can be parsed into a BigInt.`);
  }
  process.exit(0);
}

for (const _ of Array(n).fill(null)) {
  console.log(kubeflake());
}
