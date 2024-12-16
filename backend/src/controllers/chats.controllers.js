import Chat from "../models/chat.model.js";

export const createIndividualChat = async (request, response) => {
  const { userId } = request.body;

  const currentUserId = request.user._id;

  try {
    if (!userId) {
      return response.status(400).json({ message: "User ID is required" });
    }

    const chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [currentUserId, userId] },
    });

    if (chat) {
      return response.status(200).json({
        chat: chat,
        message: "Chat already exists",
      });
    }

    const newChat = await Chat.create({
      isGroupChat: false,
      users: [currentUserId, userId],
    });

    if (newChat) {
      return response.status(201).json({
        chat: newChat,
        message: "Individual chat created successfully",
      });
    } else {
      return response
        .status(500)
        .json({ message: "Failed to create individual chat" });
    }
  } catch (error) {
    console.log("Error in creating individual chat controller: " + error);
    response.status(500).json({ message: "Server error" });
  }
};

export const createGroupChat = async (request, response) => {
  const { groupName, users } = request.body;
  const currentUserId = request.user._id;

  try {
    if (!groupName || !users || users.length < 1) {
      return response
        .status(400)
        .json({ message: "Group name and at least one user are required" });
    }

    const existingChat = await Chat.findOne({
      isGroupChat: true,
      users: { $all: users },
    });

    if (existingChat) {
      return response.status(200).json({
        chat: existingChat,
        message: "Chat already exists",
      });
    }
    const validUsers = await User.find({ _id: { $in: users } }).select("_id");
    const userIds = validUsers.map((user) => user._id.toString());

    if (!userIds.includes(currentUserId.toString())) {
      userIds.push(currentUserId.toString());
    }

    const groupChat = await Chat.create({
      groupName,
      isGroupChat: true,
      users: userIds,
      createdBy: currentUserId,
    });

    const fullGroupChat = await Chat.findById(groupChat._id).populate(
      "users",
      "name username email"
    );

    return response.status(201).json({
      chat: fullGroupChat,
      message: "Group chat created successfully",
    });
  } catch (error) {
    console.log("Error in creating group chat controller: " + error);
    response.status(500).json({ message: "Server error" });
  }

  const chat = await Chat.create({
    isGroupChat: true,
    users: [currentUserId],
    groupName: groupName,
  });
};

export const getAllChats = async (request, response) => {
  const currentUserId = request.user._id;

  try {
    const chats = await Chat.find({ users: currentUserId })
      .populate("users", "name email")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    if (chats.length > 0) {
      return response
        .status(200)
        .json({ chats, message: "Chats retrieved successfully" });
    } else {
      return response.status(404).json({ message: "No chats found" });
    }
  } catch (error) {
    console.log("Error in getAllChats controller:", error.message);
    response.status(500).json({ message: "Server error" });
  }
};
