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
