import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { encryptMessage, decryptMessage } from "../lib/crypto";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.text || "Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (conversationId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${conversationId}`);
      if (!res || !res.data) {
        console.error("No response data received");
        return;
      }

      const decryptedMessages = res.data.map(msg => {
        if (!msg.text || typeof msg.text !== 'string' || msg.text.trim() === "") {
          return {
            ...msg,
            text: msg.image ? "Image sent" : "⚠️ No message text",
          };
        }

        try {
          const decryptedMessage = decryptMessage(msg.text);
          return {
            ...msg,
            text: decryptedMessage,
          };
        } catch (error) {
          console.error("Decryption failed for message:", msg, error);
          return {
            ...msg,
            text: "⚠️ Failed to decrypt message",
          };
        }
      });

      set({ messages: decryptedMessages });
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      toast.error("Error loading messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setMessages: (newMessages) => set({ messages: newMessages }),

  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg._id !== id),
    })),

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    const encrypted = encryptMessage(messageData.text);
    const secureMessageData = {
      ...messageData,
      text: encrypted,
    };

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, secureMessageData);
      const decryptedMessage = decryptMessage(res.data.text);
      set({ messages: [...messages, { ...res.data, text: decryptedMessage }] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageSentFromSelectedUser) return;

      try {
        const decrypted = decryptMessage(newMessage.text);
        const chatMessage = {
          ...newMessage,
          text: decrypted,
        };

        set({
          messages: [...get().messages, chatMessage],
        });
      } catch (error) {
        console.error(
          "Failed to decrypt incoming message:",
          newMessage,
          error
        );
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  deleteMessage: async (id) => {
    try {
      const response = await axiosInstance.delete(`/message/${id}`);
      return response.data;
    } catch (err) {
      throw err.response?.data || { message: 'Delete failed' };
    }
  },
}));
