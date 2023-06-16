import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Button, Grid } from '@chakra-ui/react';
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';

const FavoriteResorts = ({ user }) => {
  const [favoriteResorts, setFavoriteResorts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavoriteResorts = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://127.0.0.1:4000/api/users/${user.id}/favorites`);
        const favoriteResortIds = response.data.favorite_resorts ? response.data.favorite_resorts.map((id) => id.id) : [];
        const resortsData = await fetchResortsData(favoriteResortIds);
        setFavoriteResorts(resortsData);
        setLoading(false)
        // console.log(favoriteResorts)
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
        const response = await axios.get(`http://127.0.0.1:4000/api/resorts/${resortId}`);
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
      await axios.delete(`http://127.0.0.1:4000/api/users/${user.id}/favorites/${resortId}`)
      setFavoriteResorts((prevResorts) => prevResorts.filter((resort) => resort.id !== resortId));
    } catch (error) {
      console.error(error);
    }
  };

  const EmptyFavoritesMessage = () => (
    <Box minHeight={`calc(100vh - 100px)`}>
      {user ? "No favorites for user." : "You must be signed in to see favorites."}
    </Box>
  );

  if (!user || !user.id || favoriteResorts.length === 0) {
    return <EmptyFavoritesMessage />;
  }


  // if (!user || !user.id) {
  //   return (
  //     <Box minHeight={`calc(100vh - 100px)`}>
  //       You must be signed in to see favorites.
  //     </Box>
  //   )
  // } else if (favoriteResorts == 0) {
  //   return (
  //     <Box minHeight={`calc(100vh - 100px)`}>
  //       No favorites for user.
  //     </Box>
  //   )
  // }

  return (
    <Box
      minHeight={`calc(100vh - 100px)`}
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
        <Grid templateColumns="repeat(4, 1fr)" gap={2} mx={2} flexWrap="wrap" justifyContent='space-around' alignContent='center'>
          {favoriteResorts.map((resort) => (
            <Box key={resort.id} p="4" borderWidth="1px" borderRadius="md">
              <Heading as="h2" size="md">{resort.name}</Heading>
              <Text>Country: {resort.country}</Text>
              <Text>Continent: {resort.continent}</Text>
              <Button onClick={() => removeFavoriteResort(resort.id)}>Remove Favorite</Button>
              <Link key={resort.id} to={`/resort/${resort.name}`}>
                <Button>Resort Info</Button>
              </Link>
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
