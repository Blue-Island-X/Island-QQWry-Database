export interface IPInfo {
    /**
     * IP 地址 (字符形式)
     */
    ip: string;

    /**
     * IP 地址 (数字形式)
     */
    int: number;

    /**
     * IP 所属国家
     */
    country: string;

    /**
     * IP 所属地区
     */
    area: string;
}