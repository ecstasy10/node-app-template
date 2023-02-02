'use strict';

import { DataTypes } from 'sequelize';

export default function ResourceDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(ResourceDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: DataTypes.STRING,
    description: DataTypes.TEXT,
    icon: DataTypes.STRING,
  }, {
    tableName: 'resource',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(ResourceDAO), {

  });

}