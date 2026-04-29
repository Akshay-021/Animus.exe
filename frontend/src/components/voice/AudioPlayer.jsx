export default function AudioPlayer({ src, autoPlay = false }) {
  if (!src) return null;

  const audioSrc = src instanceof Blob ? URL.createObjectURL(src) : src;

  return (
    <audio className="audio-player" controls autoPlay={autoPlay} src={audioSrc}>
      Your browser does not support audio playback.
    </audio>
  );
}
