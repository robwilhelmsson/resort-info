import React, { useState } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Text } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../assets/resort-bg1.png'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password } = formData;

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain one capital letter');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post('http://127.0.0.1:4000/api/signup', {
        username,
        email,
        password,
      });

      navigate('/signin');

    } catch (error) {
      console.log(error)
      if (error.response) {
        setError(error.response.data.errors || 'Something went wrong');
        console.log(error)
      } else {
        setError('Something went wrong');
      }
    }

    setLoading(false);
  };

  return (
    <Flex
      display={'flex'}
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize={'cover'}
      backgroundPosition={'center'}
      backgroundRepeat={'no-repeat'}
      minHeight={`calc(100vh - 100px)`}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} minW={'md'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={'gray.700'}
          opacity={'0.8'}
          boxShadow={'lg'}
          p={8}
        >
          <Text fontSize={'3xl'} textAlign={'center'} color={'whiteAlpha.900'}>
            Sign Up
          </Text>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl id="username" isRequired>
                <FormLabel color={'whiteAlpha.900'}>Username</FormLabel>
                <Input type="text" name="username" value={formData.username} onChange={handleInputChange} bg={'whiteAlpha.800'} color={'gray.800'} />
              </FormControl>
              <FormControl id="email" isRequired isInvalid={false}>
                <FormLabel color={'whiteAlpha.900'}>Email address</FormLabel>
                <Input type="" name="email" value={formData.email} onChange={handleInputChange} bg={'whiteAlpha.800'} color={'gray.800'} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color={'whiteAlpha.900'}>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} bg={'whiteAlpha.800'} color={'gray.800'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={loading}
                  loadingText="Submitting"
                  size="lg"
                  bg={'green.600'}
                  color={'white'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  type="submit">
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </form>
          {error && (
            <Text color="red.500" mt={4} textAlign="center">
              {error}
            </Text>
          )}
          <Stack pt={6}>
            <Text align={'center'} color={'whiteAlpha.900'} >
              Already have an account?{' '}
              <ReactRouterLink to={'/signin'}>
                <Box as={'span'} _hover={{ color: 'gray.400' }}>Sign In</Box>
              </ReactRouterLink>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;
