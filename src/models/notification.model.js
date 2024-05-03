import { Model } from 'sequelize';
import {randomString} from "../utils/common.utils.js";


const Notification = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {

        }

        static NOTIFICATION_STATUS = {
            UNREAD: 'UNREAD',
            READ: 'READ',
        }

        static NOTIFICATION_STATUS_VALUES = Object.values(Notification.NOTIFICATION_STATUS);

        static NOTIFICATION_LIST = [
            'new order',
            'order status',
            'deliverer status',
            'contract',
            'message',
            'notification',
        ]

        static addHooks(models) {
            this.addHook("beforeCreate", (notification) => {
                notification.notificationId = randomString(32);
            });
        }
    }


    Notification.init(
        {
            // key fields
            notificationId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            user: DataTypes.STRING,
            role: {
                type: DataTypes.ENUM,
                values: ['costumer', 'deliverer', 'partner'],
            },
            title: {
                type: DataTypes.ENUM,
                values: Notification.NOTIFICATION_LIST,
            },
            action: {
                type: DataTypes.ENUM,
                values: ['accept', 'reject'],
            },
            message: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM,
                values: Notification.NOTIFICATION_STATUS_VALUES,
                defaultValue: Notification.NOTIFICATION_STATUS.UNREAD,
            },
        },
        {
            sequelize,
            modelName: 'Notification',
        }
    );

    Notification.beforeCreate((notification, options) => {
        notification.notificationId = randomString(32);
    });
    return Notification;
}

export default Notification;