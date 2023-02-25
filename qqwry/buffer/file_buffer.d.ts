/// <reference types="node" />
import { AbstractBuffer } from '../common/abstract_buffer';
export declare class FileBuffer implements AbstractBuffer {
    fd: number;
    max: number;
    constructor(path: string);
    readBuffer(start: number, length: number): Buffer;
    readUIntLE(start: number, length: number): number;
    getStringByteArray(start: number): number[];
    close(): void;
}
