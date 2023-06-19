import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Button, Grid } from '@chakra-ui/react';
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';
import { baseUrl } from "../config";

const FavoriteResorts = ({ user }) => {
  const [favoriteResorts, setFavoriteResorts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavoriteResorts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${baseUrl}/users/${user.id}/favorites`);
        const favoriteResortIds = response.data.favorite_resorts ? response.data.favorite_resorts.map((id) => id.id) : [];
        const resortsData = await fetchResortsData(favoriteResortIds);
        setFavoriteResorts(resortsData);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false)
      }
    };

    if (user && user.id) {
      fetchFavoriteResorts();
    }
  }, [user]);

  const fetchResortsData = async (resortIds) => {
    try {
      const resortDataPromises = resortIds.map(async (resortId) => {
        const response = await axios.get(`${baseUrl}/resorts/${resortId}`);
        return response.data;
      });

      const resortsData = await Promise.all(resortDataPromises);
      return resortsData;
    } catch (error) {
      console.error(error);
      return [];
    }
  };


  const removeFavoriteResort = async (resortId) => {
    try {
      await axios.delete(`${baseUrl}/users/${user.id}/favorites/${resortId}`)
      setFavoriteResorts((prevResorts) => prevResorts.filter((resort) => resort.id !== resortId));
    } catch (error) {
      console.error(error);
    }
  };

  const EmptyFavoritesMessage = () => (
    <Box minHeight={`calc(100vh - 100px)`} bg={'gray.300'} display={'flex'} p={'50px'}>
      <Text fontSize={'xl'} fontWeight={'400'}>
        {user ? "No favorites for user." : "You must be signed in to see favorites."}
      </Text>
    </Box>
  );

  if (!user || !user.id || favoriteResorts.length === 0) {
    return <EmptyFavoritesMessage />;
  }

  return (
    <Box
      minHeight={`calc(100vh - 100px)`}
      bg={'gray.300'}
      pt={'40px'}
      px={'40px'}
    >
      {loading ? (
        <Triangle
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)", '2xl': "repeat(5, 1fr)", }}
          gap={2}
          mx={5}
          flexWrap="wrap"
          justifyContent='space-around'
          alignContent='center'
        >
          {favoriteResorts.map((resort) => (

            <Box key={resort.id} p="12px" borderWidth="1px" borderRadius="md" background={'whiteAlpha.700'}>
              <Heading size="md" fontWeight={400}>{resort.name}</Heading>
              <Text fontSize={14} fontWeight={400} mt={1}>Country: {resort.country}</Text>
              <Text fontSize={14} fontWeight={400} mt={1}>Continent: {resort.continent}</Text>
              <Box display={'flex'} mt={2}>
                <Button h={'30px'} fontSize={'sm'} bg={'green.500'} color={'whiteAlpha.900'} mr={3} _hover={{bg: 'green.400', color: 'whiteAlpha.700'}} onClick={() => removeFavoriteResort(resort.id)}>Remove Favorite</Button>
                <Link key={resort.id} to={`/resort/${resort.name}`}>
                  <Button border={'1px solid green'} h={'30px'} fontSize={'sm'} _hover={{bg: 'gray.200', color: 'gray.500'}}>Resort Info</Button>
                </Link>
              </Box>
            </Box>
          ))}
        </Grid>
      )
      }
    </Box>
  );
};

FavoriteResorts.propTypes = {
  user: PropTypes.object
};

export default FavoriteResorts;
