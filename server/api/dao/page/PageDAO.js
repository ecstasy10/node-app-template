'use strict';

import { DataTypes } from 'sequelize';

export default function PageDAO (deps) {

  const {
    dbConnector,
  } = deps;

  dbConnector.getMainDb().getSchema().define(PageDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    tableName: 'page',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(PageDAO), {

  });

}