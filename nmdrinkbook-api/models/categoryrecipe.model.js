import { sequelize } from '../config.js'
import pkg, { Sequelize } from 'sequelize'
const { DataTypes, Model } = pkg

export default class CategoryRecipe extends Model{}
CategoryRecipe.init({
    categoryRecipeId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    categoryId: {
        type: DataTypes.UUID
    },
    recipeId: {
        type: DataTypes.UUID
    },    
    createdBy: {
        type: DataTypes.STRING
    },
    modifiedBy: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'CategoryRecipe',
    tableName: 'category_recipe',
    timestamps: true,
    updatedAt: 'modifiedAt'
});
