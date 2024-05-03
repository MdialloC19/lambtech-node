import { Model} from "sequelize";
import {randomString} from "../utils/common.utils.js";

const Deliverer = (sequelize, DataTypes) => {
    class Deliverer extends Model {
        static associate(models) {
            // define association here
            this.belongsTo(models["Account"], {
                foreignKey: 'account',
                as: 'userId',
            })
            this.hasMany(models["Order"], {
                foreignKey: 'delivererId',
                as: 'orders',
            });
        }

        static addHooks(models) {
            this.addHook("beforeCreate", (costumer) => {
                costumer.costumerId = randomString(32);
            });
        }
    }

    Deliverer.init(
        {
            // key fields
            delivererId: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
            },
            account: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            socketId: {
                type: DataTypes.STRING,
            },
            vehicle: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            vehiclePlate: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cni: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            driverLicense: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            //orders: DataTypes.ARRAY(DataTypes.STRING),
        },
        {
            sequelize,
            modelName: 'Deliverer',
        }
    );

    Deliverer.beforeCreate((deliverer, options) => {
        deliverer.delivererId = randomString(32);
    });
    return Deliverer;
}

export default Deliverer;