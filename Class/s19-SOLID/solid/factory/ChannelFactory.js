import { EmailChannel } from "../channels/EmailChannel";
import { SMSChannel } from "../channels/SmsChannel";
export class ChannelFactory {
    static createChannel(type) {
        switch(type) {
            case 'SMS':
            return new SMSChannel();
            case 'EMAIL':
                return new EmailChannel();
            default:
                throw new Error("Unsupported channel tyle!");
        }
    }
}