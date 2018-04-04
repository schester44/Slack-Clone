export default (sequelize, DataTypes) => {
	const User = sequelize.define("user", {
		username: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isAlphanumeric: {
					args: true,
					msg: "The username can only contain alphanumeric characters"
				},
				len: {
					args: [2, 25],
					msg: "The username must be between 2 and 25 characters long."
				}
			}
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			validate: {
				isEmail: {
					args: true,
					msg: "Invalid email"
				}
			}
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				len: {
					args: [4, 100],
					msg: "The password must be between 4 and 100 characters long"
				}
			}
		}
	})

	User.associate = models => {
		User.belongsToMany(models.Team, {
			through: "member",
			foreignKey: "userId"
		})

		User.belongsToMany(models.Channel, {
			through: "channel_member",
			foreignKey: "userId"
		})
	}

	return User
}
