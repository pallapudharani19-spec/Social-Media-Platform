import prisma from "../prisma/prismaClient.js";

export const followUser = async (req, res) => {
  try {
    const followingId = Number(req.params.id);
    const followerId = req.user.id;

    if (followingId === followerId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const existing = await prisma.following.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });

    if (existing) {
      await prisma.following.delete({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      return res.json({
        message: "User unfollowed",
      });
    }

    await prisma.following.create({
      data: {
        followerId,
        followingId,
      },
    });

    res.json({
      message: "User followed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};