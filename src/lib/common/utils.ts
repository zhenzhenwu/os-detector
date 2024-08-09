// 获取枚举的所有值
export function getEnumValues<T>(enumType: { [key: string]: T }): T[] {
    return Object.values(enumType).filter((value) => typeof value === 'string') as T[];
}