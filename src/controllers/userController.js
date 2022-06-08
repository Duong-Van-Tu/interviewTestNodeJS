import User from '../modals/UserModal.js';
import { validateUserInfo } from '../validates/validateUser.js';

class UserController {
    // create user
    async create(req, res) {
        const { firstName, lastName, age, coordinate } = req.body;
        if (!validateUserInfo(req.body)) {
            const user = new User({ firstName, lastName, age, coordinate });
            const createUser = await user.save();
            return res.status(200).json({
                success: true,
                data: createUser,
            });
        } else {
            return res.status(400).json({
                success: false,
                error: validateUserInfo(req.body),
            });
        }
    }

    // search user by id
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.query.id });
            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: 'User not found',
                });
            }

            return res.status(400).json({
                success: true,
                data: user,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: `server internal error: ${error.message}`,
            });
        }
    }

    // search by name
    async searchUser(req, res) {
        // query
        try {
            const name = req.query.name || '';

            // params by firstName
            const nameFilter = name
                ? { lastName: { $regex: name, $options: 'i' } }
                : {};

            // search user
            const user = await User.find({ ...nameFilter }).sort({
                firstName: -1,
            });

            // user not found
            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: 'User not found',
                });
            }

            return res.status(400).json({
                success: true,
                data: user,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: `server internal error: ${error.message}`,
            });
        }
    }

    // edit user
    async editUser(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findOne({ _id: id });

            // user not found
            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: 'User not found',
                });
            }

            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.age = req.body.age || user.age;
            user.coordinate = req.body.coordinate || user.coordinate;
            const userUpdate = await user.save();

            return res.status(200).json({
                success: true,
                data: userUpdate,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: `server internal error: ${error.message}`,
            });
        }
    }

    // delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id });
            // user not found
            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: 'User not found',
                });
            }

            const userDelete = await user.remove();
            return res.status(200).json({
                success: true,
                data: userDelete,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: `server internal error: ${error.message}`,
            });
        }
    }

    //find list users near userId
    async searchUserNearlocateUserId(req, res) {
        try {
            const userId = req.query.userId;
            const userWithId = await User.findOne({ _id: userId });

            // user not found
            if (!userWithId) {
                return res.status(400).json({
                    success: false,
                    error: 'User not found',
                });
            }

            // user list
            const userList = await User.find({});

            // user with distance
            const userWithDistances = userList
                .map((user) => {
                    const coordinate = user.coordinate.split(':');
                    const coordinateUserId = userWithId.coordinate.split(':');
                    if (user._id !== userWithId._id) {
                        const x =
                            parseInt(coordinate[0]) -
                            parseInt(coordinateUserId[0]);
                        const y =
                            parseInt(coordinate[1]) -
                            parseInt(coordinateUserId[1]);

                        // calculate distance
                        const distance = Math.floor(Math.sqrt(y * y + x * x));

                        return {
                            ...user._doc,
                            distanceWithUserId: distance,
                        };
                    }
                })
                .filter((user) => user.distanceWithUserId)
                .sort((a, b) => a.distanceWithUserId - b.distanceWithUserId);

            // Function handle list of users near userId
            const resultsGetUserNearUserId = () => {
                let users = [];
                const n = parseInt(req.query.n);

                if (!req.query.n) {
                    for (let i = 0; i < userWithDistances.length; i++) {
                        users.push(userWithDistances[i]);
                    }
                }

                if (n <= userWithDistances.length) {
                    for (let i = 0; i < n; i++) {
                        users.push(userWithDistances[i]);
                    }
                }
                return users;
            };

            // error: n must be less than the list users
            if (resultsGetUserNearUserId().length === 0) {
                return res.status(400).json({
                    success: false,
                    error: `n must <= ${userWithDistances.length}`,
                });
            }

            return res.status(200).json({
                success: true,
                data: resultsGetUserNearUserId(),
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: `server internal error: ${error.message}`,
            });
        }
    }
}

export default new UserController();
