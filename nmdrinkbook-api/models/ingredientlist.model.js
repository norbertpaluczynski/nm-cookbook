import { sequelize } from '../config.js'
import pkg, { Sequelize } from 'sequelize'
const { DataTypes, Model } = pkg

export default class IngredientList extends Model{}
IngredientList.init({
    recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    ingredientId: {
        type: DataTypes.UUID
    },
    articleId: {
        type: DataTypes.STRING
    },
    unitId: {
        type: DataTypes.STRING
    },
    articleName: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    alcoholVolume: {
        type: DataTypes.DECIMAL
    },
    symbol: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.DECIMAL
    }
}, {
    sequelize,
    modelName: 'IngredientList',
    tableName: 'IngredientList',
    timestamps: false
});
