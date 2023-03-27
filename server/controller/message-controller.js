import Conversation from "../model/Conversation.js";
import Message from "../model/Message.js";

export const newMessage = async (request, response) => {
  try {
    const newMessage = new Message(request.body);
    await newMessage.save();
    await Conversation.findByIdAndUpdate(request.body.conversationId, {
      message: request.body.text,
    });
    return response.status(200).json("Message has been sent successfully");
  } catch (error) {
    return response
      .status(500)
      .json("Failed to sent message Error Occured: ", error.message);
  }
};
export const getMessages = async (request, response) => {
  try {
    const messages = await Message.find({ conversationId: request.params.id });
    response.status(200).json(messages);
  } catch (error) {
    response.status(500).json(error);
  }
};
