import { sequelize } from '../config.js'
import pkg, { Sequelize } from 'sequelize'
const { DataTypes, Model } = pkg

export default class RecipeHeader extends Model{}
RecipeHeader.init({
    recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING
    },
    stateId: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    preparationSteps: {
        type: DataTypes.STRING
    },
    preparationTime: {
        type: DataTypes.DECIMAL
    },
    difficultyLevel: {
        type: DataTypes.INTEGER
    },
    image: {
        type: DataTypes.STRING
    },
    views: {
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.DECIMAL
    }
}, {
    sequelize,
    modelName: 'RecipeHeader',
    tableName: 'RecipeHeader',
    timestamps: false
});
