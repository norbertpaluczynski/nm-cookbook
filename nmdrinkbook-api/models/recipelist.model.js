import { sequelize } from '../config.js'
import pkg, { Sequelize } from 'sequelize'
const { DataTypes, Model } = pkg

export default class RecipeList extends Model{}
RecipeList.init({
    recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    preparationTime: {
        type: DataTypes.INTEGER
    },
    difficultyLevel: {
        type: DataTypes.INTEGER
    },
    views: {
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.DECIMAL
    },
    categories: {
        type: DataTypes.STRING
    },
    createdBy: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'RecipeList',
    tableName: 'RecipeList',
    timestamps: false,
    updatedAt: 'modifiedAt'
});
