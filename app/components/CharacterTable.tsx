import { Box, Flex, Image, Text, theme } from '@chakra-ui/react';
import DataTable, { ExpanderComponentProps, TableColumn } from 'react-data-table-component';
import { Character } from 'rickmortyapi';
import EpisodeTable from './EpisodesTable';
import ExpandedComponent from './ExpandedComponent';

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

export default function CharacterTable({ data }: CharacterTableProps) {
    return (
        <Box borderRadius={theme.radii.md}>
            <DataTable columns={columns} data={data} expandableRows expandableRowsComponent={ExpandedComponent} />
        </Box>
    );
}

