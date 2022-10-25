'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'user',
        {
          id: {
            type: Sequelize.CHAR(36),
            primaryKey: true,
          },
          email: {
            validate: {
              isEmail: true,
            },
            unique: true,
            allowNull: false,
            type: Sequelize.STRING,
          },
          first_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          last_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          phone: {
            unique: true,
            allowNull: true,
            type: Sequelize.STRING(15),
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
          deleted_at: Sequelize.DATE,
        },
        { charset: 'utf8', collate: 'utf8_general_ci', transaction: t },
      );
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },

  down: async (queryInterface) => {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('user');
      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  },
};
