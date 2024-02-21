import { Box } from "@chakra-ui/layout";
// import "../styles.css";
import SingleChat from "./SingleChat";
import { useGlobalContext } from "../../UserContext/UserContext";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useGlobalContext();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
