import { sequelize } from '../database.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg

export default class Rating extends Model{}
Rating.init({
    ratingId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    recipeId: {
        type: DataTypes.UUID
    },
    userId: {
        type: DataTypes.UUID
    },
    rating: {
        type: DataTypes.NUMBER
    },
    comment: {
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
    modelName: 'Rating',
    tableName: 'rating',
    timestamps: true,
    updatedAt: 'modifiedAt'
});
