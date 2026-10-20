export class AlertFormatter {
   static formatText(sensorData) {
        return `[ALERT] Sensor ${sensorData.id} exceeded limit! Value: ${sensorData.reading}`;
   }

   static formatHtml(sensorData) {
    return `
        <div style="border: 2px solid red; padding: 15px; font-family: sans-serif;">
            <h2 style="color: red;">critical alrt</h2>
            <p>id: <strong>${sensorData.id}</strong><p>
            <p>recorded value: <strong> ${sensorData.reading}</strong></p>
            <p>timestamp: ${new Date().toLocaleString()}</p>
        </div>
    `;
   }
   static formatSocialMedia(sensorData) {
    
   }
}