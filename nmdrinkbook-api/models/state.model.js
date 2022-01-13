import { sequelize } from '../config.js'
import pkg from 'sequelize'
const { DataTypes, Model } = pkg

export default class State extends Model{}
State.init({
    stateId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'State',
    tableName: 'state',
    timestamps: false
});
