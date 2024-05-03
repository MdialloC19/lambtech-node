import { Model } from 'sequelize';
import {randomString} from "../utils/common.utils.js";

const Location = (sequelize, DataTypes) => {
    class Location extends Model {
        static associate(models) {

        }
    }

    Location.init(
        {
            userId: DataTypes.STRING,
            role: {
                type: DataTypes.ENUM,
                values: ['costumer', 'deliverer', 'partner'],
            },
            address: DataTypes.STRING,
            longitude: DataTypes.DOUBLE,
            latitude: DataTypes.DOUBLE,
            // optional fields
            category: {
                type: DataTypes.ENUM,
                values: ['home', 'work', 'favorite', 'other', 'current'],
                defaultValue: 'other',
            }
        },
        {
            sequelize,
            modelName: 'Location',
        }
    );

    Location.beforeCreate((location, options) => {
        location.locationId = randomString(32);
    });
    return Location;
}

export default Location;