const {Sequelize, Model, DataTypes} = require('sequelize')
const path = require('path')
const sequelize = process.env.NODE_ENV === 'test'
    ? new Sequelize('sqlite::memory', null, null, {dialect: 'sqlite'})
    : new Sequelize({dialect: 'sqlite', storage: path.join(__dirname, 'data.db')})

class Conversation extends Model {}
Conversation.init({
    participant1: DataTypes.STRING,
    participant2: DataTypes.STRING,
    key: DataTypes.STRING,
}, {sequelize: sequelize})

class Message extends Model {}
Message.init({
    participant1: DataTypes.STRING,
    participant2: DataTypes.STRING,
    key: DataTypes.STRING,
}, {sequelize})

Conversation.hasMany(Message, {as: 'messages'})
Message.belongsTo(Conversation)

module.exports = {Conversation, Message, sequelize}