"use client";

import {
	Box,
	Button,
	Flex,
	FormControl,
	Input,
	Text,
	useTheme,
} from "@chakra-ui/react";
import { useEffect, useMemo, useReducer, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ApiResponse, Character, Info, getCharacters } from "rickmortyapi"; //Use this to get types and easier access to the API
import CharacterTable from "./components/CharacterTable";
import {
	SearchActionTypes,
	initialState,
	searchReducer,
} from "./reducers/SearchReducer";
import SearchBar from "./components/SearchBar";

export default function Home() {
	const theme = useTheme();

	const [data, setData] = useState<ApiResponse<Info<Character[]>>>();

	// Note: In this case the reducer is overkill, but it is fun to try it out
	const [state, dispatch] = useReducer(searchReducer, initialState);

	useEffect(() => {
		let iscanceled = false;
		getCharacters({ name: state.search, page: state.page })
			.then((result) => {
				if (!iscanceled) {
					setData(result);
					dispatch({
						type: SearchActionTypes.TOTAL_PAGES,
						payload: result.data.info?.pages ?? 1,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});

		return () => {
			iscanceled = true;
		};
	}, [state.page, state.search]);

	const characters = useMemo(() => {
		return data?.data.results?.map((item: Character) => item) ?? [];
	}, [data]);

	const {
		handleSubmit,
		register,
		formState: { isSubmitting },
	} = useForm();

	function onSubmit(values: FieldValues) {
		dispatch({ type: SearchActionTypes.SEARCH, payload: values.name });
	}

	return (
		<Box
			p="5"
			w="100vw"
			h="100vh"
			bg={theme.colors.gray[200]}
			overflow="scroll"
		>
			<Text fontSize="3xl" mb="5">
				Rick and Morty Characters
			</Text>
			<SearchBar
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				register={register}
				isSubmitting={isSubmitting}
			/>
			<CharacterTable data={characters ?? []} />
			<Flex justify="center" m="5">
				<Flex direction="row" gap="5">
					<Button
						colorScheme="green"
						onClick={() => dispatch({ type: SearchActionTypes.DECREMENT })}
						isDisabled={state.page === 1}
					>
						Previous
					</Button>
					<Box>{state.page}</Box>
					<Box>of</Box>
					<Box>{state.totalPages}</Box>
					<Button
						colorScheme="green"
						onClick={() => dispatch({ type: SearchActionTypes.INCREMENT })}
						isDisabled={state.page === state.totalPages}
					>
						Next
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
}
