/** @jsx h */
import { h } from "preact";
import ExampleIsland from "../islands/ExampleIsland.tsx";

export default function Home() {
  return (
    <div>
      <h1>🦕 🍋 fresh-youtube example project.</h1>
      <p>
        See{" "}
        <a href="https://github.com/otiai10/fresh-youtube">
          https://github.com/otiai10/fresh-youtube
        </a>{" "}
        for more detail.
      </p>
      <ExampleIsland />
    </div>
  );
}
