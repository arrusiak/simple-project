import { TableOptions } from 'sequelize-typescript';

export const tableOptions: TableOptions = {
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  version: false,
} as TableOptions;
