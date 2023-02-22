<h1 align="center">
    <b>
        <a href="https://github.com/Blue-Island-X"><img style="width:128px;" src="https://raw.githubusercontent.com/Blue-Island-X/Island-QQWry-Database/main/resource/logo.png" /></a><br>
    </b>
</h1>

<p align="center">小蓝岛纯真 IP 数据库 qqwry.dat 解析</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/@blueislandx/island-qqwry-database.svg?style=flat-square)](https://www.npmjs.org/package/@blueislandx/island-qqwry-database)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@blueislandx/island-qqwry-database&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=@blueislandx/island-qqwry-database)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@blueislandx/island-qqwry-database?style=flat-square)](https://bundlephobia.com/package/@blueislandx/island-qqwry-database@latest)
[![npm downloads](https://img.shields.io/npm/dm/@blueislandx/island-qqwry-database.svg?style=flat-square)](https://npm-stat.com/charts.html?package=@blueislandx/island-qqwry-database)
[![Known Vulnerabilities](https://snyk.io/test/npm/@blueislandx/island-qqwry-database/badge.svg?style=flat-square)](https://snyk.io/test/npm/@blueislandx/island-qqwry-database)

</div>

## 1.如何安装
```
npm i @blueislandx/island-qqwry-database --save
```

## 2.如何使用

查询 IP 地址:
```TypeScript
import qqwry from '@blueislandx/island-qqwry-database';

const client = qqwry.database.Client(<是否开启极速模式>, '<数据库文件 (默认使用项目自带)>');

client.searchIP('<IP 地址>');
```

IP 转数字:
```TypeScript
import qqwry from '@blueislandx/island-qqwry-database';

const util = qqwry.database.Util;

util.ip2Int('<IP 地址>');
```

数字转 IP:
```TypeScript
import qqwry from '@blueislandx/island-qqwry-database';

const util = qqwry.database.Util;

util.int2IP(<IP 地址 (数字格式)>);
```

字节序转换
```TypeScript
import qqwry from '@blueislandx/island-qqwry-database';

const util = qqwry.database.Util;

util.convertEndian(<字节 (数字格式)>);
```

## 3.特别感谢

本项目基于 [cnwhy](https://github.com/cnwhy/) 大佬开发的 [lib-qqwry](https://github.com/cnwhy/lib-qqwry) 项目进行编写, 使用 [TypeScript](https://www.typescriptlang.org) 对大佬的代码进行了重写, 学习了大佬的逻辑