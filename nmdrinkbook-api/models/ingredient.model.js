import { sequelize } from '../config.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg

export default class Ingredient extends Model{}
Ingredient.init({
    ingredientId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    recipeId: {
        type: DataTypes.STRING
    },
    articleId: {
        type: DataTypes.STRING
    },
    unitId: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.DECIMAL
    },
    createdBy: {
        type: DataTypes.STRING
    },
    modifiedBy: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Ingredient',
    tableName: 'ingredient',
    timestamps: true,
    updatedAt: 'modifiedAt'
});
