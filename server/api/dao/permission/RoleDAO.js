'use strict';

import { DataTypes, Op } from 'sequelize';

export default function RoleDAO (deps) {

  const { dbConnector } = deps;

  dbConnector.getMainDb().getSchema().define(RoleDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    tableName: 'role',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(RoleDAO), {

    makeAssociations () {

      const {
        RoleDAO,
        RolePermissionDAO,
        PermissionDAO,
        ProfileDAO,
        ProfileRoleDAO,
      } = dbConnector.getMainDb().getSchema().models;

      RoleDAO.belongsToMany(PermissionDAO, {
        through: RolePermissionDAO,
        foreignKey: 'roleId',
        otherKey: 'permissionId',
        as: 'permissions',
      });

      RoleDAO.belongsToMany(ProfileDAO, {
        through: ProfileRoleDAO,
        foreignKey: 'roleId',
        otherKey: 'profileId',
        as: 'profiles',
      });

    }

  });

}