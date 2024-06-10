import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Episode, getEpisode } from "rickmortyapi";

interface EpisodeTableProps {
	episodeUrlArray: string[];
}

const episodeColumns: TableColumn<Episode>[] = [
	{
		name: "Episode Name",
		width: "300px",
		selector: (row) => row.name,
	},
	// get the episode number from the the row.episode string
	{
		name: "Season",
		selector: (row) => {
			const seasonCode = row.episode.split("E")[0].split("S")[1];
			return seasonCode;
		},
	},
	{
		name: "Episode",
		selector: (row) => {
			const episodeCode = row.episode.split("E")[1];
			return episodeCode;
		},
	},
];

const getEpisodeIds = (episodeUrl: string[]) => {
	let episodeCodes: number[] = [];

	if (episodeUrl === undefined) console.log("episodeUrl is undefined");

	episodeUrl?.forEach((url) => {
		//get the last number in the url
		const urlArray = url.split("/");
		const episodeNumber = urlArray[urlArray.length - 1];
		episodeCodes.push(parseInt(episodeNumber));
	});

	return episodeCodes;
};

export default function EpisodeTable({ episodeUrlArray }: EpisodeTableProps) {
	const paginationComponentOptions = {
		noRowsPerPage: true,
	};

	const [episodeData, setEpisodeData] = useState<Episode[]>([]); //All characters are in an episode so we don't need to check for undefined

	useEffect(() => {
		getEpisode(getEpisodeIds(episodeUrlArray))
			.then((result) => {
				// check of the result is an array or an object
				// if it is an object, convert it to an array
				// this is needed because the API returns an object if there is only one episode
				if (!Array.isArray(result.data)) {
					result.data = [result.data];
				}
				setEpisodeData(result.data.map((item: Episode) => item));
			})
			.catch((err) => {
				console.log(err);
			});
	}, [episodeUrlArray]);

	return (
		<DataTable
			columns={episodeColumns}
			data={episodeData ?? []}
			dense
			pagination={episodeData?.length > 10 ? true : false}
			paginationComponentOptions={paginationComponentOptions}
		/>
	);
}
