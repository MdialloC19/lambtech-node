import { Model} from "sequelize";
import {randomString} from "../utils/common.utils.js";


const Geolocation = (sequelize, DataTypes) => {
    class Geolocation extends Model {
        static associate(models) {
            // define association here
        }

        static addHooks(models) {

        }
    }



    Geolocation.init(
        {
            // key fields
            geolocationId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            role: {
                type: DataTypes.STRING,
                defaultValue: "deliverer",
                enumerable: ["costumer", "deliverer", "partner"],
            },
            user: {
                type: DataTypes.STRING,
            },
            // required fields
            socketId: DataTypes.STRING,
            latitude: DataTypes.DOUBLE,
            longitude: DataTypes.DOUBLE,
        },
        {
            sequelize,
            modelName: 'Geolocation',
        }
    );

    Geolocation.beforeCreate((geolocation, options) => {
        geolocation.geolocationId = randomString(32);
    });

    return Geolocation;
}

export default Geolocation;