import * as crypto from 'node:crypto';
import { hostname } from 'node:os';
import { Sonyflake } from 'sonyflake-js';

const host = hostname();
const sum = crypto.createHash('md5').update(host).digest();
const machineIDBytes = sum.subarray(sum.length - 2); // extract last 2 bytes
const machineId = BigInt(machineIDBytes.readUInt16BE());

const sf = new Sonyflake({
  machineId,
});

export const kubeflake = () => sf.next();

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
}
