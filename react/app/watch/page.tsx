import ReactPlayer from "react-player";

export default function WatchPage() {
  return (
    <div>
      <ReactPlayer
        url={
          "https://d3uzffi3m1uc9u.cloudfront.net/57fb0fc5-6cc8-475b-aea9-03b567a9bae4/hls/This Video Is 1 Second.m3u8"
        }
        allowFullScreen
        width="100%"
        height={"100%"}
        className="mx-auto p-[16] relative"
        controls
      />
    </div>
  );
}
