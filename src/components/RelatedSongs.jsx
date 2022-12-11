import SongBar from "./SongBar";

const RelatedSongs = ({
  data,
  isPlaying,
  artistId,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="flex flex-col">
    <h1 className="text-white font-bold text-3xl">Related Songs:</h1>
    <div className="mt-6">
      {data?.map((song, i) => (
        <SongBar
          key={i}
          i={i}
          song={song}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
