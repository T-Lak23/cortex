import { useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";
import Nav from "./Nav";
import { getMessages } from "../features/getMessages";
import { useDispatch, useSelector } from "react-redux";
import { setArtifacts, setMessages } from "../redux/messageSlice";

const ChatArea = () => {
  const { selectedConversation } = useSelector((state) => state.conversations);
  console.log("selectedConversation:", selectedConversation);
  useEffect(() => {
    console.log("ChatArea effect:", selectedConversation);
  }, [selectedConversation?._id]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMesg = async () => {
      console.log("1. getMesg called");

      if (selectedConversation) {
        console.log("2. selected conversation exists");
        console.log("3. ID:", selectedConversation._id);

        if (selectedConversation?.title?.toLowerCase() === "new chat") {
          console.log("4. New chat - returning");
          return;
        }

        console.log("5. Calling getMessages");

        const data = await getMessages(selectedConversation._id);

        console.log("6. getMessages response:", data);

        data.forEach((msg, index) => {
          console.log(`Message ${index}:`, msg);
          console.log(`Message ${index} artifacts:`, msg.artifacts);
        });

        dispatch(setMessages(data));

        const latestArtifactMessage = [...data]
          .reverse()
          .find((msg) => msg.artifacts && msg.artifacts.length > 0);

        console.log("7. latest artifact:", latestArtifactMessage);

        dispatch(setArtifacts(latestArtifactMessage?.artifacts || []));
      }
    };

    getMesg();
  }, [selectedConversation?._id]);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Nav />
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default ChatArea;
