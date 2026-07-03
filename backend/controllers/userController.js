import prisma from "../prisma/prismaClient.js";

// Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
     select: {
  id: true,
  name: true,
  username: true,
  email: true,
  bio: true,
  profilePicture: true,
  createdAt: true,
  posts: true,
  followers: true,
  following: true,
},
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, username, bio } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        name,
        username,
        bio,
      },
    });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Follow / Unfollow User
export const followUser = async (req, res) => {
  try {
    const targetUserId = Number(req.params.id);
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const existing = await prisma.following.findFirst({
      where: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    });

    if (existing) {
      await prisma.following.delete({
        where: {
          id: existing.id,
        },
      });

      return res.json({
        message: "Unfollowed successfully",
      });
    }

    await prisma.following.create({
      data: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    });

    res.json({
      message: "Followed successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Get Followers
export const getFollowers = async (req, res) => {
  try {
    const followers = await prisma.following.findMany({
      where: {
        followingId: req.user.id,
      },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            username: true,
            profilePicture: true,
          },
        },
      },
    });

    res.json(followers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Following
export const getFollowing = async (req, res) => {
  try {
    const following = await prisma.following.findMany({
      where: {
        followerId: req.user.id,
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            username: true,
            profilePicture: true,
          },
        },
      },
    });

    res.json(following);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// Get Other User Profile
export const getUserById = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: true,
        followers: true,
        following: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isFollowing = await prisma.following.findFirst({
      where: {
        followerId: req.user.id,
        followingId: userId,
      },
    });

    res.json({
      ...user,
      isFollowing: !!isFollowing,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: req.user.id,
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        profilePicture: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};