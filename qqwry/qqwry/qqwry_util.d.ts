import { AbstractBuffer } from '../common/abstract_buffer';
import { IPInfo, IPRangeInfo } from '../common/interfaces';
export declare class QQWryUtil {
    static REDIRECT_MODE_1: number;
    static REDIRECT_MODE_2: number;
    static IP_RECORD_LENGTH: number;
    /**
     * 使用二分法查找指定 IP 地址的偏移量
     * @param buffer 实现 AbstractBuffer 的实例
     * @param ip 数字形式的 IP 地址
     * @param start 起始位置
     * @param end 中止位置
     * @returns
     */
    static locateIP(buffer: InstanceType<typeof AbstractBuffer>, ip: number, start: number, end: number): number;
    /**
     * 通过 IP 地址偏移量查找 IP 详细信息
     * @param buffer 实现 AbstractBuffer 的实例
     * @param ip IP 地址偏移量
     * @returns IP 详细信息
     */
    static queryIPInfo(buffer: InstanceType<typeof AbstractBuffer>, ip: number): IPInfo;
    /**
     * 通过 IP 段偏移量查找 IP 段详细信息
     * @param buffer 实现 AbstractBuffer 的实例
     * @param ip1 IP 段起始偏移量
     * @param ip2 IP 段终止偏移量
     */
    static queryIPRangeInfo(buffer: InstanceType<typeof AbstractBuffer>, ip1: number, ip2: number): IPRangeInfo[];
    /**
     * 利用二分法获取中间的偏移量
     * @param start 起始位置
     * @param end 中止位置
     * @param length 记录长度
     * @returns
     */
    static getCenterOffset(start: number, end: number, length: number): number;
    /**
     * 从 Buffer 中读取 IP 地区信息
     * @param buffer 实现 AbstractBuffer 的实例
     * @param offset 偏移量
     * @returns ByteArray 形式的字符
     */
    static readArea(buffer: InstanceType<typeof AbstractBuffer>, offset: number): string;
    /**
     * IP 地址转换为数值
     * @param ip 字符形式的 IP 地址
     * @returns 数字形式的 IP 地址
     */
    static ip2Int(ip: string): number;
    /**
     * 数值转换为 IP 地址
     * @param int 数字形式的 IP 地址
     * @returns 字符形式的 IP 地址
     */
    static int2IP(int: number): string;
    /**
     * 32位 Big Endian 与 Little Endian 数值互转
     * @param int 32 位数值
     * @returns 转换结果
     */
    static convertEndian(int: number): number;
}
