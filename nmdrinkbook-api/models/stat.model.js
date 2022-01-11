import { sequelize } from '../config.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg

export default class Stat extends Model{}
Stat.init({
    statId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    recipeId: {
        type: DataTypes.UUID
    },
    views: {
        type: DataTypes.INTEGER
    },
    createdBy: {
        type: DataTypes.STRING
    },
    modifiedBy: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Stat',
    tableName: 'stat',
    timestamps: true,
    updatedAt: 'modifiedAt'
});
