# A pretty boring Svelte-based Spotify client

This is a small little project that uses the Sp[otify API.

- Get user playlists
- Get songs for playlist and their "features"
- Play a song
- Simple pause/play viewing of song status

# Why?

I believe in making random little things like this as a learning experiment.  I want to eventually make a Svelte course, but first I need to get a good grasp on making things in Svelte.

# Setting up App


Make client and get public/secret at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).

Set redirect uri to `http://localhost:5173/`.

1. copy env.template to .env, fill it out (see above)
1. `npm install`
1. `npm dev`...
1. Click `login` to connect with your Spotify Account.

After this, you should be able to click through your playlists and play around.

![](/2022-12-11-screenshot.png)
