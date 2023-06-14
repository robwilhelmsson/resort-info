import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Text, List, ListItem, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const FavoriteResorts = ({ user }) => {
  const [favoriteResorts, setFavoriteResorts] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetchFavoriteResorts();
    }
  }, [user]);

  const fetchFavoriteResorts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/users/${user.id}/favorites`);
      const favoriteResortIds = response.data.favorite_resorts;

      const resortsData = await fetchResortsData(favoriteResortIds);
      setFavoriteResorts(resortsData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResortsData = async (resortIds) => {
    const resortDataPromises = resortIds.map(async (resortId) => {
      const response = await axios.get(`http://127.0.0.1:4000/api/resorts/${resortId}`);
      return response.data;
    });

    return Promise.all(resortDataPromises);
  };

  // const removeFavoriteResort = async (resortId) => {
  //   try {
  //     await axios.delete(`http://127.0.0.1:4000/api/users/${user.id}/favorites/${resortId}`);
  //     setFavoriteResorts(prevResorts => prevResorts.filter(resort => resort.id !== resortId));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <Heading as="h2" size="lg" mb="4">Favorite Resorts</Heading>

      {favoriteResorts.length === 0 ? (
        <Text>You have no favorite resorts yet.</Text>
      ) : (
        <List spacing="4">
          {favoriteResorts.map((resort) => (
            <ListItem key={resort.id}>
              <Box p="4" borderWidth="1px" borderRadius="md">
                <Heading as="h3" size="md">{resort.name}</Heading>
                <Text>Country: {resort.country}</Text>
                <Text>Continent: {resort.continent}</Text>
                {/* <Button onClick={() => removeFavoriteResort(resort.id)}>Remove Favorite</Button> */}
                {/* <Link to={`/resort/${resort.name}`}>
                  <Button>Resort Info</Button>
                </Link> */}
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

FavoriteResorts.propTypes = {
  user: PropTypes.object
};

export default FavoriteResorts;
