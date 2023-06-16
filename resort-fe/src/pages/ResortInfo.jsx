import React, { useState, useEffect } from "react";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { Heading, Text, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const ResortInfo = () => {
  const { name } = useParams();
  const [resortInfo, setResortInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResortInfo = async () => {
      try {
        setLoading(true);
        const formattedName = name
          
          .replace(/Grandvalira El Tarter/g, "GrandvaliraElTarter")
          .replace(/Grandvalira-Canillo/g, "Canillo")
          .replace(/Grandvalira-Encamp/g, "Encamp")
          .replace(/Grandvalira-Grau Roig/g, "GrauRoig")
          .replace(/Grandvalira-Soldeu/g, "El-Tarter-Soldeu")
          .replace(/Grandvalira-/g, "")
          .replace(/Vallnord-/g, "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/'/g, " ")
          .replace(/\s+/g, "-")
          .replace(/Abries-Ristolas/g, "Abries")

        const response = await axios.get(
          `https://ski-resort-api.p.rapidapi.com/resort/${formattedName}`,
          {
            headers: {
              "X-RapidAPI-Host": "ski-resort-api.p.rapidapi.com",
              "X-RapidAPI-Key": "5cfa6e43e7mshf5e41a4a4130970p169d2ejsn7198fd4220d6",
            },
          }
        );
        setResortInfo(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchResortInfo();
  }, [name]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Triangle height={80} width={80} color="#4fa94d" ariaLabel="triangle-loading" visible={true} />
      </Box>
    );
  }

  if (!resortInfo) {
    return <div>No data found.</div>;
  }

  return (
    <Box maxWidth="800px" padding="20px">
      <Heading as="h1" marginBottom="20px">
        {resortInfo.name}
      </Heading>

      <Box marginBottom="20px">
        <Text fontWeight="bold">Location</Text>
        <Text>Country: {resortInfo.location.country}</Text>
        <Text>Continent: {resortInfo.location.continent}</Text>
      </Box>

      <Box marginBottom="20px">
        <Text fontWeight="bold">Altitude</Text>
        <Text>Top Altitude: {resortInfo.virtical.topAltitude}</Text>
        <Text>Bottom Altitude: {resortInfo.virtical.bottomAltitude}</Text>
        <Text>Total Vertical: {resortInfo.virtical.totalVertical}</Text>
      </Box>

      <Box marginBottom="20px">
        <Text fontWeight="bold">Pistes</Text>
        <Text>Total: {resortInfo.pistes.total}</Text>
        <Text>Black Pistes: {resortInfo.pistes.blackPistes}</Text>
        <Text>Red Pistes: {resortInfo.pistes.redPistes}</Text>
        <Text>Blue Pistes: {resortInfo.pistes.bluePistes}</Text>
        <Text>Skill level: {resortInfo.skillLevel}</Text>
      </Box>

      <Box marginBottom="20px">
        <Text fontWeight="bold">Lifts</Text>
        <Text>Total: {resortInfo.lifts.total}</Text>
        <Text>Chair lifts: {resortInfo.lifts.chairLifts}</Text>
        <Text>Drag lifts: {resortInfo.lifts.dragLifts}</Text>
        <Text>Gondola lifts: {resortInfo.lifts.gondolaLifts}</Text>
      </Box>

      <Box marginBottom="20px">
        <Text fontWeight="bold">Rating</Text>
        <Text>Total: {resortInfo.rating.overall}</Text>
        <Box>
          <Text>Apres Ski: {resortInfo.rating.ratingByItem?.apresSki}</Text>
          <Text>Off-piste: {resortInfo.rating.ratingByItem?.offPiste}</Text>
          <Text>Scenery: {resortInfo.rating.ratingByItem?.scenery}</Text>
          <Text>Snowsure: {resortInfo.rating.ratingByItem?.snowsure}</Text>
          <Text>Variety of pistes: {resortInfo.rating.ratingByItem?.varietyOfPistes}</Text>
        </Box>
      </Box>

      <Box marginBottom="20px">
        <Text fontWeight="bold">Features</Text>
        <Text>Cross country skiing: {resortInfo.features?.crossCountrySkiing || "No data available."}</Text>
        <Text>Terrain Parks: {resortInfo.features?.terrainParks || "No data available."}</Text>
      </Box>

      <Box marginBottom="20px">
        <Text fontWeight="bold">Information</Text>
        <Box>
          <Text>Restaurants and Bars</Text>
          <Text>Total bars: {resortInfo.information.restaurantsBars?.bars || "No data available."}</Text>
          <Text>Total restaurants: {resortInfo.information.restaurantsBars?.restaurants || "No data available."}</Text>
        </Box>
        <Box>
          <Text>Season Dates</Text>
          <Text>Season Open: {resortInfo.information.seasonalDates?.seasonOpen || "No data available."}</Text>
          <Text>Season Close: {resortInfo.information.seasonalDates?.seasonClose || "No data available."}</Text>
        </Box>
        <Box>
          <Text>Tourist Office</Text>
          <Text>Tourist Office Email: {resortInfo.information.touristOffice?.touristOfficeEmail || "No data available."}</Text>
          <Text>Tourist Office Phone: {resortInfo.information.touristOffice?.touristOfficePhone || "No data available."}</Text>
        </Box>
        <Box>
          <Text>Transport</Text>
          <Text>Nearest Airport: {resortInfo.information.transport?.nearestAirport || "No data available."}</Text>
          <Text>Nearest Train Station: {resortInfo.information.transport?.nearestTrainStation || "No data available."}</Text>
        </Box>
      </Box>

      <Box marginBottom="20px">
        <Text fontWeight="bold">Nearest Resorts</Text>
        {resortInfo.nearestResorts.map((nearestResort, index) => (
          <Box key={index}>
            <Text>{nearestResort.name}</Text>
            <Text>{nearestResort.distance}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ResortInfo;
