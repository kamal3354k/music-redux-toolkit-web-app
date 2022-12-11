import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Error, Loader, SongCard } from "../components";
import { useGetSongBySearchQuery } from "../redux/services/shazamCore";

const TopCharts = () => {

  const {searchTerm} = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state?.player);
  const { data, isFetching, error } = useGetSongBySearchQuery(searchTerm);

const songs = data?.tracks?.hits?.map((song)=>song?.track)

  if (isFetching) return <Loader title="Loading song..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
      Showing results for <span className="font-black">{searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map(
          (song, i) =>
          song?.hub?.actions?.length && (
              <SongCard
                key={song?.key}
                i={i}
                isPlaying={isPlaying}
                data={data}
                song={song}
                activeSong={activeSong}
              />
            )
        )}
      </div>
    </div>
  );
};

export default TopCharts;
