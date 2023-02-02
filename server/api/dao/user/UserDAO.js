'use strict';

import { DataTypes, Op } from 'sequelize';

export default function UserDAO (deps) {
  
  const { dbConnector } = deps;

  dbConnector.getMainDb().getSchema().define('UserDAO', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get () {
        return `${this.name} ${this.surname}`;
      },
      set (value) {
        throw new Error('fullName is a virtual field');
      }
    },
    email: {
      type: DataTypes.STRING(96),
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    otp: DataTypes.INTEGER,
    otpExpiration: DataTypes.DATE,
    birthday: DataTypes.DATEONLY,
    phone: {
      type: DataTypes.STRING(20),
      validate: {
        validatePhone: function (value) {
          if (!/^\d{9}$/i.test(value) && !/^(([+]|0+)\d{1,3}\s?)?\d{9}$/i.test(value)) {
            throw new Error('Phone not valid');
          }
        }
      }
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    observations: DataTypes.TEXT,
  }, {
    tableName: 'user',
    scopes: {
      allStatus: {
        attributes: { exclude: [ 'password' ] },
      },
      activeStatus: {
        attributes: { exclude: [ 'password' ] },
        where: {
          status: 1
        },
      },
      session: {
        where: {
          status: 1
        },
      }
    },
    defaultScope: {
      attributes: { exclude: [ 'password' ] },
      where: {
        status: 1
      }
    },
    getterMethods: {
      fullName () {
        return `${this.name} ${this.surname}`;
      },
    },
    schema: dbConnector.getMainDb().getSchema().options.schema,
  });

  return Object.assign({}, dbConnector.getMainDb().abstractDAO(UserDAO), {

    makeAssociations () {

      const {
        UserDAO,
        ProfileDAO,
        ResourceDAO,
      } = dbConnector.getMainDb().getSchema().models;

      UserDAO.belongsTo(ProfileDAO, {
        foreignKey: 'profileId',
        as: 'profile',
      });

      UserDAO.belongsTo(ResourceDAO, {
        foreignKey: 'resourceId',
        as: 'userResource',
      });

    }
    
  });

}