const Post = require("../models/Post");
const checkAuth = require("../helpers/checkAuth");
const { UserInputError } = require("apollo-server");

module.exports = {
  Mutation: {
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (!post) {
        throw new UserInputError("Post not found");
      }

      // 방법 1
      //   const likeIndex = post.likes.findIndex(
      //     (like) => like.username === username
      //   );

      //   if (post.likes[likeIndex]) {
      //     post.likes.splice(likeIndex, 1);
      //   } else {
      //     post.likes.push({
      //       username,
      //       createdAt: new Date().toISOString(),
      //     });
      //   }

      // 방법 2
      const foundPost = post.likes.find((like) => like.username === username);

      if (foundPost) {
        post.likes = post.likes.filter((like) => like.username !== username);
      } else {
        post.likes.push({
          username,
          createdAt: new Date().toISOString(),
        });
      }

      await post.save();

      return post;
    },
  },
};
