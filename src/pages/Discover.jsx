import { Loader, SongCard, Error } from "../components";
import { genres } from "../assets/constants";
import { useGetSongByGenreQuery } from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying,genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongByGenreQuery(genreListId||"POP");

  if (isFetching) return <Loader title="Loading song..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genres?.find(({value})=>value===genreListId)?.title}
        </h2>
        <select
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
          onChange={(e) => {dispatch(selectGenreListId(e.target.value))}}
          value={genreListId}
        >
          {genres.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, index) => (
          <SongCard
            key={song?.key}
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            i={index}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
