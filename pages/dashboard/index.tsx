import { Avatar, Image, Heading, Icon, Box, Button, Container, Flex, IconButton, Spacer, Text, VStack, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSunny, IoMoon, IoLogOutOutline } from "react-icons/io5";

export const DashboardPage = () => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [toggle, setToggle] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const { data: session } = useSession()
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page if not authenticated
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  if (!session) {
    // Show loading state or redirecting message
    return <div>Loading...</div>;
  }

  //User information
  const userInfo = {
    name: session?.user?.name,
    email: session?.user?.email,
    avatar: session?.user?.image, // Placeholder avatar image
  };

  return (
    <Flex minH="100vh" bgColor={bgColor}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <Box w="250px" bgColor="teal.500" color="white">
          <VStack h="100vh" spacing={4} align="start">
            {/* User Info */}
            <VStack mt={8} ml={2}>
              <Avatar src={userInfo.avatar} size="md" />

              <Text fontSize="lg">{userInfo.name}</Text>
              <Text fontSize="md" color={textColor}>
                {userInfo.email}
              </Text>
              <Spacer />
              <Button
                position={"absolute"}
                bottom={4}
                left={4}
                colorScheme="teal"
                leftIcon={<Icon as={IoLogOutOutline} boxSize={6} />}
                size="md"
                justifyContent="center"
                px={16}
                onClick={() => signOut()}
              >
                <Flex align="center">
                  <Text fontWeight="semibold">Logout</Text>
                </Flex>
              </Button>
            </VStack>
          </VStack>
        </Box>
      )}

      {/* Main Content */}
      <Box flex="1" p={8}>
        {/* Header */}
        <Flex mb={8}>
          <IconButton
            aria-label='Menu'
            icon={<GiHamburgerMenu />}
            size="md"
            variant="ghost"
            onClick={toggleSidebar}
            mr={4}
          />
          <Spacer />
          <Button
            colorScheme="teal"
            leftIcon={<Icon as={IoLogOutOutline} boxSize={6} />}
            size="md"
            justifyContent="center"
            onClick={() => signOut()}
          >
            <Flex align="center">
              <Text fontWeight="semibold">Logout</Text>
            </Flex>
          </Button>
        </Flex>

        {/* Page Content */}
        <Container maxW="container.md">
          <VStack spacing={6} align="start">
            {/* admin Dashboard content here */}
            <VStack spacing={6}>
              <Heading fontSize="3xl" fontWeight="semibold" color={textColor}>
                Welcome to the Dashboard , {userInfo.name}!
              </Heading>
              <Image boxSize='100px' src={userInfo.avatar} alt={userInfo.name} />
              <Text fontSize="lg" color={textColor}>
                Email: {userInfo.email}
              </Text>
            </VStack>
            <Box
              position={"absolute"}
              bottom={4}
              right={4}
              cursor={"pointer"}
              onClick={() => {
                toggleColorMode();
                setToggle(!toggle);
              }}
            >
              {toggle ? <IoMoon /> : <IoSunny />}
            </Box>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
};

export default (DashboardPage) 