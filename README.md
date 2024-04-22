# kubeflake

> sonyflake + pod hostname as machine id  

[![npm version](https://img.shields.io/npm/v/kubeflake)](https://www.npmjs.com/package/kubeflake)
[![npm downloads](https://img.shields.io/npm/dt/kubeflake)](https://www.npmjs.com/package/kubeflake)

- inspired by [kubeflake](https://github.com/xissy/kubeflake)
- build settings referenced [unicode-segmenter](https://github.com/cometkim/unicode-segmenter)


## Usage

### 1. Install

```shell
$ yarn add kubeflake
```

### 2. Create a ID

```typescript
import { kubeflake, parse } from 'kubeflake';

const id = kubeflake(); // 509414012220366329n
parse(id);
/**
{
  startTime: 2014-09-01T00:00:00.000Z,
  generatedTime: 2024-04-15T06:53:32.420Z,
  timestamp: 303634412420,
  sequence: 0,
  machineId: 24057
}
*/
```

... or with custom startTime

```typescript
import { Kubeflake } from 'kubeflake'

const kf = new Kubeflake({
  startTime: new Date('2024-04-15T00:00:00Z'),
});

const id = kf.next(); // 41628333006329n
kf.parse(id);
/**
{
  startTime: 2024-04-15T00:00:00.000Z,
  generatedTime: 2024-04-15T06:53:32.420Z,
  timestamp: 24812420,
  sequence: 0,
  machineId: 24057
}
*/
```

### 3. Use on Command Line Interface

```shell
$ npx kubeflake
510468309502680569n

$ npx kubeflake --parse 510468309502680569n
{
  startTime: 2014-09-01T00:00:00.000Z,
  generatedTime: 2024-04-22T13:27:02.570Z,
  timestamp: 304262822570,
  sequence: 0,
  machineId: 24057
}

$  npx kubeflake --help                

Usage: kubeflake [OPTIONS]

Generate 64-bit orderable unique IDs using Kubeflake.

Options:
  -n, --number INTEGER  Number of Kubeflake IDs to generate (default is 1).
                        Please provide a positive integer value.
  -p, --parse STRING    Parse a Kubeflake ID and display its components in JSON format.
                        Only valid formats that can be parsed into a BigInt are accepted.
  -h, --help            Show this message and exit.
```
