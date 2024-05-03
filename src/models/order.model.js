import { Model } from 'sequelize';
import {randomString} from "../utils/common.utils.js";


const Order = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            this.belongsTo(models['Costumer'], {
                foreignKey: 'costumer',
                as: 'costumerId',
            });

            this.belongsTo(models['Deliverer'], {
                foreignKey: 'deliverer',
                as: 'delivererId',
            });
        }

        static addHooks(models) {

        }
    }

    Order.init(
        {
            // key fields
            orderId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            deliverer: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            costumer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                defaultValue: new Date(),
            },
            from: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            to: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM,
                values: ["pending", "accepted", "expired", "canceled", "delivered"],
                defaultValue: "pending",
            },
        },
        {
            sequelize,
            modelName: 'Order',
        }
    );

    Order.beforeCreate((order, options) => {
        order.orderId = randomString(32);
    });
    return Order;
}

export default Order;