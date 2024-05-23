"use client";

import { Box, Button, Flex, FormControl, Input, Text, useTheme } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from 'react-hook-form';
import { ApiResponse, Character, Info, getCharacters } from "rickmortyapi"; //Use this to get types and easier access to the API
import CharacterTable from "./components/CharacterTable";

export default function Home() {

  const theme = useTheme()

  const [data, setData] = useState<ApiResponse<Info<Character[]>>>()

  const [search, setSearch] = useState<string>("")

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [totaltPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    getCharacters({ name: search, page: currentPage }).then(result => {
      setData(result)
    }).catch(err => {
      console.log(err)
    })
  },[currentPage, search])

  const characters = useMemo(() => {
    setTotalPages(data?.data.info?.pages ?? 1)
    return data?.data.results?.map((item: Character) => item) ?? []
  },[data])

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values: any) {
    const name = values.name //You shouldn't use any type, but I'm lazy right now
    setSearch(name) // Remember for swithing pages
    setCurrentPage(1) // make sure we view the first page of the name search. Else, we might end on a page that doesn't exist
  }

  function gotoPage(newPage: number) {
    setCurrentPage(newPage)
  }

  return (
    <Box p="5" w="100vw" h="100vh" bg={theme.colors.gray[200]} overflow="scroll">
      <Text fontSize="3xl" mb="5">Rick and Morty Characters</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb="4">
          <FormControl>
            <Flex direction="row" justify="flex-start">
              <Input id="name" {...register("name")} placeholder="Search a character" variant="solid" mb="5" maxW="400px" />       
              <Button type="submit" colorScheme="green" ml="5" isLoading={isSubmitting}>Search</Button>
            </Flex>
          </FormControl>
        </Box>
      </form>
      <CharacterTable data={characters ?? []} />
      <Flex justify="center" m="5">
        <Flex direction="row" gap="5">
          <Button colorScheme="green" onClick={()=> gotoPage(currentPage - 1)} isDisabled={currentPage === 1}>Previous</Button>
          <Button colorScheme="green" onClick={()=> gotoPage(currentPage + 1)} isDisabled={currentPage === totaltPages}>Next</Button>
        </Flex>
      </Flex>
    </Box>
  );
}

