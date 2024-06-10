import { Box, Button, Flex, FormControl, Input } from "@chakra-ui/react";
import {
	FieldValues,
	UseFormHandleSubmit,
	UseFormRegister,
} from "react-hook-form";

interface SearchBarProps {
	onSubmit: (values: FieldValues) => void;
	handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
	register: UseFormRegister<FieldValues>;
	isSubmitting: boolean;
}

export default function SearchBar({
	onSubmit,
	handleSubmit,
	register,
	isSubmitting,
}: SearchBarProps) {
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Box mb="4">
				<FormControl>
					<Flex direction="row" justify="flex-start">
						<Input
							id="name"
							{...register("name")}
							placeholder="Search a character"
							variant="solid"
							mb="5"
							maxW="400px"
						/>
						<Button
							type="submit"
							colorScheme="green"
							ml="5"
							isLoading={isSubmitting}
						>
							Search
						</Button>
					</Flex>
				</FormControl>
			</Box>
		</form>
	);
}
