const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,

  }, {
    tableName: 'Users',
    timestamps: false,
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blogpost' });
    // blogpost nesse caso é variavel que armazena o model
    // ja BlogPost é o modulo que armazena as funções
  };

  return user;
};

module.exports = User;

// hasOne
// belongsTo
// hasMany
// belongsToMany
// No caso de relacionamentos 1:1, utilizamos os métodos hasOne e belongsTo . A tradução literal desses métodos facilita o seu entendimento.
// hasOne = tem um
// belongsTo = pertencente a