import { sequelize } from '../database.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg

export default class Category extends Model{}
Category.init({
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
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
    modelName: 'Category',
    tableName: 'category',
    timestamps: true,
    updatedAt: 'modifiedAt'
});
