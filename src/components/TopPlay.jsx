import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import "swiper/css";
import "swiper/css/free-mode";
import { useGetTopChartQuery } from "../redux/services/shazamCore";
import { useRef } from "react";

const TopChartCard = ({
  song,
  index,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  isPlaying,
}) => {

  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4  rounded-lg cursor-pointer mb-2">
      <h3 className="fot-bold text-base text-white mr-3">{index + 1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          src={song?.images?.coverart}
          alt={song?.title}
          className="w-20 h-20 rounded-lg"
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.key}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song?.artists[0].adamid}`}>
            <p className="text-base font-bold text-gray-300 mt-1">
              {song?.subtitle}
            </p>
          </Link>
        </div>
      </div>
      <PlayPause
        song={song}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartQuery();
  const divRef = useRef(null);

  const topPlay = data?.slice(0, 5);

  const handlePlayClick = ( song, i ) => {

    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };


  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1  xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row  justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlay?.map((song, index) => (
            <TopChartCard
              key={song?.key}
              song={song}
              index={index}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={()=>handlePlayClick(song,index)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-row  justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            centeredSlides
            centeredSlidesBounds
            modules={[FreeMode]}
            className="mt-4"
          >
            {topPlay?.map((song) => (
              <SwiperSlide
                key={song?.key}
                style={{ width: "25%", height: "auto" }}
                className="rounded-full shadow-lg animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img
                    src={song?.images.background}
                    alt="name"
                    className="rounded-full w-full object-cover"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopPlay;
