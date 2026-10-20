export class AlertRepository {
    async save(sensorData) {
        console.log(`INSERT INTO alerts (sensor_id, reading) VALUES (${sensorData.id}, ${sensorData.reading})`);
        return {id: Date.now(), ...sensorData, savedAt: new Date() };
        

    }

    saveToFile(sensorData) {
        const logLine = `${new Date().toISOString} - ${sensorData.id} - ${sensorData.reading}\n`;
        fs.appendFileSync('./alerts.log', logLine);
    }

}