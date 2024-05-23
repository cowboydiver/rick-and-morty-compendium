import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Episode, getEpisode } from "rickmortyapi";

interface EpisodeTableProps {
    episodeUrlArray: string[];
}

const episodeColumns: TableColumn<Episode>[] = [
    {
        name: 'Episode Name',
        width: '300px',
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

    let episodeCodes: number[] = [0]; //HACK: for some reason this is needed to prevent characters with only one episode from not rendering episodes

    if(episodeUrl === undefined)
    console.log("episodeUrl is undefined")
    
    episodeUrl?.forEach(url => {
      //get the last number in the url
        const urlArray = url.split('/')
        const episodeNumber = urlArray[urlArray.length - 1]
        episodeCodes.push(parseInt(episodeNumber))
    })
    
    return episodeCodes
}
    
export default function EpisodeTable({ episodeUrlArray }: EpisodeTableProps) {

    const paginationComponentOptions = {
	    noRowsPerPage: true,
    };

    const [episodeIds, setEpisodeIds] = useState<number[]>([])

    const [episodeData, setEpisodeData] = useState<Episode[]>([]) //All characters are in an episode


    // get episode ids from the url array
    useEffect(() => {
        setEpisodeIds(getEpisodeIds(episodeUrlArray))
    }, [episodeUrlArray])

    useEffect(() => {
        getEpisode(episodeIds).then(result => {
            setEpisodeData(result.data.map((item: Episode) => item))
        }).catch(err => {   
            console.log(err)
        })   
    }, [episodeIds])

    return (
        <DataTable columns={episodeColumns} data={episodeData ?? []} dense pagination={episodeData?.length > 10 ? true : false}  paginationComponentOptions={paginationComponentOptions} />
    )
}