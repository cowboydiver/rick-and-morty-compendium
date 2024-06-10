import { Box, Flex, Image, theme } from "@chakra-ui/react";
import { ExpanderComponentProps } from "react-data-table-component";
import { Character } from "rickmortyapi";
import EpisodeTable from "./EpisodesTable";
import ExpandedDataPoint from "./ExpandedDataPoint";

export default function ExpandedComponent({
	data,
}: ExpanderComponentProps<Character>) {
	return (
		<Flex direction="row" m="5" gap="5">
			<Flex direction="row" gap="5">
				<Image mb="auto" src={data.image} alt={data.name} />
				<Box>
					<Flex direction="column" gap="2">
						<ExpandedDataPoint header="Name" value={data.name} />
						<ExpandedDataPoint header="Gender" value={data.gender} />
						<ExpandedDataPoint header="Status" value={data.status} />
						<ExpandedDataPoint header="Species" value={data.species} />
						<ExpandedDataPoint header="Origin" value={data.origin.name} />
						<ExpandedDataPoint header="Location" value={data.location.name} />
					</Flex>
				</Box>
			</Flex>
			<Box border="1px solid" borderColor={theme.colors.gray[500]}>
				<EpisodeTable episodeUrlArray={data.episode ?? []} />
			</Box>
		</Flex>
	);
}
