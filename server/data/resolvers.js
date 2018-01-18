const GraphQLDate = require('graphql-date');
const { Group, User, Message } = require('./connectors');

const Resolvers = {
  Date: GraphQLDate,
  Query: {
    group(_, args) {
      return Group.find({ where: args });
    },
    messages(_, args) {
      return Message.findAll({
        where: args,
        order: [['createdAt', 'DESC']],
      });
    },
    user(_, args) {
      return User.findOne({ where: args });
    },
  },
  Group: {
    users(group) {
      return group.getUsers();
    },
    messages(group) {
      return Message.findAll({
        where: { groupId: group.id },
        order: [['createdAt', 'DESC']],
      });
    },
  },
  Message: {
    to(message) {
      return message.getGroup();
    },
    from(message) {
      return message.getUser();
    },
  },
  User: {
    messages(user) {
      return Message.findAll({
        where: { userId: user.id },
        order: [['createdAt', 'DESC']],
      });
    },
    groups(user) {
      return user.getGroups();
    },
    friends(user) {
      return user.getFriends();
    },
  },
};
// const Resolvers = {
//   Query: {
//     user: async (_, {_id, email}) =>  await User.findOne({ $or: [ { _id }, { email }] })
//   },
//   User: {
//     messages: async(user) => await Message.find({ $or: [ { from: user._id }, { to: user._id }]}),
//     groups: async (user) => await Groups.find({ users: user._id }),
//     friends: async (user) => await Users.find({ _id: { $in: user.friends }})
//   },
// };

module.exports = Resolvers;