import React from 'react';
import { Box, Container, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      bg={'white'}
      color={'gray.700'}>
      <Container
        py={12}
        justify={'center'}
        align={'center'}>
        <Link href='https://github.com/robwilhelmsson/resort-info' isExternal>
          <Text>Created by Rob Wilhelmsson. Click for Github repo.</Text>
        </Link>
      </Container>
    </Box>
  );
}


export default Footer