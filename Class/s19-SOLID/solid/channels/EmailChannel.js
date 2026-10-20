import { INotificationChannel } from "../interfaces/iNotificationChannel";

export class EmailChannel extends INotificationChannel {
    async send(recipient, payload) {
        console.log(`Sending Email to ${recipient}: ${payload.MainBody}`);
        return { success: true, channel: 'Email'};
    }
}