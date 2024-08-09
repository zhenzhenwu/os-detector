import * as os from "node:os";
import {getEnumValues} from '../common/utils.js';

export function printCpuInfo() {
    const cpus = os.cpus();

    console.log('CPU Information:');
    cpus.forEach((cpu, index) => {
        console.log(`Core ${index + 1}:`);
        console.log(`  Model: ${cpu.model}`);
        console.log(`  Speed: ${cpu.speed} MHz`);
        console.log(`  Times:`);
        console.log(`    user: ${cpu.times.user} ms`);
        console.log(`    nice: ${cpu.times.nice} ms`);
        console.log(`    sys: ${cpu.times.sys} ms`);
        console.log(`    idle: ${cpu.times.idle} ms`);
        console.log(`    irq: ${cpu.times.irq} ms`);
    });
}

export function printSystemInfo() {
    console.log(`Platform: ${os.platform()}`);
    console.log(`Architecture: ${os.arch()}`);
    console.log(`Release: ${os.release()}`);
    console.log(`Hostname: ${os.hostname()}`);
    console.log(`Total Memory: ${convertUnits(os.totalmem(), MemoryUnit.Byte, MemoryUnit.GB)} GB`);
    console.log(`Free Memory: ${convertUnits(os.freemem(), MemoryUnit.Byte, MemoryUnit.GB)} GB`);
    console.log(`Uptime: ${os.uptime()} seconds`);
}

export enum MemoryUnit {
    Byte = 'B',
    KB = 'KB',
    MB = 'MB',
    GB = 'GB',
    TB = 'TB',
}

export function convertUnits(value: number, inputUnit: MemoryUnit, outputUnit: MemoryUnit): number {
    const units = getEnumValues<string>(MemoryUnit)
    const unitFactors = [1, 1024, 1024 * 1024, 1024 * 1024 * 1024, 1024 * 1024 * 1024 * 1024];

    // 确保输入和输出单位都是有效的
    if (!units.includes(inputUnit) || !units.includes(outputUnit)) {
        throw new Error('Invalid unit. Valid units are: ' + units.join(', '));
    }

    // 获取输入和输出单位对应的因子
    const inputFactorIndex = units.indexOf(inputUnit);
    const outputFactorIndex = units.indexOf(outputUnit);
    const inputFactor = unitFactors[inputFactorIndex];
    const outputFactor = unitFactors[outputFactorIndex];

    // 转换并计算输出值
    return (value / inputFactor) * outputFactor;
}

