'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addColumn(
      'Doctors', // name of Source model
      'serviceId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Services', // name of Target model
          key: 'serviceId', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'Doctors', // name of Source model
        'practiceId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', // name of Target model
            key: 'practiceId', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        'Bookings', // name of Source model
        'serviceId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Services', // name of Target model
            key: 'serviceId', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        'Bookings', // name of Source model
        'doctorId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Doctors', // name of Target model
            key: 'doctorId', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    })
    .then(() => {
      return queryInterface.addColumn(
        'Services', // name of Source model
        'practiceId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', // name of Target model
            key: 'practiceId', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn(
      'Doctors', // name of Source model
      'serviceId' // key we want to remove
    )
    .then(() => {
      return queryInterface.removeColumn(
        'Doctors', // name of Source model
        'practiceId' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Services', // name of Source model
        'practiceId' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Bookings', // name of Source model
        'serviceId' // key we want to remove
      );
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Bookings', // name of Source model
        'doctorId' // key we want to remove
      );
    });
  }
};