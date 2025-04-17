import PropTypes from 'prop-types';

const VideoPlayerHome = ({ videoId }) => {


  return (<div className="w-full max-w-3xl mx-auto">
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1`}
        title="YouTube Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>);
};

VideoPlayerHome.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default VideoPlayerHome;
