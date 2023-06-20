import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box h={"40px"} bg={"gray.400"} color={"gray.700"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
      <Link href="https://github.com/robwilhelmsson/resort-info" isExternal _hover={{ textDecor: "none" }}>
        <Text color={"gray.100"} fontSize={"xs"} align={"center"} justify={"center"}>Created by Rob Wilhelmsson. Click for Github repo.</Text>
      </Link>
    </Box>
  );
}


export default Footer