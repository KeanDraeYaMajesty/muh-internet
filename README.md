# muh-internet

**Your own flavor** of transparent website CSS for [Zen Internet](https://addons.mozilla.org/en-US/firefox/addon/zen-internet/) on Zen Browser.

This repo is an independent fork of the community styles catalog — maintained separately as **muh-internet**, not as a contribution track back to the upstream project.

## Point Zen Internet here

In the Zen Internet extension popup:

1. Open settings / advanced styles repository URL
2. Set it to one of:

```text
https://raw.githubusercontent.com/KeanDraeYaMajesty/muh-internet/main/styles.json
```

or (after GitHub Pages is enabled):

```text
https://keandraeyamajesty.github.io/muh-internet/styles.json
```

3. Click **Refetch latest styles**

Enable **Force styling** (uses `example.com.css`) if you want glass transparency on sites that don’t have a dedicated stylesheet yet.

## Flavor highlights

- YouTube glass queue, notifications, account menu, and search bar
- Comments gutter so related content doesn’t get clipped
- DRM streamer chrome transparency (Netflix, Hulu, Max, Disney+, Peacock, Paramount+, Prime Video) — page UI only; protected video pixels stay DRM-black by design
- Broader catch-all force theme via `example.com.css`

## Contributing to *this* flavor

1. Add or edit `websites/[domain].css`
2. Use feature comments (`/* prefix-feature $ description */`) with `!important` on properties
3. Run `npm install && npm run update` to rebuild `styles.json`
4. Commit and push to **this** repo only

## Credits

Originally derived from [sameerasw/my-internet](https://github.com/sameerasw/my-internet) (MIT). This tree is intentionally maintained as a separate flavor.
