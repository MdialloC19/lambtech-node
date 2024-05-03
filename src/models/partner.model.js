import { Model } from 'sequelize';
import {randomString} from "../utils/common.utils.js";

const Partner = (sequelize, DataTypes) => {
    class Partner extends Model {
        static associate(models) {
            this.hasMany(models['Contract'], {
                foreignKey: 'partnerId',
                as: 'contracts',
            });
            this.hasMany(models['Product'], {
                foreignKey: 'partnerId',
                as: 'products',
            });
            this.hasMany(models['Location'], {
                foreignKey: 'partnerId',
                as: 'locations',
            });
        }

        static addHooks(models) {
            this.addHook("beforeCreate", (partner) => {
                partner.partnerId = randomString(32);
            });
        }
    }



    Partner.init(
        {
            // key fields
            partnerId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            // required fields
            companyName: DataTypes.STRING,
            companyAddress: DataTypes.STRING,
            companyPhone: DataTypes.STRING,
            contracts: DataTypes.ARRAY(DataTypes.STRING),
            products: DataTypes.ARRAY(DataTypes.STRING),
            locations: DataTypes.ARRAY(DataTypes.STRING),
        },
        {
            sequelize,
            modelName: 'Partner',
        }
    );

    Partner.beforeCreate((partner, options) => {
        partner.partnerId = randomString(32);
    });
    return Partner;
}

export default Partner;