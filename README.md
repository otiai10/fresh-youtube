# fresh-youtube

[![Deno CI](https://github.com/otiai10/fresh-youtube/actions/workflows/deno-ci.yml/badge.svg)](https://github.com/otiai10/fresh-youtube/actions/workflows/deno-ci.yml)

```tsx
import {
  YouTubePlayerDelegate,
  YouTubePlayerView,
  PlayerState,
} from "https://deno.land/x/fresh-youtube@0.1.0/";

export default function MyIsland() {

  // This is what we already know: useState to see dynamic value.
  const [playerState, setPlayerState] = useState<PlayerState>(PlayerState.UNSTARTED);

  // Then, let's create a delegated object to access what happens in YT player.
  const delegate = useMemo(() => new YouTubePlayerDelegate({
    stateUpdater: setPlayerState,
    initialVideoID: "MGt25mv4-2Q",
  }), []); // Please use `useMemo` to avoid repeated initialization.

  // Finally, you can render the View!
  return (
    <div>

      {/* You don't have to worry about YT or any other mess! */}
      <YouTubePlayerView
        style={{ width: "100%", height: "60vh" }}
        delegate={delegate}
      />

      {/* Yes, you can access what's happening now by the `state`! */}
      <div>{playerState}</div>

      {/* Wanna control? Sure, everything is delegated to your object! */}
      <button onClick={delegate.play()}>PLAY</button>
      <button onClick={delegate.pause()}>PAUSE</button>
    </div>
  );
}
```

# Acknowledgment

- https://github.com/itok01/fresh-youtube-player
- https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/youtube
- https://developers.google.com/youtube/iframe_api_reference
- https://github.com/denoland/fresh
- https://github.com/preactjs/preact
