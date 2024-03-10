// const Sequelize = require('sequelize')
//
// module.exports = function (sequelize){
//     return sequelize.define("departments", {
//         id: {
//             type: Sequelize.SMALLINT.UNSIGNED,
//             primaryKey: true,
//             notNull: true
//         },
//         name_of_department: {
//             type: Sequelize.STRING(30)
//         },
//         floor: {
//             type: Sequelize.SMALLINT.UNSIGNED
//         },
//         room_number: {
//             type: Sequelize.SMALLINT.UNSIGNED
//         },
//         manager_name: {
//             type: Sequelize.STRING(30)
//         },
//         manager_patronymic: {
//             type: Sequelize.STRING(15)
//         },
//         manager_surname: {
//             type: Sequelize.STRING(15)
//         }
//     },
//     {
//         timestamps: false,
//         tableName: 'departments'
//     })
// }