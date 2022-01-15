import { sequelize } from '../config.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg

export default class MostPopularArticles extends Model{}
MostPopularArticles.init({
    article: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    count: {
        type: DataTypes.NUMBER
    }
}, {
    sequelize,
    modelName: 'MostPopularArticles',
    tableName: 'MostPopularArticles',
    timestamps: false,
    
});
