import { AbsoluteCenter, Icon, Flex, useColorMode, useColorModeValue, Box, Button,Divider, FormControl, FormLabel, Heading, HStack, Input, Link, Stack, Text} from '@chakra-ui/react'
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';

import { IoSunny, IoMoon } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const { data: session } = useSession()
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  // Redirect to dashboard if the user is already authenticated
  if (session) {
    router.push('/dashboard');
    return null;
  }
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        position={"relative"}
        direction="column"
        background={formBackground}
        p={12}
        rounded={6}
      >
        <Box
          position={"absolute"}
          top={2}
          right={2}
          cursor={"pointer"}
          onClick={() => {
            toggleColorMode();
            setToggle(!toggle);
          }}
        >
          {toggle ?  <IoSunny /> : <IoMoon />}
        </Box>
        <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
          <Heading>Get in to</Heading>
          <Heading size={{base: "xs", md: "sm" }} >Catching Dreams</Heading>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" placeholder="test@gmail.com" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" placeholder="********" />
              </FormControl>
            </Stack>
            <Text textStyle="sm" color="fg.muted" p="6">
              Don't have an account? <Link href="#">Sign up</Link>
            </Text>
            <Stack spacing="6">
              <Button>Log in</Button>
            </Stack>
          </Box>
        </Stack>
        <Stack spacing="6" py="4">
          <HStack>
            <Divider />
            <Box position="relative" padding="4">
              <Divider />
              <AbsoluteCenter>or</AbsoluteCenter>
            </Box>
            <Divider />
          </HStack>
        </Stack>
        <Button
          mx={10}
          mb={3}
          colorScheme="teal"
          leftIcon={<Icon as={FcGoogle} boxSize={6} />}
          size="md"
          justifyContent="center"
          onClick={() => signIn('google')}
        >
          <Flex align="center">
            <Text fontWeight="semibold">Sign in with Google</Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}

export default LoginPage
