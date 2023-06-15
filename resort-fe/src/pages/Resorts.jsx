import React, { useEffect, useState, useCallback } from "react"
import axios from "axios"
import { Box, Heading, Text, Select, Input, List, ListItem, Button, Grid } from '@chakra-ui/react';
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const Resorts = ({ user }) => {
  const [resorts, setResorts] = useState([])
  const [filteredResorts, setFilteredResorts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [uniqueCountries, setUniqueCountries] = useState([]);
  const [uniqueContinents, setUniqueContinents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [resortsPerPage] = useState(150);
  const [favoriteResorts, setFavoriteResorts] = useState([]);

  const getFavoriteResorts = useCallback(async () => {
    try {
      if (!user || !user.id) {
        return;
      }
      const response = await axios.get(`http://127.0.0.1:4000/api/users/${user.id}/favorites`);
      const favoriteResortsData = response.data.favorite_resorts ? response.data.favorite_resorts.map((id) => id.id) : [];
      setFavoriteResorts(favoriteResortsData);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  const fetchResorts = async () => {
    try {
      setLoading(true);
      const savedResorts = localStorage.getItem("resorts"); // Check if resorts data exists in localStorage
      if (savedResorts) {
        // If resorts data exists in localStorage, use it
        setResorts(JSON.parse(savedResorts));
      } else {
        // If resorts data doesn't exist in localStorage, fetch it from the API
        const response = await axios.get("http://127.0.0.1:4000/api/resorts");
        const resortData = response.data;
        setResorts(resortData);
        localStorage.setItem("resorts", JSON.stringify(resortData)); // Save resorts data in localStorage
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResorts()
    getFavoriteResorts()
  }, [user, getFavoriteResorts]);

  const filterResortsByCountry = useCallback(() => {
    if (selectedCountry) {
      const filtered = resorts.filter((resort) => resort.country === selectedCountry && resort.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredResorts(filtered);
    } else {
      const filtered = resorts.filter((resort) => resort.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredResorts(filtered);
    }
  }, [selectedCountry, resorts, searchQuery]);

  const filterResortsByContinent = useCallback(() => {
    if (selectedContinent) {
      const filtered = resorts.filter((resort) => resort.continent === selectedContinent && resort.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredResorts(filtered);
    } else {
      const filtered = resorts.filter((resort) => resort.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredResorts(filtered);
    }
  }, [selectedContinent, resorts, searchQuery]);


  useEffect(() => {
    filterResortsByCountry();
  }, [selectedCountry, resorts, searchQuery, filterResortsByCountry]);

  useEffect(() => {
    filterResortsByContinent();
  }, [selectedContinent, resorts, searchQuery, filterResortsByContinent]);


  useEffect(() => {
    const countries = [...new Set(resorts.map((resort) => resort.country))];
    setUniqueCountries(countries);
  }, [resorts]);

  useEffect(() => {
    const continents = [...new Set(resorts.map((resort) => resort.continent))];
    setUniqueContinents(continents);
  }, [resorts]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const checkIsResortFavorited = (resortId) => {
    return favoriteResorts.some((resort) => resort === resortId);
  };

  const addFavoriteResort = async (resortId) => {
    try {
      const isAlreadyFavorited = checkIsResortFavorited(resortId);
      if (isAlreadyFavorited) {
        console.log("Resort already favorited");
        return;
      }

      await axios.post(`http://127.0.0.1:4000/api/users/${user.id}/favorites`, {
        resort_id: resortId
      });
      await getFavoriteResorts();
    } catch (error) {
      console.error(error);
    }
  };


  const indexOfLastResort = currentPage * resortsPerPage;
  const indexOfFirstResort = indexOfLastResort - resortsPerPage;
  const currentResorts = filteredResorts.slice(indexOfFirstResort, indexOfLastResort);
  const totalPages = Math.ceil(filteredResorts.length / resortsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} p={10}>
        <Select placeholder='Select Country' value={selectedCountry} onChange={handleCountryChange}>
          <option value=''>All Countries</option>
          {uniqueCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </Select>
        <Select placeholder='Select Continent' value={selectedContinent} onChange={handleContinentChange}>
          <option value=''>All Continents</option>
          {uniqueContinents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </Select>
        <Input placeholder='Search Resort' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </Grid>

      {loading ? (
        <div>
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
          <p>This can take some time on first load...</p>
        </div>
      ) : (
        <Grid templateColumns="repeat(4, 1fr)" gap={2} mx={2} flexWrap="wrap" justifyContent='space-around' alignContent='center'>
          {currentResorts.map((resort) => (

            <Box key={resort.id} p="4" borderWidth="1px" borderRadius="md">
              <Heading as="h2" size="md">{resort.name}</Heading>
              <Text>Country: {resort.country}</Text>
              <Text>Continent: {resort.continent}</Text>
              {user && !checkIsResortFavorited(resort.id) && (
                <Button onClick={() => addFavoriteResort(resort.id)}>Add Favorite</Button>
              )}
              <Link key={resort.id} to={`/resort/${resort.name}`}>
                <Button>Resort Info</Button>
              </Link>
            </Box>
          ))}
        </Grid>
      )
      }
      {
        totalPages > 1 && (
          <Box mt="4">
            <List display="flex" justifyContent="center" alignItems="center">
              {pageNumbers.map((pageNumber) => (
                <ListItem key={pageNumber} mx="2">
                  <Button
                    size="sm"
                    variant={pageNumber === currentPage ? "solid" : "outline"}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        )
      }
    </div >
  );
};

Resorts.propTypes = {
  user: PropTypes.object
};

export default Resorts