import * as fs from 'fs';

import { AbstractBuffer } from '../common/abstract.buffer';

export class MemoryBuffer implements AbstractBuffer {
    buffer: Buffer;
    bufferLength: number;

    constructor(path: string) {
        this.buffer = fs.readFileSync(path);
        this.bufferLength = this.buffer.length;
    }

    readBuffer(start: number, length: number) {
        return this.buffer.slice(start, start + length);
    }

    readUIntLE(start: number, length: number) {
        return this.buffer.readUIntLE(start, length);
    }

    getStringByteArray(start: number) {
        const result = [];

        for (var i = start; i < this.bufferLength; i++) {
            const temp = this.buffer[i];
            if (temp === 0) {
                break;
            }

            result.push(temp);
        }

        return result;
    }

    close() {

    }
}