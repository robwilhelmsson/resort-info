import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, IconButton, Button, Stack, Collapse, Icon, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaMountain, FaRegUserCircle } from 'react-icons/fa'


const Navbar = ({ user, setUser }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null)
  };

  if (loading) {
    return null;
  }


  return (
    <Box>
      <Flex bg={"gray.300"} minH={'60px'} py={{ base: 2 }} px={{ base: 10 }} align={'center'}>

        <Flex flex={{ base: 1 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            color={'gray.500'}
            _hover={{
              bg: 'gray.400',
            }}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <ReactRouterLink to={'/'}>
            <Icon as={FaMountain} boxSize={10} color={'gray.500'} />
          </ReactRouterLink>
          <Flex display={{ base: 'none', md: 'flex' }} align={{ md: 'center' }} ml={20}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 1 }}
          justify={'flex-end'}
          alignContent={'center'}
          direction={'row'}
          spacing={6}
        >
          {user ? (
            <>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'} color="whiteAlpha.900" fontWeight="600" fontSize={'md'}>
                <Text display={{base: 'none', sm: 'flex'}} fontSize={'xl'}>
                  {user.username}
                </Text>
                <Box display={'flex'} pl={'10px'}>
                  <Icon as={FaRegUserCircle} boxSize={7} />
                </Box>
              </Box>
              <Button
                onClick={handleSignOut}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                color={'gray.600'}
                _hover={{
                  color: 'gray.500',
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                as={ReactRouterLink}
                to={'/signin'}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                color={'gray.600'}
                _hover={{
                  color: 'gray.500',
                }}
              >
                Sign In
              </Button>
              <Button
                as={ReactRouterLink}
                to={'/signup'}
                h={'34px'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'gray.300'}
                bg={'green.800'}
                _hover={{
                  bg: 'green.700',
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={12}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <ReactRouterLink to={navItem.to}>
            <Text
              mr={'20px'}
              fontSize={'sm'}
              fontWeight={500}
              color={'gray.600'}
              _hover={{
                textDecoration: 'none',
                color: 'gray.400',
              }}>
              {navItem.label}
            </Text>
          </ReactRouterLink>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={'gray.700'}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, to }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={ReactRouterLink}
        to={to}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={400}
          color={'gray.300'}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={'gray.700'}
          align={'start'}>
          {children &&
            children.map((child) => (
              <ReactRouterLink key={child.label} py={2} href={child.to}>
                {child.label}
              </ReactRouterLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

MobileNavItem.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.object),
  to: PropTypes.string,
};

Navbar.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func
}



const NAV_ITEMS = [
  {
    label: 'Resorts',
    to: '/resorts',
  },
  {
    label: 'Favorites',
    to: '/favorites',
  },
];

export default Navbar