import prisma from "../prisma/prismaClient.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!content && !image) {
      return res.status(400).json({
        message: "Content or image is required",
      });
    }

    const post = await prisma.post.create({
      data: {
        content: content || "",
        image,
        authorId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const commentId = Number(req.params.id);

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.userId !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own comments",
      });
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.json({
      message: "Comment deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Get All Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: {
  include: {
    user: {
      select: {
        id: true,
        name: true,
      },
    },
  },
},
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Like / Unlike Post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    const existingLike = await prisma.like.findFirst({
      where: {
        postId: Number(id),
        userId: req.user.id,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return res.json({
        message: "Post unliked",
      });
    }

    await prisma.like.create({
      data: {
        postId: Number(id),
        userId: req.user.id,
      },
    });

    res.json({
      message: "Post liked",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const comment = await prisma.comment.create({
      data: {
        text,
        postId: Number(id),
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const deletePost = async (req, res) => {
  try {
    const postId = Number(req.params.id);

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId !== req.user.id) {
      return res.status(403).json({ message: "You can delete only your own posts" });
    }

    // Delete comments first
    await prisma.comment.deleteMany({
      where: { postId },
    });

    // Delete likes
    await prisma.like.deleteMany({
      where: { postId },
    });

    // Delete post
    await prisma.post.delete({
      where: { id: postId },
    });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};