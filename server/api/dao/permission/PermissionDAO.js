'use strict';

import { DataTypes } from 'sequelize';

export default function  PermissionDAO (deps) {

  const { dbConnector } = deps;

  dbConnector.getMainDb().getSchema().define(PermissionDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    tableName: 'permission',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(PermissionDAO), {

    makeAssociations () {

      const {
        PermissionDAO,
        PermissionPageDAO,
        PageDAO,
        EndpointDAO,
        RoleDAO,
        RolePermissionDAO,
      } = dbConnector.getMainDb().getSchema().models;

      PermissionDAO.belongsToMany(PageDAO, {
        through: PermissionPageDAO,
        foreignKey: 'permissionId',
        otherKey: 'pageId',
        as: 'permissionPages',
      });

      PermissionDAO.belongsToMany(RoleDAO, {
        through: RolePermissionDAO,
        foreignKey: 'permissionId',
        otherKey: 'roleId',
        as: 'roles',
      });

      PermissionDAO.hasMany(EndpointDAO, {
        foreignKey: 'permissionId',
        as: 'permissionEndpoints',
      });

    }

  });

}