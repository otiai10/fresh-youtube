# fresh-youtube

[![Deno CI](https://github.com/otiai10/fresh-youtube/actions/workflows/deno-ci.yml/badge.svg)](https://github.com/otiai10/fresh-youtube/actions/workflows/deno-ci.yml)
[![Deploy Example](https://github.com/otiai10/fresh-youtube/actions/workflows/deploy-example.yml/badge.svg)](https://fresh-youtube.deno.dev/)

View component and controller of
[YouTube Player API](https://developers.google.com/youtube/iframe_api_reference),
for [fresh framework](https://github.com/denoland/fresh).

# Try it now!

```
git clone git@github.com:otiai10/fresh-youtube.git
cd ./fresh-youtube
cd ./example
deno task start
```

<a href="https://fresh-youtube.deno.dev/"><img src="https://user-images.githubusercontent.com/931554/185740364-cdfde559-1dd4-4547-bc3c-ad25e577c04a.png" width="60%" alt="example" /></a>

# Example

See
[./example/islands/ExampleIsland.ts](https://github.com/otiai10/fresh-youtube/blob/main/example/islands/ExampleIsland.tsx).

```tsx
/** @jsx h */
import { h } from "preact";
import { useMemo, useState } from "preact/hooks";

import {
  PlayerState,
  YouTubePlayerDelegate,
  YouTubePlayerView,
} from "https://deno.land/x/fresh_youtube@0.1.1/mod.ts";

export default function ExampleIsland() {
  // This is what we already know: useState to see dynamic value.
  const [playerState, setPlayerState] = useState<PlayerState>(
    PlayerState.UNSTARTED,
  );

  // Then, let's create a delegated object to access what happens in YT player.
  const delegate = useMemo(() =>
    new YouTubePlayerDelegate({
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
      <h2 style={{ fontFamily: "monaco" }}>
        {playerState}: {PlayerState[playerState]}
      </h2>

      {/* Wanna control? Sure, everything is delegated to your object! */}
      <button
        onClick={() => delegate.play()}
        disabled={playerState == PlayerState.PLAYING}
      >
        PLAY
      </button>
      <button
        onClick={() => delegate.pause()}
        disabled={playerState == PlayerState.PAUSED}
      >
        PAUSE
      </button>
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
