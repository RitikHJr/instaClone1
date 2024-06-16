import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import useGetSuggestedUser from "../../hooks/useGetSuggestedUser";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  const { isLoading, suggestedUser } = useGetSuggestedUser();

  if (isLoading) return null;
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      {suggestedUser.length && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text
            fontSize={12}
            fontWeight={"bold"}
            _hover={{ color: "gray.400" }}
            cursor={"pointer"}
          >
            See All
          </Text>
        </Flex>
      )}

      {suggestedUser.map((user) => (
        <SuggestedUser user={user} key={user.uid} />
      ))}

      <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2023 Built By{" "}
        <Link href="#" target="_blank" color={"blue.500"} fontSize={14}>
          As a Programmer
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
