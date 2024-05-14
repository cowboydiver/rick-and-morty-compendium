import { Box, Flex, Image, Text, theme } from '@chakra-ui/react';
import DataTable, { ExpanderComponentProps, TableColumn } from 'react-data-table-component';
import { Character } from 'rickmortyapi';
import EpisodeTable from './EpisodesTable';

interface CharacterTableProps {
    data: Character[];
}

const columns: TableColumn<Character>[] = [
	{
		name: 'Name',
		selector: row => row.name,
	},
	{
		name: 'Gender',
		selector: row => row.gender,
	},
	{
		name: 'Status',
		selector: row => row.status,
	},
    {
        name: 'Species',
        selector: row => row.species,
    },
    {
        name: 'Location',
        selector: row => row.location.name,
    },
    {
        name: 'Episodes',
        selector: row => row.episode.length,
    },
];

function ExpandedDataPoint({ header, value }: { header: string, value: string }) {
    return (
        <Box>
            <Text fontSize="sm" color={theme.colors.gray[400]}>{header}</Text>
            <Text>{value}</Text>
        </Box>
        );

}

function ExpandedComponent({ data }: ExpanderComponentProps<Character>) {
    return (
        <Flex direction="row" m="5" gap="5">
            <Flex direction="row" gap="5">
                <Image mb="auto" src={data.image} alt={data.name}/>
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

export default function CharacterTable({ data }: CharacterTableProps) {
    return (
        <Box borderRadius={theme.radii.md}>
            <DataTable columns={columns} data={data} expandableRows expandableRowsComponent={ExpandedComponent} />
        </Box>
    );
}

