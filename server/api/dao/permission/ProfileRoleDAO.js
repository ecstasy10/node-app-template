'use strict';

import { DataTypes } from 'sequelize';

export default function ProfileRoleDAO (deps) {

  const { dbConnector } = deps;

  dbConnector.getMainDb().getSchema().define(ProfileRoleDAO.name, {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    tableName: 'profile_role',
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(ProfileRoleDAO), {

  });

}