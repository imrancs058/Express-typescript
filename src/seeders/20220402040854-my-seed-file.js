'use strict';
const { hash } = require("bcrypt");

module.exports = {
  up : async (queryInterface, Sequelize)=> {
    const hashedPassword = await hash('#Admin123', 10);
    return queryInterface.bulkInsert(
      'users',
      [
        {
      email : 'admin@xyz.com',
      password : hashedPassword,
      name : 'Admin Person',
      role :'admin',
      created_at: new Date(),
      updated_at: new Date()

    },
      {
        email : 'user@xyz.com',
        password : hashedPassword,
        name : 'User Person',
        role : 'user',
        created_at: new Date(),
        updated_at: new Date()

      }], {});
  },
  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', [{
      first_name :'John'
    }])
  }

};

//sequelize db:seed:all in src
