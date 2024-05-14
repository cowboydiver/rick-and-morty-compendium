import { get } from "http";
import { use, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { ApiResponse, Episode, getEpisode, getEpisodes } from "rickmortyapi";

interface EpisodeTableProps {
    episodeUrlArray: string[];
}

const episodeColumns: TableColumn<Episode>[] = [
    {
        name: 'Episode Name',
        selector: row => row.name,
    },
    // get the episode number from the the row.episode string
    {
        name: 'Season',
        selector: row => {
            const seasonCode = row.episode.split('E')[0].split('S')[1]
            return seasonCode
        },
    },
    {
        name: 'Episode',
        selector: row => {
            const episodeCode = row.episode.split('E')[1].split('S')[0]
            return episodeCode
        
        },
    },
];


const getEpisodeIds = (episodeUrl: string[]) => {

    let episodeCodes: number[] = [];
    
    episodeUrl?.forEach(url => {
      //get the last number in the url
        const urlArray = url.split('/')
        const episodeNumber = urlArray[urlArray.length - 1]
        episodeCodes.push(parseInt(episodeNumber))
    })
    return episodeCodes
}

async function getEpisodeData(episodeUrlIds: number[]) {
    return new Promise<ApiResponse<Episode[]>>(resolve => {
        getEpisode(episodeUrlIds).then(response => {
            resolve(response);
        });
    });
}
    
export default function EpisodeTable({ episodeUrlArray }: EpisodeTableProps) {

    const paginationComponentOptions = {
	    noRowsPerPage: true,
    };

    const [episodeData, setEpisodeData] = useState<Episode[]>([])

    useEffect(() => {
        const episodeIds = getEpisodeIds(episodeUrlArray)
        getEpisodeData(episodeIds).then(result => {
            setEpisodeData(result.data?.map((item: Episode) => item))
        })
    }, [episodeUrlArray])

    // return <div>hello</div>
    return <DataTable columns={episodeColumns} data={episodeData} dense pagination={episodeData.length > 10 ? true : false} paginationComponentOptions={paginationComponentOptions} />
}