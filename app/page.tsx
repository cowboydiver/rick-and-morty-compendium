"use client";

import { Box, Button, Flex, FormControl, FormErrorMessage, Input, Text, useTheme } from "@chakra-ui/react";
import { useEffect, useState} from "react";
import { useForm } from 'react-hook-form'
import { Character, getCharacters } from "rickmortyapi"; //Use this to get types and easier access to the API
import CharacterTable from "./components/CharacterTable";

export default function Home() {

  const theme = useTheme()

  const [data, setData] = useState<Character[]>([])

  const [search, setSearch] = useState<string>("")

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [totaltPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    gotoPage(1)
  },[]) 

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values: any) {
    const name = values.name //You shouldn't use any, but I'm lazy right now
    searchCharacters(name)
  }

  // Use a dedicated function to search for characters as to not call the api each time user types
  function searchCharacters(queryName: string) {
    setCurrentPage(1)
    getCharacters({ name: queryName, page: 1}).then(result => {
      setSearch(queryName) //remember the search query for pagination 
      setData(result.data.results?.map((item: Character) => item) ?? []) //Maybe use the Info interface to get more data
      setTotalPages(result.data.info?.pages ?? 1)
    }).catch(err => {
      console.log(err)
    })
  }

  function gotoPage(newPage: number) {
    setCurrentPage(newPage)
    getCharacters({ name: search, page: newPage }).then(result => {
      setData(result.data.results?.map((item: Character) => item) ?? [])
      setTotalPages(result.data.info?.pages ?? 1)
    }).catch(err => {
      console.log(err)
    })
  }

  
  return (
    <Box p="5" w="100vw" h="100vh" bg={theme.colors.gray[200]} overflow="scroll">
      <Text fontSize="3xl" mb="5">Rick and Morty Characters</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb="4">
          <FormControl isInvalid={!!errors.name}>
            <Flex direction="row" justify="flex-start">
              <Input id="name" {...register("name", {required: "Birdperson needs you to type a name", minLength: 1})} placeholder="Search a character" variant="solid" mb="5" maxW="400px" />       
              <Button type="submit" colorScheme="green" ml="5" isLoading={isSubmitting}>Search</Button>
            </Flex>
            <FormErrorMessage>{!!errors.name && errors.name.message?.toString()}</FormErrorMessage>
          </FormControl>
        </Box>
      </form>
      <CharacterTable data={data ?? []} />
      <Flex justify="center" m="5">
        <Flex direction="row" gap="5">
          <Button colorScheme="green" onClick={()=> gotoPage(currentPage - 1)} isDisabled={currentPage === 1}>Previous</Button>
          <Button colorScheme="green" onClick={()=> gotoPage(currentPage + 1)} isDisabled={currentPage === totaltPages}>Next</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

