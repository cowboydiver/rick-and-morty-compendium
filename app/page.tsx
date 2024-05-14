"use client";

import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, Flex, Text, useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Character, getCharacters } from "rickmortyapi"; //Use this to get types and easier access to the API

const endpoint = "https://rickandmortyapi.com/api/character";

export default function Home() {

  const theme = useTheme()

  const [data, setData] = useState<Character[] | undefined>([])

  const [expanded, setExpanded] = useState<number[] | undefined>(undefined)

  useEffect(() => {
    getCharacters().then(result => {
      setData(result.data.results?.map((item: Character) => item))
      console.log(result)})
  }, [])

  const onExpand = (index: number[]) => {
    setExpanded(index)
  }
  
  return (
    <Box p="5" w="100vw" h="100vh" bg={theme.colors.gray[200]} overflow="scroll">
      <Card>
        <Accordion allowMultiple onChange={onExpand}>
         { data ? data.map((item, index) => (
          <AccordionItem key={item.name}>
            <AccordionButton key={index}>
              <Flex w="100%" align="left">
                <Text>{item.name}</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text>Accordion 1 Content</Text>
            </AccordionPanel>
          </AccordionItem>
          ))
          : null}
        </Accordion>
      </Card>
    </Box>
  );
}
