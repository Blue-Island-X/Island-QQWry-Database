import * as path from 'path';

import { AbstractBuffer } from '../common/abstract_buffer';
import { FileBuffer } from '../buffer/file_buffer';
import { MemoryBuffer } from '../buffer/memory_buffer';
import { QQWryUtil } from './qqwry_util';

export class QQWryClient {
    path: string;
    buffer: InstanceType<typeof AbstractBuffer>;
    ipStart: number;
    ipEnd: number;

    constructor(speed: boolean, dataPath?: string) {
        this.path = dataPath || path.join(__dirname, '..', '..', 'data', 'qqwry.dat');
        this.setSpeed(speed);
        this.ipStart = this.buffer.readUIntLE(0, 4);
        this.ipEnd = this.buffer.readUIntLE(4, 4);
    }

    setSpeed(enable: boolean) {
        if (enable == true && this.buffer instanceof MemoryBuffer) {
            return;
        }
        if (enable == false && this.buffer instanceof FileBuffer) {
            return;
        }
        if (this.buffer) {
            this.buffer.close();
        }
        this.buffer = enable ? new MemoryBuffer(this.path) : new FileBuffer(this.path);
    }

    searchIP(address: string) {
        const ip = QQWryUtil.ip2Int(address);
        const offset = QQWryUtil.locateIP(this.buffer, ip, this.ipStart, this.ipEnd);
        if (offset === -1) {
            return null;
        }

        const ipInfo = QQWryUtil.queryIPInfo(this.buffer, offset);
        ipInfo.ip = QQWryUtil.int2IP(ip);
        ipInfo.int = ip;

        return ipInfo;
    }
}