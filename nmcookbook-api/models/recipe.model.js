import { sequelize } from '../database.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg

export default class Recipe extends Model{}
Recipe.init({
    recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    stateId: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    preparationSteps: {
        type: DataTypes.STRING
    },
    preparationTime: {
        type: DataTypes.INTEGER
    },
    difficultyLevel: {
        type: DataTypes.INTEGER
    },
    image: {
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
    modelName: 'Recipe',
    tableName: 'recipe',
    timestamps: true,
    updatedAt: 'modifiedAt'
});
