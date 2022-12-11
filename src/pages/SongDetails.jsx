import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetArtistRelatedQuery,
  useGetSongDetailsQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid,id:artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: songData, isFetching: isFetchSongDetails } =
    useGetSongDetailsQuery({ songid });

  const {
    data,
    isFetching: isFetchArtistRelated,
    error,
  } = useGetArtistRelatedQuery({ songid });

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  if (isFetchArtistRelated || isFetchSongDetails)
    return <Loader title="Searching song details" />;

  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1]?.type === "LYRICS" ? (
            songData?.sections[1]?.text?.map((line, i) => (
              <p key={i}className="text-base text-gray-400 my-1">{line}</p>
            ))
          ) : (
            <p className="text-base text-gray-400 my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        artistId={artistId}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
