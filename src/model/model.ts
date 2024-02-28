import { Relationships } from "https://deno.land/x/denodb@v1.4.0/lib/relationships.ts";
import { Model, DataTypes } from "https://deno.land/x/denodb@v1.4.0/mod.ts";
import { db } from "../config/client.ts";

export class User extends Model {
  static table = 'users';

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    full_name: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    roles: DataTypes.enum(['SELLER', 'BUYER']),
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      length: 50,
    },
    password: DataTypes.STRING,
    created_at: {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
      default: new Date().toISOString(),
    },
    updated_at: {
      type: DataTypes.TIMESTAMP,
      allowNull: true
    }
  };

  static async addresses() {
    return await this.hasMany(Address);
  }
}
  
export class Address extends Model {
  static table = 'address';

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    postal_code: DataTypes.INTEGER,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
  };

  static async user() {
    return await this.hasOne(User);
  }
}

Relationships.belongsTo(Address, User);
db.link([User, Address])
db.sync({drop: true})