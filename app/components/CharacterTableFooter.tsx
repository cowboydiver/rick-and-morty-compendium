import { Box, Button, Flex } from "@chakra-ui/react";
import {
	SearchAction,
	SearchActionTypes,
	SearchState,
} from "../reducers/SearchReducer";
import { Dispatch } from "react";

interface CharacterTableFooterProps {
	state: SearchState;
	dispatch: Dispatch<SearchAction>;
}

function CharacterTableFooter({ state, dispatch }: CharacterTableFooterProps) {
	return (
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
	);
}

export default CharacterTableFooter;
