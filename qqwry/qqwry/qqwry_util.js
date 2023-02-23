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
exports.QQWryUtil = void 0;
const gbk = __importStar(require("gbk.js"));
class QQWryUtil {
    /**
     * 使用二分法查找指定 IP 地址的偏移量
     * @param buffer 实现 AbstractBuffer 的实例
     * @param ip 数字形式的 IP 地址
     * @param start 起始位置
     * @param end 中止位置
     * @returns
     */
    static locateIP(buffer, ip, start, end) {
        var offset = -1;
        for (var x = start, y = end; x < y;) {
            offset = this.getCenterOffset(x, y, this.IP_RECORD_LENGTH);
            const temp = buffer.readUIntLE(offset, 4);
            if (ip > temp) {
                x = offset;
            }
            else if (ip < temp) {
                if (offset === y) {
                    offset -= this.IP_RECORD_LENGTH;
                    break;
                }
                y = offset;
            }
            else {
                break;
            }
        }
        return offset;
    }
    /**
     * 通过 IP 地址偏移量查找 IP 详细信息
     * @param buffer 实现 AbstractBuffer 的实例
     * @param ip IP 地址偏移量
     * @returns IP 详细信息
     */
    static queryIPInfo(buffer, ip) {
        const ipInfo = {};
        var offset = buffer.readUIntLE(ip + 4, 3) + 4;
        var mode = buffer.readUIntLE(offset, 1);
        if (mode == this.REDIRECT_MODE_1) {
            offset = buffer.readUIntLE(offset + 1, 3);
            mode = buffer.readUIntLE(offset, 1);
            if (mode == this.REDIRECT_MODE_2) {
                const country = buffer.getStringByteArray(buffer.readUIntLE(offset + 1, 3));
                ipInfo.country = gbk.decode(country);
                offset += 4;
            }
            else {
                const country = buffer.getStringByteArray(offset);
                ipInfo.country = gbk.decode(country);
                offset += country.length + 1;
            }
            ipInfo.area = this.readArea(buffer, offset);
        }
        else if (mode == this.REDIRECT_MODE_2) {
            const country = buffer.getStringByteArray(buffer.readUIntLE(offset + 1, 3));
            ipInfo.country = gbk.decode(country);
            ipInfo.area = this.readArea(buffer, offset + 4);
        }
        else {
            const country = buffer.getStringByteArray(offset);
            offset += country.length + 1;
            ipInfo.country = gbk.decode(country);
            ipInfo.area = this.readArea(buffer, offset);
        }
        return ipInfo;
    }
    /**
     * 通过 IP 段偏移量查找 IP 段详细信息
     * @param buffer 实现 AbstractBuffer 的实例
     * @param ip1 IP 段起始偏移量
     * @param ip2 IP 段终止偏移量
     */
    static queryIPRangeInfo(buffer, ip1, ip2) {
        const ipRangeList = [];
        for (var i = ip1; i <= ip2; i += this.IP_RECORD_LENGTH) {
            const ipInfo = this.queryIPInfo(buffer, i);
            const ipRangeInfo = {};
            ipRangeInfo.beginInt = buffer.readUIntLE(i, 4);
            ipRangeInfo.endInt = buffer.readUIntLE(buffer.readUIntLE(i + 4, 3), 4);
            ipRangeInfo.beginIP = this.int2IP(ipRangeInfo.beginInt);
            ipRangeInfo.endIP = this.int2IP(ipRangeInfo.endInt);
            ipRangeInfo.country = ipInfo.country;
            ipRangeInfo.area = ipInfo.area;
            ipRangeList.push(ipRangeInfo);
        }
        return ipRangeList;
    }
    /**
     * 利用二分法获取中间的偏移量
     * @param start 起始位置
     * @param end 中止位置
     * @param length 记录长度
     * @returns
     */
    static getCenterOffset(start, end, length) {
        const records = (((end - start) / length) >> 1) * length + start;
        return records ^ start ? records : records + length;
    }
    /**
     * 从 Buffer 中读取 IP 地区信息
     * @param buffer 实现 AbstractBuffer 的实例
     * @param offset 偏移量
     * @returns ByteArray 形式的字符
     */
    static readArea(buffer, offset) {
        const mode = buffer.readUIntLE(offset, 1);
        if (mode === 1 || mode === 2) {
            const areaOffset = buffer.readUIntLE(offset + 1, 3);
            if (areaOffset !== 0) {
                return gbk.decode(buffer.getStringByteArray(areaOffset));
            }
            return '';
        }
        else {
            return gbk.decode(buffer.getStringByteArray(offset));
        }
    }
    /**
     * IP 地址转换为数值
     * @param ip 字符形式的 IP 地址
     * @returns 数字形式的 IP 地址
     */
    static ip2Int(ip) {
        const ipv4Regex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if (ipv4Regex.test(ip)) {
            const array = ipv4Regex.exec(ip).slice(1);
            return (parseInt(array[0]) << 24 | parseInt(array[1]) << 16 | parseInt(array[2]) << 8 | parseInt(array[3])) >>> 0;
        }
        else {
            throw `Invalid IP address >> ${ip}`;
        }
    }
    /**
     * 数值转换为 IP 地址
     * @param int 数字形式的 IP 地址
     * @returns 字符形式的 IP 地址
     */
    static int2IP(int) {
        if (int < 0 || int > 0xffffffff) {
            throw `Invalid IP number! >> ${int}`;
        }
        return `${int >>> 24}.${(int >>> 16) & 0xff}.${(int >>> 8) & 0xff}.${(int >>> 0 & 0xff)}`;
    }
    /**
     * 32位 Big Endian 与 Little Endian 数值互转
     * @param int 32 位数值
     * @returns 转换结果
     */
    static convertEndian(int) {
        int = int & 0xffffffff;
        return ((int >>> 24) | ((int >> 8) & 0xff00) | ((int << 8) & 0xff0000) | (int << 24)) >>> 0;
    }
}
exports.QQWryUtil = QQWryUtil;
QQWryUtil.REDIRECT_MODE_1 = 1;
QQWryUtil.REDIRECT_MODE_2 = 2;
QQWryUtil.IP_RECORD_LENGTH = 7;
