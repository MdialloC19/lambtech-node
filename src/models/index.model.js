import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { Sequelize, DataTypes} from "sequelize";
import dbConfig from "../../config/config.js";


const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];
const db = {};
const __filename = fileURLToPath(import.meta.url);
const basename = path.basename(__filename);


let sequelize;
if (env === "development") {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
} else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: "mysql",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    });
}

const __dirname = path.dirname(__filename);
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach( async (file) => {
        //import model from file
        const model = await import("./" + file).then((module) => module.default);
        if (model instanceof Function)
            db[model.name] = model(sequelize, DataTypes);
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }

    if (db[modelName].addHooks) {
        db[modelName].addHooks(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;
