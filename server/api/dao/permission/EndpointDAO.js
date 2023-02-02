'use strict';

import { DataTypes } from 'sequelize';

export default function EndpointDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(EndpointDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    method: DataTypes.STRING,
    url: DataTypes.STRING,
  }, {
    tableName: 'endpoint',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(EndpointDAO), {

    makeAssociations () {

      const {
        EndpointDAO,
        PermissionDAO,
      } = dbConnector.getMainDb().getSchema().models;

      EndpointDAO.belongsTo(PermissionDAO, {
        foreignKey: 'permissionId',
        as: 'endpointPermission',
      });

    }

  });

}