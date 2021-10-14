const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { timestamps: true });

  // User.associate = (models) => {
  //   User.hasMany(models.BlogPost, {
  //     foreignKey: 'userId', as: 'users',
  //   });
  // };

  return user;
};

module.exports = User;