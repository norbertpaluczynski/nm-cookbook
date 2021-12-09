import { sequelize } from '../config.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg

export default class Unit extends Model{}
Unit.init({
    unitId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    symbol: {
        type: DataTypes.STRING
    },
    createdBy: {
        type: DataTypes.STRING
    },
    modifiedBy: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Unit',
    tableName: 'unit',
    timestamps: true,
    updatedAt: 'modifiedAt'
});
