'use strict';

import { DataTypes } from 'sequelize';

export default function RolePermissionDAO (deps) {

  const { dbConnector } = deps;

  dbConnector.getMainDb().getSchema().define(RolePermissionDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    tableName: 'role_permission',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(RolePermissionDAO), {

  });

}