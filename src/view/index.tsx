/** @jsx h */
import type {} from "https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/youtube/index.d.ts";
import { h, RefCallback } from "https://esm.sh/preact@10.10.6";

import {
  YouTubePlayerController,
  YouTubePlayerEventListener,
} from "../delegate/index.ts";

/**
 * Either of following patterns is required:
 * Pattern 1: Provide both of `eventListener` and `controller`.
 * Pattern 2: Provide only `delegate`.
 *
 * Please check the definition of interfaces, which are,
 * `YouTubePlayerEventListener` and `YouTubePlayerController`
 * to know what you need to prepare on your side.
 * If it's annoying for you to implement them, you can just use
 * `YouTubePlayerDelegate` class as a short-handed implementation.
 */
export interface YouTubePlayerViewProps
  extends h.JSX.HTMLAttributes<HTMLDivElement> {
  eventListener?: YouTubePlayerEventListener;
  controller?: YouTubePlayerController;
  delegate?: YouTubePlayerEventListener & YouTubePlayerController;
  context?: Window & typeof globalThis;
}

export function YouTubePlayerView(props: YouTubePlayerViewProps) {
  const onDivLoaded: RefCallback<HTMLDivElement> = (
    ref: HTMLDivElement | null,
  ) => {
    // {{{ Validation
    let { context, eventListener, controller, delegate } = props;
    if (!context) context = window;
    if (delegate) controller = delegate;
    eventListener = delegate;
    if (!eventListener || !controller) {
      throw new Error(
        "Both `eventListener` and `controller` are required, or provide `delegate`",
      );
    }
    // }}}

    // {{{ Definition of init steps.
    const scriptOnLoad = () => {
      const yt = (context as any).YT;
      (context as any)["onYouTubeIframeAPIReady"] = () => {
        const player = new yt.Player(ref, {
          width: "100%",
          height: "100%",
          videoId: (controller!.initialVideoID)
            ? controller?.initialVideoID()
            : null,
          events: {
            onStateChange: (ev) => eventListener!.onStateChange(ev),
            onError: (ev) => eventListener!.onError(ev),
            onReady: (ev) =>
              (eventListener!.onReady) ? eventListener!.onReady(ev) : null,
          },
        } as YT.PlayerOptions);
        controller!.onPlayerLoaded(player);
      };
    };
    // }}}

    // {{{ Injection
    const script: HTMLScriptElement = context.document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.onload = scriptOnLoad;
    context.document.head.appendChild(script);
    // }}}
  };

  return (
    <div style={props.style}>
      <div id="player" ref={onDivLoaded}></div>
    </div>
  );
}
