import { Model } from 'sequelize';
import {randomString} from "../utils/common.utils.js";


const Message = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models) {
            this.belongsTo(models.Account, {
                foreignKey: 'userId',
                as: 'account',
            })
            this.belongsTo(models.Deliverer, {
                foreignKey: 'delivererId',
                as: 'deliverer',
            });
        }

        static addHooks(models) {
            this.addHook("beforeCreate", (message) => {
                message.messageId = randomString(32);
            });
        }
    }


    Message.init(
        {
            // key fields
            messageId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            sender: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            receiver: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            senderRole: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: ["costumer", "deliverer", "partner"],
            },
            receiverRole: {
                type: DataTypes.ENUM,
                allowNull: false,
                values: ["costumer", "deliverer", "partner"],
            },
            // required fields
            message: DataTypes.STRING,
            status: {
                type: DataTypes.ENUM,
                defaultValue: "sent",
                values: ["sent", "delivered", "read"],
            },
        },
        {
            sequelize,
            modelName: 'Message',
        }
    );

    Message.beforeCreate((message, options) => {
        message.messageId = randomString(32);
    });
    return Message;
}

export default Message;