import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('postgres://nmdrinkbook:nmdrinkbook@localhost:5432/nmdrinkbook')