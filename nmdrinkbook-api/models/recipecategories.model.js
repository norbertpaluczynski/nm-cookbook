import { sequelize } from '../config.js'
import pkg, { Sequelize } from 'sequelize'
const { DataTypes, Model } = pkg

export default class RecipeCategories extends Model{}
RecipeCategories.init({
    recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    categoryId: {
        type: DataTypes.UUID
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'RecipeCategories',
    tableName: 'RecipeCategories',
    timestamps: false
});
