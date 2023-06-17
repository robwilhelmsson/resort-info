import React, { useState, useEffect } from "react";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { Heading, Text, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';

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

  const InfoBox = ({ title, children }) => (
    <Box marginBottom="20px" borderRadius="3px" width="fit-content" height="fit-content" px="12px" py="5px" bg="whiteAlpha.700">
      <Heading as="h3" fontSize="2xl" fontWeight="400" pb="5px">
        {title}
      </Heading>
      {children}
    </Box>
  );

  const InfoText = ({ children }) => (
    <Text fontSize="lg" fontWeight="300">
      {children}
    </Text>
  );

  return (
    <Box padding="30px" bg={'gray.300'} minHeight={`calc(100vh - 100px)`}>

      <Heading as={"h1"} marginBottom="20px" fontWeight={500} display={'flex'} px={'20px'}>
        {resortInfo.name}
      </Heading>

      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} gap={'8'}>

        <InfoBox title="Location">
          <InfoText>Country: {resortInfo.location.country}</InfoText>
          <InfoText>Continent: {resortInfo.location.continent}</InfoText>
        </InfoBox>

        <InfoBox title="Altitude">
          <InfoText>Top Altitude: {resortInfo.virtical.topAltitude}</InfoText>
          <InfoText>Bottom Altitude: {resortInfo.virtical.bottomAltitude}</InfoText>
          <InfoText>Total Vertical: {resortInfo.virtical.totalVertical}</InfoText>
        </InfoBox>

        <InfoBox title="Pistes">
          <InfoText>Total: {resortInfo.pistes.total}</InfoText>
          <InfoText>Black Pistes: {resortInfo.pistes.blackPistes}</InfoText>
          <InfoText>Red Pistes: {resortInfo.pistes.redPistes}</InfoText>
          <InfoText>Blue Pistes: {resortInfo.pistes.bluePistes}</InfoText>
          <InfoText>Skill level: {resortInfo.skillLevel}</InfoText>
        </InfoBox>

        <InfoBox title="Lifts">
          <InfoText>Total: {resortInfo.lifts.total}</InfoText>
          <InfoText>Chair lifts: {resortInfo.lifts.chairLifts}</InfoText>
          <InfoText>Drag lifts: {resortInfo.lifts.dragLifts}</InfoText>
          <InfoText>Gondola lifts: {resortInfo.lifts.gondolaLifts}</InfoText>
        </InfoBox>

        <InfoBox title="Rating">
          <InfoText>Overall: {resortInfo.rating.overall}</InfoText>
          <InfoText>Apres Ski: {resortInfo.rating.ratingByItem?.apresSki}</InfoText>
          <InfoText>Off-piste: {resortInfo.rating.ratingByItem?.offPiste}</InfoText>
          <InfoText>Scenery: {resortInfo.rating.ratingByItem?.scenery}</InfoText>
          <InfoText>Snowsure: {resortInfo.rating.ratingByItem?.snowsure}</InfoText>
          <InfoText>Variety of pistes: {resortInfo.rating.ratingByItem?.varietyOfPistes}</InfoText>
        </InfoBox>

        <InfoBox title="Features">
          <Text>Cross country skiing: {resortInfo.features?.crossCountrySkiing || "No data available."}</Text>
          <Text>Terrain Parks: {resortInfo.features?.terrainParks || "No data available."}</Text>
        </InfoBox>

        <InfoBox title="Information">
          <Text fontWeight={'500'} fontSize={'lg'}>
            Restaurants and Bars:
            <InfoText>Total bars: {resortInfo.information.restaurantsBars?.bars || "No data available."}</InfoText>
            <InfoText>Total restaurants: {resortInfo.information.restaurantsBars?.restaurants || "No data available."}</InfoText>
          </Text>
          <Text fontWeight={'500'} fontSize={'lg'}>
            Season Dates:
            <InfoText>Season Open: {resortInfo.information.seasonalDates?.seasonOpen || "No data available."}</InfoText>
            <InfoText>Season Close: {resortInfo.information.seasonalDates?.seasonClose || "No data available."}</InfoText>
          </Text>
          <Text fontWeight={'500'} fontSize={'lg'}>
            Tourist Office:
            <InfoText>Tourist Office Email: {resortInfo.information.touristOffice?.touristOfficeEmail || "No data available."}</InfoText>
            <InfoText>Tourist Office Phone: {resortInfo.information.touristOffice?.touristOfficePhone || "No data available."}</InfoText>
          </Text>
          <Text fontWeight={'500'} fontSize={'lg'}>
            Transport:
            <InfoText>Nearest Airport: {resortInfo.information.transport?.nearestAirport || "No data available."}</InfoText>
            <InfoText>Nearest Train Station: {resortInfo.information.transport?.nearestTrainStation || "No data available."}</InfoText>
          </Text>
        </InfoBox>

        <InfoBox title="Nearest Resorts">
          {resortInfo.nearestResorts.map((nearestResort, index) => (
            <Box key={index}>
              <InfoText>{nearestResort.name}: {nearestResort.distance}</InfoText>
            </Box>
          ))}
        </InfoBox>

      </Box>

    </Box>
  );
};

ResortInfo.propTypes = {
  title: PropTypes.string,
  children: PropTypes.string
}

export default ResortInfo;
