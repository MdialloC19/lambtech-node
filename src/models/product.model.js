import { Model } from 'sequelize';
import {randomString} from "../utils/common.utils.js";
import Account from "./account.model.js";
import bcrypt from "bcrypt";

const Product = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {

        }

        static addHooks(models) {

        }
    }


    Product.init(
        {
            // key fields
            productId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            order: DataTypes.STRING,
            // required fields
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            list: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Product',
        }
    );

    Product.addHook("beforeCreate", async (product, options) => {
        product.productId = randomString(32);
    });

    return Product;
}

export default Product;