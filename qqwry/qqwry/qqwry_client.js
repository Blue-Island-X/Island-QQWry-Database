"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QQWryClient = void 0;
const path = __importStar(require("path"));
const file_buffer_1 = require("../buffer/file_buffer");
const memory_buffer_1 = require("../buffer/memory_buffer");
const qqwry_util_1 = require("./qqwry_util");
class QQWryClient {
    constructor(speed, dataPath) {
        this.path = dataPath || path.join(__dirname, '..', '..', 'data', 'qqwry.dat');
        this.setSpeed(speed);
        this.ipStart = this.buffer.readUIntLE(0, 4);
        this.ipEnd = this.buffer.readUIntLE(4, 4);
    }
    setSpeed(enable) {
        if (enable == true && this.buffer instanceof memory_buffer_1.MemoryBuffer) {
            return;
        }
        if (enable == false && this.buffer instanceof file_buffer_1.FileBuffer) {
            return;
        }
        if (this.buffer) {
            this.buffer.close();
        }
        this.buffer = enable ? new memory_buffer_1.MemoryBuffer(this.path) : new file_buffer_1.FileBuffer(this.path);
    }
    searchIP(address) {
        const ip = qqwry_util_1.QQWryUtil.ip2Int(address);
        const offset = qqwry_util_1.QQWryUtil.locateIP(this.buffer, ip, this.ipStart, this.ipEnd);
        if (offset === -1) {
            return null;
        }
        const ipInfo = qqwry_util_1.QQWryUtil.queryIPInfo(this.buffer, offset);
        ipInfo.ip = qqwry_util_1.QQWryUtil.int2IP(ip);
        ipInfo.int = ip;
        return ipInfo;
    }
}
exports.QQWryClient = QQWryClient;
