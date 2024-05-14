"use client";

import { Box, useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Character, getCharacters } from "rickmortyapi"; //Use this to get types and easier access to the API
import CharacterTable from "./components/CharacterTable";

export default function Home() {

  const theme = useTheme()

  const [data, setData] = useState<Character[] | undefined>([])

  useEffect(() => {
    getCharacters().then(result => {
      setData(result.data.results?.map((item: Character) => item))
      })
  }, [])
  
  return (
    <Box p="5" w="100vw" h="100vh" bg={theme.colors.gray[200]} overflow="scroll">
      <CharacterTable data={data ?? []} />
    </Box>
  );
}
