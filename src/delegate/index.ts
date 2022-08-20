import type {} from "https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/types/youtube/index.d.ts";
import { StateUpdater } from "https://esm.sh/preact@10.10.6/hooks/src/index.d.ts";

// {{{ FIXME: Better to extend existing default definition by YT.
// export const PlayerState = YT.PlayerState;
// export type PlayerState = YT.PlayerState;
export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}
// }}}

export interface YouTubePlayerEventListener {
  onStateChange: YT.PlayerEventHandler<YT.OnStateChangeEvent>;
  onError: YT.PlayerEventHandler<YT.OnErrorEvent>;
  onReady?: YT.PlayerEventHandler<YT.PlayerEvent>;
  onPlaybackQualityChange?: YT.PlayerEventHandler<
    YT.OnPlaybackQualityChangeEvent
  >;
  onPlaybackRateChange?: YT.PlayerEventHandler<YT.OnPlaybackRateChangeEvent>;
  onApiChange?: YT.PlayerEventHandler<YT.PlayerEvent>;
}

export interface YouTubePlayerController {
  onPlayerLoaded(player: YT.Player): void;
  initialVideoID?(): string;
  autoPlay?(): boolean;
}

/**
 * YouTubePlayerDelegate is just a useful (or nosy) short-hand of
 * implementation for both YouTubePlayerEventListener & YouTubePlayerController.
 * If you want to implement your own, please check following interfaces:
 *
 * 1. YouTubePlayerEventListener
 * 2. YouTubePlayerController
 */
export class YouTubePlayerDelegate
  implements YouTubePlayerEventListener, YouTubePlayerController {
  // {{{
  protected __player__?: YT.Player;
  protected __notifier__?: StateUpdater<PlayerState>;
  protected __initialVideoID__?: string;
  // }}}

  /**
   * @param {YouTubePlayerDelegateOptions} option
   */
  constructor(option?: YouTubePlayerDelegateOptions) {
    if (option?.stateUpdater) this.__notifier__ = option.stateUpdater;
    if (option?.initialVideoID) this.__initialVideoID__;
  }

  /**
   * @YAGNI
   */
  // protected notifyState() {
  //   if (this.__notifier__) this.__notifier__(this.__player__!.getPlayerState());
  // }

  /**
   * @param {YT.OnStateChangeEvent} ev
   * @implement YouTubePlayerEventListener
   */
  onStateChange(ev: YT.OnStateChangeEvent) {
    if (this.__notifier__) this.__notifier__(ev.target.getPlayerState());
  }
  /**
   * @param {YT.OnErrorEvent} ev
   * @implement YouTubePlayerEventListener
   */
  onError(ev: YT.OnErrorEvent) {
  }

  /**
   * @param {YT.PlayerEvent} ev
   * @implement YouTubePlayerEventListener
   */
  onReady(ev: YT.PlayerEvent) {
  }
  // }}}

  /**
   * This method is called by YouTubePlayerView when it's ready.
   * @param {YT.Player} player
   * @implement YouTubePlayerController
   */
  onPlayerLoaded(player: YT.Player): void {
    this.__player__ = player;
  }

  /**
   * Specifies the video which will be played immediately after it's ready.
   * By default, "YouTube Developers Live: Embedded Web Player Customization"
   * provided by https://www.youtube.com/googlecode. Enjoy ;)
   * @returns {string}
   * @see https://developers.google.com/youtube/iframe_api_reference
   * @implement YouTubePlayerController
   */
  initialVideoID(): string {
    if (this.__initialVideoID__) return this.__initialVideoID__;
    const officialVideoID = "M7lc1UVf-VE";
    return officialVideoID;
  }

  // {{{ TODO: Satisfy basic usage.
  play(): void {
    this.__player__?.playVideo();
  }
  stop(): void {
    this.__player__?.stopVideo();
  }
  pause(): void {
    this.__player__?.pauseVideo();
  }
  // }}}
}

export interface YouTubePlayerDelegateOptions {
  stateUpdater?: StateUpdater<PlayerState>;
  initialVideoID?: string;
}
