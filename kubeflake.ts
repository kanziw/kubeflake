import * as crypto from 'node:crypto';
import { hostname } from 'node:os';
import { Sonyflake, type SonyflakeIdPayload } from 'sonyflake-js';

export type KubeflakeOption = {
  // Default: new Date('2014-09-01T00:00:00Z');
  // @see https://github.com/sony/sonyflake/blob/fc2f84a086d25d207a91768bc47edfb84972fef5/sonyflake.go#L79
  startTime?: Date;
};
export type KubeflakeIdPayload = SonyflakeIdPayload;

const getMachineId = (): bigint => {
  const host = hostname() || globalThis.crypto.randomUUID();
  const sum = crypto.createHash('md5').update(host).digest();
  const machineIDBytes = sum.subarray(sum.length - 2); // extract last 2 bytes
  return BigInt(machineIDBytes.readUInt16BE(0));
};

const initSonyflake = (option: KubeflakeOption = {}): Sonyflake =>
  new Sonyflake({
    machineId: getMachineId(),
    startTime: option.startTime,
  });

const globalCachedSf: Record<number, Sonyflake> = {};
export const kubeflake = (option?: KubeflakeOption) => {
  const statrTimeTs = option?.startTime?.getTime() || -1;
  let cf = globalCachedSf[statrTimeTs];
  if (!cf) {
    cf = initSonyflake(option);
    globalCachedSf[statrTimeTs] = cf;
  }
  return cf.next();
};
export const parse = (id: bigint, option?: KubeflakeOption): KubeflakeIdPayload => initSonyflake(option).parse(id);

export class Kubeflake {
  private sf: Sonyflake;

  constructor(option: KubeflakeOption = {}) {
    this.sf = new Sonyflake({
      machineId: getMachineId(),
      startTime: option.startTime,
    });
  }

  public next(): bigint {
    return this.sf.next();
  }

  public parse(id: bigint): KubeflakeIdPayload {
    return this.sf.parse(id);
  }
}
