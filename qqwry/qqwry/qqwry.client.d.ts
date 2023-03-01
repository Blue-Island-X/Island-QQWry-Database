import { AbstractBuffer } from '../common/abstract.buffer';
export declare class QQWryClient {
    path: string;
    buffer: InstanceType<typeof AbstractBuffer>;
    ipStart: number;
    ipEnd: number;
    constructor(speed: boolean, dataPath?: string);
    setSpeed(enable: boolean): void;
    searchIP(address: string): import("../common/interfaces").IPInfo | null;
    searchIPScope(start: string, end: string): import("../common/interfaces").IPRangeInfo[];
}
