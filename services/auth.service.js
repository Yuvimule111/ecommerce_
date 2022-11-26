let { userService } = require('./user.service');
let { roleService } = require('./role.service');
<<<<<<< HEAD
=======
let { jwtService } = require('./jwt.service');
>>>>>>> 316a31cd81cfa802c34880601163ae71c46ab6bf
var bcrypt = require("bcryptjs");

class AuthService {
    // Constuctor
    //   this.schema = db.user

    signUp(user, roleNames) {
        user.password = bcrypt.hashSync(user.password, 8);

        return userService
        .createUser(user)
        .then((user) => {
            console.log('user created successfully');
            if(roleNames) {
                roleService
                .findRolesByName(roleNames)
                .then((roles) => {
                    console.log('roles to the user added successfully');
                    user.setRoles(roles);
                });
            } else {
                user.setRoles([2]);
            }
        }).catch((error) => {
            console.log('Error Occurred while creating new user in auth service', error);
            return Promise.reject('Error Occurred while creating user');
        });
    }
<<<<<<< HEAD
=======

    signIn(email, password) {
        return userService.findUserByEmail(email)
        .then((user) => {
            if(user) {
                let isPasswordValid = bcrypt.compareSync(password, user.password);
                if(!isPasswordValid) {
                    return Promise.reject({
                        errorCode: 401,
                        message: 'password is not valid'
                    });
                }

                return user.getRoles()
                .then((roles) => {
                    let roleNames = roles.map((role) => {
                        return role.name;
                    });

                    let token = jwtService.createJwt({
                        id: user.id,
                        roles: roleNames
                    });

                    return {
                        id: user.id,
                        email: user.email,
                        accessToken: token
                    }
                });

            } else {
                return Promise.reject(
                    {
                        errorCode: 401, 
                        message: 'user not found'
                    });
            }
        })
    }
>>>>>>> 316a31cd81cfa802c34880601163ae71c46ab6bf
}

let authService = new AuthService();
module.exports = {
    authService
}