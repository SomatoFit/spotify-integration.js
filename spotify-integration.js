// Example JavaScript for Spotify Playback
const clientId = 'your_spotify_client_id';
const redirectUri = 'https://yourapp.com/callback';  // Update with your actual redirect URI
const scopes = 'streaming user-read-email user-read-private user-modify-playback-state';

// Step 1: Spotify OAuth login
function connectSpotify() {
  const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
  window.location = authUrl;
}

// Step 2: Handle the redirect and initialize Spotify Web Playback SDK
function getAccessTokenFromUrl() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  return params.get('access_token');
}

const token = getAccessTokenFromUrl();

if (token) {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Your Fitness App Player',
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    player.connect();
  };
}
