"use client";

import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Text, useTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Character, getCharacters } from "rickmortyapi"; //Use this to get types and easier access to the API
import CharacterTable from "./components/CharacterTable";

export default function Home() {

  const theme = useTheme()

  const [data, setData] = useState<Character[] | undefined>([])

  const [search, setSearch] = useState<string>("")

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [totaltPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    searchCharacters()
  }, [currentPage])

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
    console.log(search)
  }

  // Use a dedicated function to search for characters as to not call the api each time user types
  function searchCharacters() {
    getCharacters({ name: search, page: currentPage }).then(result => {
      setData(result.data.results?.map((item: Character) => item))
      setTotalPages(result.data.info?.pages ?? 1)
    }).catch(err => {
      console.log(err)
    })
  }
  
  return (
    <Box p="5" w="100vw" h="100vh" bg={theme.colors.gray[200]} overflow="scroll">
      <Text fontSize="3xl" mb="5">Rick and Morty Characters</Text>
      <Flex direction="row">
        <Input variant="solid" placeholder="Search character name" mb="5" maxW="400px" onChange={handleSearch}/>
        <Button colorScheme="green" ml="5" onClick={searchCharacters}>Search</Button>
      </Flex>
      <CharacterTable data={data ?? []} />
      <Flex justify="center" m="5">
        <Flex direction="row" gap="5">
          <Button colorScheme="green" onClick={()=> setCurrentPage(currentPage - 1)} isDisabled={currentPage === 1}>Previous</Button>
          <Button colorScheme="green" onClick={()=> setCurrentPage(currentPage + 1)} isDisabled={currentPage === totaltPages}>Next</Button>
        </Flex>
      </Flex>
    </Box>
  );
}
