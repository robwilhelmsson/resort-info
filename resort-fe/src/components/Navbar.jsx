import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, IconButton, Button, Stack, Collapse, Icon, Popover, PopoverTrigger, PopoverContent, useColorModeValue, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import colors from './Colors';


const Navbar = ({ user, setUser }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const textAlign = useBreakpointValue({ base: 'center', md: 'left' });

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
      <Flex
        bg={colors.d_lilac}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 8 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={'gray.900'}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            color={'gray.500'}
            _hover={{
              bg: 'gray.400',
            }}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            as={ReactRouterLink}
            to={'/'}
            textAlign={textAlign}
            fontFamily={'heading'}
            color='white'>
            Logo
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>

          {user ? (
            <>
              <Text color="white" fontWeight="bold">
                {user.username}
              </Text>
              <Button
                onClick={handleSignOut}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                color={colors.lilac}
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
                color={colors.lilac}
              >
                Sign In
              </Button>
              <Button
                as={ReactRouterLink}
                to={'/signup'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={colors.d_blue}
                _hover={{
                  bg: 'green.600',
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
  const linkColor = 'gray.200';
  const linkHoverColor = 'white';
  const popoverContentBgColor = 'gray.800';

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <ReactRouterLink
                p={2}
                to={navItem.to}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </ReactRouterLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                {/* <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack> */}
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};


const MobileNav = () => {
  return (
    <Stack
      bg={'gray.800'}
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
          fontWeight={600}
          color={'gray.500'}>
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
          borderColor={useColorModeValue('gray.200', 'gray.700')}
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