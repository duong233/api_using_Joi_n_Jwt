const mongoose = require('mongoose');
const { DATE, DataTypes } = require('sequelize/types');

const taskSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        }    
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Task', taskSchema);