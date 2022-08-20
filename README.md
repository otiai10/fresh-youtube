# fresh-youtube

```tsx
import {
  YouTubePlayerDelegate,
  YouTubePlayerView,
} from "https://deno.land/x/fresh-youtube@0.1.0/";

export default function MyIsland(props: YourIslandProps) {
  const delegate = useMemo(() => new YouTubePlayerDelegate(), []);
  return (
    <div>
      <YouTubePlayerView
        style={{ width: "100%", height: "60vh" }}
        eventListener={delegate}
        controller={delegate}
      />
    </div>
  );
}
```
