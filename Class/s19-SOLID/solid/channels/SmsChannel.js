import { INotificationChannel } from "../interfaces/iNotificationChannel";

export class SMSChannel extends INotificationChannel {
    async send(recipient, payload) {
        console.log(`Sending SMS to ${recipient}: ${payload.textMessage}`);
        return { success: true, channel: 'SMS'};
    }
}