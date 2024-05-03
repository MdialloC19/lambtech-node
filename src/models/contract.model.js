import { Model} from "sequelize";
import {randomString} from "../utils/common.utils.js";


const Contract = (sequelize, DataTypes) => {
    class Contract extends Model {
        static associate(models) {
            this.belongsTo(models["Deliverer"], {
                foreignKey: 'deliverer',
                as: 'delivererId',
            });

            this.belongsTo(models["Partner"], {
                foreignKey: 'partner',
                as: 'partnerId',
            });
        }

        static addHooks(models) {
            this.addHook("beforeCreate", (contract) => {
                contract.contractId = randomString(32);
            });
        }
    }

    Contract.init(
        {
            // key fields
            contractId: {
                type: DataTypes.STRING,
                autoIncrement: true,
                primaryKey: true,
            },
            partner: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deliverer: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // required fields
            startDate: DataTypes.DATE,
            endDate: DataTypes.DATE,
            status: {
                type: DataTypes.ENUM,
                values: ["pending", "active", "expired", "rejected", "canceled", "interrupted"],
                defaultValue: "pending",
            },
        },
        {
            sequelize,
            modelName: 'Contract',
        }
    );

    Contract.beforeCreate((contract, options) => {
        contract.contractId = randomString(32);
    });

    return Contract;
}

export default Contract;
