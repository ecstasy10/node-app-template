'use strict';

import { DataTypes } from 'sequelize';

export default function PermissionPageDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(PermissionPageDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    tableName: 'permission_page',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(PermissionPageDAO), {

  });

}