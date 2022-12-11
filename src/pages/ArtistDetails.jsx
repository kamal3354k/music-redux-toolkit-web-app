import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";
import ArtistRelatedSongBar from "../components/ArtistRelatedSongBar";
import { useEffect, useState } from "react";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetArtistDetailsQuery(artistId);
  const [artistMappedData, setArtistMappedData] = useState([]);

  useEffect(() => {
    setArtistMappedData(data?.data[0]?.views["top-songs"]?.data?.map((item)=>({
      title: item?.attributes?.name,
    subtitle: item?.attributes?.artistName,
    hub: {
      actions: [
        {},
        {
          uri: item?.attributes?.previews[0]?.url,
        },
      ],
    },
    images: {
      coverart: item?.attributes?.artwork?.url,
    },
    })))
  }, [data?.data[0]]);

  if (isFetching) return <Loader title="Loading artist details" />;

  if (error) return <Error />;


  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={data} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Top 10 songs:</h2>
      </div>
      {artistMappedData?.map((item, i) => (
        <ArtistRelatedSongBar
          isPlaying={isPlaying}
          artistId={artistId}
          activeSong={activeSong}
          song={item}
          i={i}
          data={artistMappedData}
        />
      ))}
    </div>
  );
};

export default ArtistDetails;
