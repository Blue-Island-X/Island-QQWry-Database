/// <reference types="node" />
export declare abstract class AbstractBuffer {
    abstract readBuffer(start: number, length: number): Buffer;
    abstract readUIntLE(start: number, length: number): number;
    abstract getStringByteArray(start: number): number[];
    abstract close(): void;
}
