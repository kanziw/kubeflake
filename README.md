# kubeflake

> sonyflake + pod hostname as machine id
> inspired by [kubeflake](https://github.com/xissy/kubeflake)
> build settings referenced [unicode-segmenter](https://github.com/cometkim/unicode-segmenter)


## Usage

### 1. Install

```shell
yarn add @kanziw/kubeflake
```

### 2. Create a ID

```typescript
import { kubeflake, parse } from '@kanziw/kubeflake';

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
import { Kubeflake } from '@kanziw/kubeflake'

const kf = new Kubeflake({ startTime: new Date('2024-04-15T00:00:00Z') });

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
