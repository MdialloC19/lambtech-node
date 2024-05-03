import { Model} from "sequelize";
import bcrypt from "bcrypt";
import { randomString } from "../utils/common.utils.js";
const Account = (sequelize, DataTypes) => {
    class Account extends Model {
        static associate(models) {
            // define association here
        }

        static addHooks(models) {

        }
    }


    Account.init(
        {
            userId: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: {
                        args: true,
                        msg: "Email must be a valid email",
                    },
                },
            },
            username: {
                type: DataTypes.STRING,
                validate: {
                    isAlphanumeric: {
                        args: true,
                        msg: "Username must be alphanumeric",
                    },
                }
            },
            phone: {
                type: DataTypes.STRING,
                validate: {
                    is: {
                        args: /^[0-9]+$/i,
                        msg: "Phone number must be a valid number",
                    },
                },
            },
            countryCode: {
                type: DataTypes.STRING,
                defaultValue: "221",
            },
            role: {
                type: DataTypes.ENUM,
                defaultValue: "user",
                values: ["user", "costumer", "deliverer", "partner", "admin"],
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [8, 24],
                        msg: "Password must be between 8 and 24 characters",
                    },
                },
            },
        },
        {
            sequelize,
            modelName: "Account",
        }
    );

    Account.addHook("beforeCreate", async (account, options) => {
        account.userId = randomString(32);
        account.password = await bcrypt.hash(account.password, 10);
    });


    return Account;
}

export default Account;