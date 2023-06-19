import React, { useState } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Text } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import backgroundImage from '../assets/resort-bg1.png'
import { baseUrl } from '../config';


const SignIn = ({ setUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    const { email, password } = formData;
    console.log(baseUrl)
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseUrl}/signin`, {
        email,
        password,
      });
      
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      navigate('/');
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
      display={'flex'}
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize={'cover'}
      backgroundPosition={'center'}
      backgroundRepeat={'no-repeat'}
      minHeight={`calc(100vh - 100px)`}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={6} mx={'auto'} minW={'md'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={'gray.700'}
          opacity={'0.8'}
          boxShadow={'lg'}
          p={8}
        >
          <Text fontSize={'3xl'} textAlign={'center'} color={'whiteAlpha.900'}>
            Sign In
          </Text>
          <Stack spacing={5}>
            <FormControl id="email" isRequired>
              <FormLabel color={'whiteAlpha.900'}>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleInputChange} bg={'whiteAlpha.800'} color={'gray.800'} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color={'whiteAlpha.900'}>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  color={'gray.800'}
                  bg={'whiteAlpha.800'}
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
                bg={'green.600'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
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
            <Text align={'center'} color={'whiteAlpha.900'} >
              Dont have an account?{' '}
              <ReactRouterLink to={'/signup'}>
                <Box as={'span'} _hover={{ color: 'gray.400' }}>Sign Up</Box>
              </ReactRouterLink>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

SignIn.propTypes = {
  setUser: PropTypes.func.isRequired
}


export default SignIn;
