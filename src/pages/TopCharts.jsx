import React from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartQuery } from "../redux/services/shazamCore";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state?.player);
  const { data, isFetching, error } = useGetTopChartQuery();

  if (isFetching) return <Loader title="Loading song..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map(
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
