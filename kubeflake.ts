import { hostname } from 'node:os';
import { MD5 } from 'crypto-js';
import { Sonyflake, type SonyflakeIdPayload } from 'sonyflake-js';

const host = hostname();
const sum = Buffer.from(MD5(host).toString(), 'hex');
const machineIDBytes = sum.subarray(sum.length - 2); // extract last 2 bytes
const machineId = BigInt(machineIDBytes.readUInt16BE());

const sf = new Sonyflake({
  machineId,
});

export const kubeflake = () => sf.next();

export type KubeflakeIdPayload = SonyflakeIdPayload;
export const parse = (id: bigint): KubeflakeIdPayload => sf.parse(id);

export class Kubeflake {
  private sf: Sonyflake;

  constructor({ startTime = new Date() } = {}) {
    this.sf = new Sonyflake({
      machineId,
      startTime,
    });
  }

  public next(): bigint {
    return this.sf.next();
  }

  public parse(id: bigint): KubeflakeIdPayload {
    return this.sf.parse(id);
  }
}
