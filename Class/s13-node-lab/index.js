// TODO 1: Import built-in Node modules (os, fs/promises, path)}

import os from 'os';
import fs from 'fs-extra';
// const os = require('os');

import chalk from 'chalk';

async function generateTelemetryReport() {
    console.log("Initializing Node.js Telemetry Engine...");

    try {
        // ==========================================
        // 1. HARVEST SYSTEM TELEMETRY (Built-in 'os' module)
        // ==========================================
        // TODO: Get CPU architecture, platform, free memory (in MB), and system uptime (in hours)
        const platform = os.platform();
        const freeMemMB = (os.freemem() / (1024 * 1024)) .toFixed(0);
        const uptimeHours = (((os.uptime() / 60) / 60) .toFixed(1));
        const cpuModel = os.cpus()[0].model;
        const totalMem = (os.totalmem() / (1024 * 1024)) .toFixed(0);

        // ==========================================
        // 2. RENDER FORMATTED TERMINAL LOGS (Third-Party 'chalk')
        // ==========================================
        // TODO: Print a colorful status report to the terminal using chalk colors
        console.log("==========================================");
        console.log("         SYSTEM & ENV TELEMETRY           ");
        console.log("==========================================");
        // Print Platform, Free Memory, and Uptime with custom colors
        console.log(`${chalk.bold("OS Platform:")}      ${chalk.yellow(platform)}`);
        console.log(`${chalk.bold("Free memory:")}      ${chalk.green(freeMemMB)}`);
        console.log(`${chalk.bold("CPU Model:")}      ${chalk.magenta(cpuModel)}`);
        console.log(`${chalk.bold("Uptime Hours:")}      ${chalk.yellow(uptimeHours)}`);
        console.log(`${chalk.bold("Total memory:")}      ${chalk.green(totalMem)}`);
        console.log(`${chalk.bold("Used memory:")}      ${chalk.red(totalMem - freeMemMB)}`);


        // ==========================================
        // 3. WRITE PERMANENT LOG FILE (Built-in 'fs/promises')
        // ==========================================
        const logEntry = `[${new Date().toISOString()}] PLATFORM: ${platform} | FREEMEM: ${freeMemMB}MB | CPU MODEL: ${cpuModel} | Uptime Hrs: ${uptimeHours} | TOTALMEM: ${totalMem}MB | USEDMEM: ${totalMem - freeMemMB}MB`;
        // TODO: Append logEntry to 'telemetry.log' using fs.appendFile()
        await fs.appendFile('telemetry.log', logEntry + '\n');
        console.log("Writing log entry to disk...");

        console.log("Telemetry audit completed successfully!");

    } catch (error) {
        console.error("Telemetry report generation failed:", error.message);
    }
}

// Execute engine
generateTelemetryReport();