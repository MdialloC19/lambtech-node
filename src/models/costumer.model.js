import { Model} from "sequelize";
import {randomString} from "../utils/common.utils.js";


const Costumer = (sequelize, DataTypes) => {
    class Costumer extends Model {
        static associate(models) {
            // define association here
            this.belongsTo(models["Account"], {
                foreignKey: 'account',
                as: 'userId',
            });
            this.hasMany(models["Order"], {
                foreignKey: 'costumerId',
                as: 'orders',
            });
        }

        static addHooks(models) {
            this.addHook("beforeCreate", (costumer) => {
                costumer.costumerId = randomString(32);
            });
        }
    }
    Costumer.init(
        {
            // key fields
            costumerId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            account: DataTypes.STRING,
            socketId: {
                type: DataTypes.STRING,
            },
            //orders: DataTypes.ARRAY(DataTypes.STRING),
        },
        {
            sequelize,
            modelName: 'Costumer',
            paranoid: true,
        }
    );



    Costumer.beforeCreate((costumer, options) => {
        costumer.costumerId = randomString(32);
    });

    return Costumer;
}

export default Costumer;