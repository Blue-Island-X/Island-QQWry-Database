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

export interface IPRangeInfo {
    /**
     * IP 段起始地址 (字符形式)
     */
    beginIP: string;

    /**
     * IP 段终止地址 (字符形式)
     */
    endIP: string;

    /**
     * IP 段起始地址 (数字形式)
     */
    beginInt: number;

    /**
     * IP 段终止地址 (数字形式)
     */
    endInt: number;

    /**
     * IP 段所属国家
     */
    country: string;

    /**
     * IP 段所属地区
     */
    area: string;
}