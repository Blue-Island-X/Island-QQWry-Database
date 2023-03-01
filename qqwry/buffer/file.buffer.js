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
exports.FileBuffer = void 0;
const fs = __importStar(require("fs"));
class FileBuffer {
    constructor(path) {
        this.fd = fs.openSync(path, 'r');
        this.max = fs.fstatSync(this.fd).size;
    }
    readBuffer(start, length) {
        const buffer = Buffer.alloc(length);
        fs.readSync(this.fd, buffer, 0, length, start);
        return buffer;
    }
    readUIntLE(start, length) {
        return this.readBuffer(start, length).readUIntLE(0, length);
    }
    getStringByteArray(start) {
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
exports.FileBuffer = FileBuffer;
