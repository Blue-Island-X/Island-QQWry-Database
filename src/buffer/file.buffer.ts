import * as fs from 'fs';

import { AbstractBuffer } from '../common/abstract.buffer';

export class FileBuffer implements AbstractBuffer {
    fd: number;
    max: number;

    constructor(path: string) {
        this.fd = fs.openSync(path, 'r');
        this.max = fs.fstatSync(this.fd).size;
    }
    
    readBuffer(start: number, length: number) {
        const buffer = Buffer.alloc(length);
        fs.readSync(this.fd, buffer, 0, length, start);
        return buffer;
    }

    readUIntLE(start: number, length: number) {
        return this.readBuffer(start, length).readUIntLE(0, length);
    }

    getStringByteArray(start: number) {
        const result = [];

        for (var i = start; i < this.max; i++) {
            const temp = this.readBuffer(i, 1)[0];
            if (temp === 0) {
                break;
            }

            result.push(temp);
        }

        return result;
    }

    close() {
        if (this.fd !== null) {
            fs.closeSync(this.fd);
        }
    }
}