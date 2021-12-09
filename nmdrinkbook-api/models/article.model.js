import { sequelize } from '../config.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg

export default class Article extends Model{}
Article.init({
    articleId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    articleName: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    alcoholVolume: {
        type: DataTypes.NUMBER
    },
    createdBy: {
        type: DataTypes.STRING
    },
    modifiedBy: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Article',
    tableName: 'article',
    timestamps: true,
    updatedAt: 'modifiedAt'
});
