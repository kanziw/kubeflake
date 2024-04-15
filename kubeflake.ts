import { hostname } from 'node:os';
import { MD5 } from 'crypto-js';
import { Sonyflake, type SonyflakeIdPayload } from 'sonyflake-js';

export type KubeflakeOption = {
  // Default: new Date('2014-09-01T00:00:00Z');
  // @see https://github.com/sony/sonyflake/blob/fc2f84a086d25d207a91768bc47edfb84972fef5/sonyflake.go#L79
  startTime?: Date;
};
export type KubeflakeIdPayload = SonyflakeIdPayload;

const getMachineId = (): bigint => {
  const host = hostname() || globalThis.crypto.randomUUID();
  const sum = Buffer.from(MD5(host).toString(), 'hex');
  const machineIDBytes = sum.subarray(sum.length - 2); // extract last 2 bytes
  return BigInt(machineIDBytes.readUInt16BE(0));
};

const initSonyflake = (option: KubeflakeOption = {}): Sonyflake =>
  new Sonyflake({
    machineId: getMachineId(),
    startTime: option.startTime,
  });

export const kubeflake = (option?: KubeflakeOption) => initSonyflake(option).next();
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
