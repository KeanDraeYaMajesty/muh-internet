# muh-internet

Independent Zen Internet styles flavor for Zen Browser — glass transparency across the web, including DRM streamer *chrome* and a catch-all for everything else.

## Point Zen Internet at this flavor

1. Open the **Zen Internet** extension popup  
2. Set the styles repository URL to:

```text
https://raw.githubusercontent.com/KeanDraeYaMajesty/muh-internet/main/styles.json
```

3. Click **Refetch latest styles**  
4. Enable **Force styling** (applies `example.com.css` to sites without a dedicated sheet)  
5. Keep **Transparency** on

That’s how “every other site” gets glass: dedicated sheets when we have them, force styling everywhere else.

## DRM / streaming apps

Dedicated chrome themes for:

- Netflix, Hulu, Max (`max.com` + `play.max.com`), Disney+, Peacock, Paramount+, Prime Video  
- Crunchyroll, Tubi, Discovery+  
- Plus existing catalog sheets (YouTube, Twitch, Plex, Spotify, …)

**Important:** CSS can transparent the site UI. Encrypted video frames stay black/blocked — that’s browser DRM (EME), not the theme. Zenslop-style mirrors also can’t capture those pixels.

## Flavor extras (YouTube)

- Glass playlist/queue, notifications, account menu, search bar  
- Comments gutter so related content doesn’t clip under the panel  

## Develop

```bash
npm install
npm run update   # rebuilds styles.json from websites/*.css
```

## Credits

Derived from [sameerasw/my-internet](https://github.com/sameerasw/my-internet) (MIT). Maintained here as a separate flavor — not an upstream contribution track.
