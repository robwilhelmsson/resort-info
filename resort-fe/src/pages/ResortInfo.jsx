import React, { useState, useEffect } from "react";
import axios from "axios";

import { Triangle } from "react-loader-spinner";
import { Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";


const ResortInfo = () => {
  const { name } = useParams()
  const [resortInfo, setResortInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResortInfo = async () => {
      try {
        setLoading(true);
        const formattedName = name.replace(/\s+/g, "")
        const response = await axios.get(`https://ski-resort-api.p.rapidapi.com/resort/${formattedName}`, {
          headers: {
            "X-RapidAPI-Host": "ski-resort-api.p.rapidapi.com",
            "X-RapidAPI-Key": "5cfa6e43e7mshf5e41a4a4130970p169d2ejsn7198fd4220d6",
          },
        });
        console.log(response.data[0])
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
      <Triangle
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    );
  }

  if (!resortInfo) {
    return <div>No data found.</div>;
  }

  return (
    <div>
      <Heading as="h2" size="lg">
        name:{resortInfo.name}
      </Heading>
      <Text>Country: {resortInfo.location.country}</Text>
      {/* <Text>Airports: {resortInfo.nearestAirports.map(airport => {airport.d})}</Text> */}
    </div>
  );
};


export default ResortInfo
