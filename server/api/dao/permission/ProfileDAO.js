'use strict';

import { DataTypes, Op } from 'sequelize';

export default function ProfileDAO (deps) {

  const { dbConnector } = deps;

  dbConnector.getMainDb().getSchema().define(ProfileDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    tableName: 'profile',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });
  return Object.assign({}, dbConnector.getMainDb().abstractDAO(ProfileDAO), {

    makeAssociations () {

      const {
        UserDAO,
        ProfileDAO,
        ProfileRoleDAO,
        RoleDAO,
      } = dbConnector.getMainDb().getSchema().models;

      ProfileDAO.hasMany(UserDAO, {
        foreignKey: 'profileId',
        as: 'users',
      });

      ProfileDAO.belongsToMany(RoleDAO, {
        through: ProfileRoleDAO,
        foreignKey: 'profileId',
        otherKey: 'roleId',
        as: 'roles',
      });

    }

  });

}