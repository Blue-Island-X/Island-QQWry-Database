const qqwry = require('../../island-qqwry-database');

const client = new qqwry.database.Client(true);
const util = qqwry.database.Util;

// 查询 IP 地址
console.log(client.searchIP('223.5.5.5'));
console.log(client.searchIP('114.114.114.114'));

// 查询 IP 段
console.log(client.searchIPScope('8.8.8.0', '8.8.8.8'));
console.log(client.searchIPScope('58.87.96.0', '58.87.99.255'));

// IP 转数字
console.log(util.ip2Int('114.114.114.114'));

// 数字转 IP
console.log(util.int2IP(1920103026));

// 字节序转换
console.log(util.convertEndian(0x010000ff));