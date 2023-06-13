import React, { useState, useContext } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../components/UserContext';
import PropTypes from 'prop-types';


const SignIn = ({ fetchUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    const { email, password } = formData;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:4000/api/signin', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      fetchUser()

      setUser(user);
      navigate('/resorts');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.messages || 'Password or email is incorrect.');
      } else {
        setError('Something went wrong');
      }
    }

    setLoading(false);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={'gray.300'}
    >
      <Stack spacing={8} mx={'auto'} minW={'md'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'} textAlign={'center'}>
            Sign In
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={5}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
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
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </Stack>
          </Stack>
          {error && (
            <Text color="red.500" mt={4} textAlign="center">
              {error}
            </Text>
          )}
          <Stack pt={6}>
            <Text align={'center'}>
              Dont have an account?{' '}
              <ReactRouterLink to={'/signup'}>Sign Up</ReactRouterLink>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

SignIn.propTypes = {
  fetchUser: PropTypes.func.isRequired
}

export default SignIn;
