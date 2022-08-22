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
  __onPlayerLoaded__(player: YT.Player): void;
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
  private __onPlayerReadyPromise__?: Promise<YT.Player>;
  private __onPlayerReadyPromiseResolve___?: (
    p: YT.Player | PromiseLike<YT.Player>,
  ) => void;
  // }}}

  /**
   * @param {YouTubePlayerDelegateOptions} option
   */
  constructor(option?: YouTubePlayerDelegateOptions) {
    if (option?.stateUpdater) this.__notifier__ = option.stateUpdater;
    if (option?.initialVideoID) this.__initialVideoID__ = option.initialVideoID;
    this.__onPlayerReadyPromise__ = new Promise<YT.Player>((resolve) => {
      this.__onPlayerReadyPromiseResolve___ = resolve;
    });
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
    console.error("[ERROR] fresh-youtube:YouTubePlayerDelegate", ev);
  }

  /**
   * @param {YT.PlayerEvent} ev
   * @implement YouTubePlayerEventListener
   */
  onReady(ev: YT.PlayerEvent) {
    this.__onPlayerReadyPromiseResolve___!(this.__player__!);
  }
  // }}}

  /**
   * This method is called by YouTubePlayerView when it's ready.
   * @param {YT.Player} player
   * @implement YouTubePlayerController
   */
  __onPlayerLoaded__(player: YT.Player): void {
    this.__player__ = player;
  }
  get ready(): Promise<YT.Player> {
    return this.__onPlayerReadyPromise__!;
  }

  /**
   * Specifies the video which will be played immediately after it's ready.
   * @returns {string}
   * @see https://developers.google.com/youtube/iframe_api_reference
   * @implement YouTubePlayerController
   */
  initialVideoID(): string {
    if (this.__initialVideoID__) return this.__initialVideoID__;
    return "";
  }

  /**
   * Player methods:
   * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/youtube/index.d.ts#L703-L1020
   */

  // {{{ basic control
  play(): void {
    this.__player__?.playVideo();
  }
  stop(): void {
    this.__player__?.stopVideo();
  }
  pause(): void {
    this.__player__?.pauseVideo();
  }
  load(
    videoId: string,
    startSeconds?: number,
    suggestedQuality?: YT.SuggestedVideoQuality,
  ): void {
    console.log(this.__player__, this.__player__?.loadVideoById);
    this.__player__!.loadVideoById(videoId, startSeconds, suggestedQuality);
  }
  cue(
    videoId: string,
    startSeconds?: number,
    suggestedQuality?: YT.SuggestedVideoQuality,
  ): void {
    this.__player__?.cueVideoById(videoId, startSeconds, suggestedQuality);
  }
  next(): void {
    this.__player__?.nextVideo();
  }
  prev(): void {
    this.__player__?.previousVideo();
  }
  // }}}

  // Mute control
  get muted(): boolean {
    return this.__player__!.isMuted();
  }
  set muted(yes: boolean) {
    (yes) ? this.__player__?.mute() : this.__player__?.unMute();
  }

  // Volume control
  set volume(vol: number) {
    this.__player__?.setVolume(vol);
  }
  get volume(): number {
    return this.__player__!.getVolume();
  }

  // currentTime control
  get currentTime(): number {
    return this.__player__!.getCurrentTime();
  }
  set currentTime(seconds: number) {
    this.__player__?.seekTo(seconds, true);
  }

  // Duration
  get duration(): number {
    return this.__player__!.getDuration();
  }

  // State control
  get state(): PlayerState {
    return this.__player__!.getPlayerState();
  }

  /**
   * `progress` is a shorthanded expression for the rate of progress,
   * expressed in percentage format.
   * Value must be between 0~100.
   */
  get progress(): number {
    return Math.round(100 * this.currentTime / this.duration);
  }
  set progress(percentage: number) {
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    const sec = this.duration * (percentage / 100);
    this.__player__?.seekTo(Math.round(sec), true);
  }

  /**
   * DO NOT USE.
   * Removes ths <iframe> of the player.
   */
  __destroy__(): void {
    this.__player__?.destroy();
  }
  // }}}
}

export interface YouTubePlayerDelegateOptions {
  stateUpdater?: StateUpdater<PlayerState>;
  initialVideoID?: string;
}
