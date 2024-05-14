"use client";

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, Flex, Text, theme } from "@chakra-ui/react";
import { useEffect, useState } from "react";


const endpoint = "https://rickandmortyapi.com/api/character";

async function getData() {
  const res = await fetch(endpoint)
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default function Home() {

  const [data, setData] = useState([])

  useEffect(() => {
    getData().then(result => {
      setData(result.results)
      console.log(result)})
  }, [])

  return (
    <Box p="5" w="100vw" h="100vh" bg={theme.colors.gray[200]}>
      <Card>
        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Flex w="100%" align="left">
                <Text>Accordion 1</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text>Accordion 1 Content</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Card>
    </Box>
  );
}
