import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useEffect } from "react";
import { useGetSongByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state?.player);
  const { data, isFetching, error } = useGetSongByCountryQuery(country);


  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_7f8EPmgg9ewPjzvwXUBuqcELkZVVY"
      )
      .then((res) => {
        setCountry(res?.data?.location?.country);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (isFetching && loading) return <Loader title="Loading song..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You
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

export default AroundYou;
