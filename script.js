          // Prevent text selection to avoid flickering
          document.addEventListener('mousedown', function(e) {
            if (e.detail > 1) {
              e.preventDefault();
            }
          }, false);
          
          // Initialize Supabase Client - Replace with your actual project values
          const supabaseUrl = 'https://nxonhlsbiwiejcjfkrvv.supabase.co';
          const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54b25obHNiaXdpZWpjamZrcnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3ODEzOTQsImV4cCI6MjA1ODM1NzM5NH0.0qjK26i5EvACQJKTfnEMUTD89DzzOswCO1PeQz8omVA'; // Get this from your Supabase project settings
const supabase = null;
          // Mock data for songs
const songs = [
  { 
    id: 'song1', 
    title: 'Hatikvah',
    artist: 'Alon', 
    imageFile: 'https://static.wixstatic.com/media/e2da02_9a8d4dd9084d43b1a0f131e98f08a3e4~mv2.jpg',
    audioFile: 'https://res.cloudinary.com/dpogkjjow/video/upload/v1764807319/National_Anthem_of_Israel_-_Hatikvah_-_Lyrics_and_Translation_urpzhs.mp3'
  },
  { 
    id: 'song2', 
    title: 'Jew yorker', 
    artist: 'Alon', 
    imageFile: 'https://static.wixstatic.com/media/e2da02_cb4162351e874f04bd14c40af7c98da8~mv2.jpg',
    audioFile: 'https://res.cloudinary.com/dpogkjjow/video/upload/v1764807319/Corinne_Lafitte_-_Ah_Qu_il_Est_Doux_avec_paroles_wl0vb2.mp3'
  },
  { 
    id: 'song3', 
    title: 'Hava Nagila', 
    artist: 'Alon', 
    imageFile: 'https://static.wixstatic.com/media/e2da02_06747edaa79c491cadf773c6481f826a~mv2.jpg',
    audioFile: 'https://res.cloudinary.com/dpogkjjow/video/upload/v1764807319/Hava_Nagila_Original_eojnvs.mp3'
  },
  { 
    id: 'song4', 
    title: 'Hannukah mix', 
    artist: 'Alon', 
    imageFile: 'https://static.wixstatic.com/media/e2da02_f4e8abcf31d04d96a78f997107f092a3~mv2.jpg',
    audioFile: 'https://res.cloudinary.com/dpogkjjow/video/upload/v1764807319/Siman_Tov_Mazal_Tov_-_Heiveinu_Shalom_Aleichem_zc0c9j.mp3'
  },
  { 
    id: 'song5', 
    title: 'Rug pull mix', 
    artist: 'Alon', 
    imageFile: 'https://static.wixstatic.com/media/e2da02_924c0508ede944a094cc78a8d8074fe3~mv2.jpg',
    audioFile: 'https://res.cloudinary.com/dpogkjjow/video/upload/v1764807318/Corinne_Lafitte_-_%C3%89coute_Isra%C3%ABl_avec_paroles_wbzapq.mp3'
  },
  { 
    id: 'song6', 
    title: 'I love Israel', 
    artist: 'Alon', 
    imageFile: 'https://static.wixstatic.com/media/e2da02_0eb6d688f7a149fa95c1949c76e011aa~mv2.jpg', 
    audioFile: 'kim6.mp3' 
  },
  { 
    id: 'song7', 
    title: 'Fuck Finn Bags', 
    artist: 'Alon', 
    imageFile: 'https://static.wixstatic.com/media/e2da02_a6e8c5f0ff2b4425a7f1b27c20ad5815~mv2.jpg', 
    audioFile: 'kim7.mp3' 
  },
  { 
    id: 'song8', 
    title: 'Yehudi mix', 
    artist: 'Alon', 
    imageFile: 'https://static.wixstatic.com/media/e2da02_707707cd37814c80b8612bf3f6f5c07f~mv2.jpg', 
    audioFile: 'bts.mp3' 
  }
];
        
        // Default playlists
 const defaultPlaylists = [
  {
    id: 'playlist1',
    name: 'Bull market',
    description: 'The best songs from our Great Leader',
    image: 'https://static.wixstatic.com/media/e2da02_9a8d4dd9084d43b1a0f131e98f08a3e4~mv2.jpg',
    songs: ['song1', 'song2', 'song3']
  },
  {
    id: 'playlist2',
    name: 'Prison Workout',
    description: 'A collection of hits celebrating our Supreme Leader',
    image: 'https://static.wixstatic.com/media/e2da02_cb4162351e874f04bd14c40af7c98da8~mv2.jpg',
    songs: ['song2', 'song4', 'song6']
  },
  {
    id: 'playlist3',
    name: 'Money Laundering Anthems',
    description: 'Official anthems of our glorious capital',
    image: 'https://static.wixstatic.com/media/e2da02_06747edaa79c491cadf773c6481f826a~mv2.jpg',
    songs: ['song3', 'song5', 'song7']
  }
];
        
        // Keep track of the current song and play state
        let currentSong = null;
        let isPlaying = false;
        const audioPlayer = document.getElementById('audio-player');
        
        // Initialize volume
        audioPlayer.volume = 0.7; // 70% volume by default
        
        // Track whether we're dragging the timeline handle
        let isDraggingProgress = false;
        let isDraggingVolume = false;
        
        // Local storage keys
        const LIKED_SONGS_KEY = 'kimify-liked-songs';
        const RECENTLY_PLAYED_KEY = 'kimify-recently-played';
        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
  // Existing initialization code
  loadSongs();
  setupNavigation();
  initSearch();
  loadPlaylists();
  document.getElementById('current-song-like').addEventListener('click', toggleLikeSong);
  setVolumePercent(audioPlayer.volume);
  document.getElementById('add-playlist-btn').addEventListener('click', showAddPlaylistModal);
  addNewStyles();
  
  // Add new feature initializations
  addMapNavLink();
  addMemeNavLink();

  
// Add click to copy functionality for contract address
document.getElementById('contract-address').addEventListener('click', function() {
  const contractAddress = 'GMT3At2Y6mqx6sxZANTjczRrht68EdCgjtUFivxxpump';
  
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = contractAddress;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  
  // Show success message
  const originalText = this.textContent;
  this.textContent = 'Copied!';
  
  setTimeout(() => {
    this.textContent = originalText;
  }, 2000);
});

  // Add cursor pointer style
  document.getElementById('contract-address').style.cursor = 'pointer';

  // Setup share button in the wrapped modal
  const setupShareButton = function() {
    const shareButton = document.querySelector('.share-btn');
    if (shareButton) {
      shareButton.addEventListener('click', showErrorDialog);
    }
  };
  
  // Try to set up immediately
  setupShareButton();
  
  // Also try after a short delay in case the DOM isn't fully loaded
  setTimeout(setupShareButton, 1000);
});
        
        // Function to add styles for Supabase implementation
        function addNewStyles() {
          const styleElement = document.createElement('style');
          styleElement.textContent = `
            /* Upload image preview */
            .image-preview {
              width: 100%;
              height: 150px;
              background-color: #333;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              margin-top: 8px;
            }
            
            .image-preview img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            
            #cover-upload {
              background-color: #333;
              color: white;
              padding: 8px;
              border-radius: 4px;
              width: 100%;
            }
          `;
          document.head.appendChild(styleElement);
        }
        
// Function to load songs to the home view
function loadSongs() {
  const songsGrid = document.getElementById('songs-grid');
  songsGrid.innerHTML = '';
  
  songs.forEach(song => {
    const songCard = document.createElement('div');
    songCard.className = 'song-card';
    songCard.dataset.songId = song.id;
    
songCard.onclick = () => playSong(song.id);
    
    songCard.innerHTML = `
      <div class="song-img-container">
        <img src="${song.imageFile}" alt="${song.title}" class="song-img">
      </div>
      <div class="song-info-container">
        <div class="song-title">${song.title}</div>
        <div class="song-artist">${song.artist}</div>
      </div>
    `;
    
    songsGrid.appendChild(songCard);
  });
}
// Function to load playlists
async function loadPlaylists() {
  const playlistsContainer = document.getElementById('playlists-container');
  playlistsContainer.innerHTML = '';
  
  defaultPlaylists.forEach(playlist => {
    const li = document.createElement('li');
    li.dataset.playlistId = playlist.id;
    li.onclick = () => loadPlaylistView(playlist.id);
    
    li.innerHTML = `
      <img src="${playlist.image}" alt="${playlist.name}" class="playlist-mini-img">
      ${playlist.name}
    `;
    
    playlistsContainer.appendChild(li);
  });
}
        
        // Function to setup navigation
        function setupNavigation() {
          // Home
          document.getElementById('home-link').addEventListener('click', function() {
            showView('home-view');
          });
          
          // Search
          document.getElementById('search-link').addEventListener('click', function() {
            showView('search-view');
          });
          
          // Recently Played
          document.getElementById('recently-played-link').addEventListener('click', function() {
            showView('recently-played-view');
            loadRecentlyPlayed();
          });
          
          // Liked Songs
          document.getElementById('liked-songs-link').addEventListener('click', function() {
            showView('liked-songs-view');
            loadLikedSongs();
          });
          
          // Kimify Wrapped - now open as modal instead of view
          document.getElementById('wrapped-link').addEventListener('click', function() {
            showWrappedModal();
          });
        }
        
        // Function to show the wrapped modal
        function showWrappedModal() {
          document.getElementById('wrapped-modal').style.display = 'flex';
          // Animate the statistics
          setTimeout(animateWrappedStats, 300);
        }

        // Function to close the wrapped modal
        function closeWrappedModal() {
          document.getElementById('wrapped-modal').style.display = 'none';
        }
        
        // Function to show a specific view
        function showView(viewId) {
          // Hide all views
          document.querySelectorAll('#main-content > div').forEach(view => {
            view.style.display = 'none';
          });
          
          // Show the selected view
          document.getElementById(viewId).style.display = 'block';
        }
        // Function to initialize search functionality
        function initSearch() {
          const searchInput = document.getElementById('search-input');
          const clearSearch = document.getElementById('clear-search');
          const searchResults = document.getElementById('search-results');
          const searchMessage = document.getElementById('search-message');
          
          // Handle input event
          searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            if (query.length > 0) {
              clearSearch.style.display = 'block';
              searchMessage.style.display = 'none';
              
              // Filter songs based on query
              const filteredSongs = songs.filter(song => 
                song.title.toLowerCase().includes(query) || 
                song.artist.toLowerCase().includes(query)
              );
              
              // Display results
              if (filteredSongs.length > 0) {
                displaySearchResults(filteredSongs);
              } else {
                searchResults.innerHTML = `
                  <div class="search-message">
                    <p>No results found for "${query}"</p>
                  </div>
                `;
              }
            } else {
              clearSearch.style.display = 'none';
              searchResults.innerHTML = '';
              searchMessage.style.display = 'block';
            }
          });
          
          // Clear search button
          clearSearch.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            clearSearch.style.display = 'none';
            searchResults.innerHTML = '';
            searchMessage.style.display = 'block';
          });
        }
        
        // Function to display search results
        function displaySearchResults(results) {
          const searchResults = document.getElementById('search-results');
          
          searchResults.innerHTML = `
            <h2 class="section-title">Results</h2>
            <table class="playlist-songs">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                ${results.map((song, index) => `
                  <tr data-song-id="${song.id}" onclick="playSong('${song.id}')"
                    <td class="song-number">${index + 1}</td>
                    <td>
                      <div class="song-cell">
                        <div class="song-cell-img">
                          <img src="${song.imageFile}" alt="${song.title}">
                        </div>
                        <div class="song-cell-info">
                          <div class="song-cell-title">${song.title}</div>
                          <div class="song-cell-artist">${song.artist}</div>
                        </div>
                      </div>
                    </td>
                    <td>3:45</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `;
        }
        // Function to load a specific playlist view
async function loadPlaylistView(playlistId) {
  // Only handle default playlists now
  const defaultPlaylist = defaultPlaylists.find(p => p.id === playlistId);
  
  if (defaultPlaylist) {
    const playlistSongs = defaultPlaylist.songs.map(songId => 
      songs.find(s => s.id === songId)
    ).filter(Boolean);
    
    displayPlaylist(defaultPlaylist, playlistSongs);
  }
}
        
        // Helper function to display a playlist
        function displayPlaylist(playlist, playlistSongs) {
          const playlistView = document.getElementById('playlist-view');
          
          const imageUrl = playlist.is_user_created 
            ? playlist.image_url 
            : `images/${playlist.image}`;
          
          playlistView.innerHTML = `
            <div class="playlist-header">
              <div class="playlist-cover">
                <img src="${imageUrl}" alt="${playlist.name}">
              </div>
              <div class="playlist-info">
                <div class="playlist-type">Playlist</div>
                <h1 class="playlist-title">${playlist.name}</h1>
                <div class="playlist-description">${playlist.description}</div>
                <div class="playlist-meta">
                  ${playlistSongs.length} songs
                  ${playlist.is_user_created ? '• Created by a user' : ''}
                </div>
              </div>
            </div>
            
            <table class="playlist-songs">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                ${playlistSongs.map((song, index) => `
                  <tr data-song-id="${song.id}" onclick="playSong('${song.id}')"
                    <td class="song-number">${index + 1}</td>
                    <td>
                      <div class="song-cell">
                        <div class="song-cell-img">
                          <img src="${song.imageFile}" alt="${song.title}">
                        </div>
                        <div class="song-cell-info">
                          <div class="song-cell-title">${song.title}</div>
                          <div class="song-cell-artist">${song.artist}</div>
                        </div>
                      </div>
                    </td>
                    <td>3:45</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `;
          
          // Show the playlist view
          showView('playlist-view');
        }
        
        // Function to play a song
        function playSong(songId) {
          // Find the song
          const song = songs.find(s => s.id === songId);
          
          if (!song) return;
          
          currentSong = song;
          
          // Update the current song display
          document.getElementById('current-song-title').textContent = song.title;
          document.getElementById('current-song-artist').textContent = song.artist;
          
          // Set the image in the player
          const currentSongImg = document.createElement('img');
          currentSongImg.src = `${song.imageFile}`;
          currentSongImg.alt = song.title;
          currentSongImg.className = 'now-playing-img';
          
          const imgContainer = document.getElementById('current-song-img-container');
          imgContainer.innerHTML = '';
          imgContainer.appendChild(currentSongImg);
          
   // Set the audio source - handle both local files and full URLs
if (song.audioFile.startsWith('http://') || song.audioFile.startsWith('https://')) {
  audioPlayer.src = song.audioFile;
} else {
  audioPlayer.src = `audio/${song.audioFile}`;
}
          
          // Play the song
          audioPlayer.load();
          audioPlayer.play().catch(e => {
            console.log("Audio playback failed. This is normal if no audio file exists yet.", e);
          });
          
          isPlaying = true;
          updatePlayButton();
          
          // Update like button state
          updateLikeButton();
          
          // Add to recently played
          addToRecentlyPlayed(songId);
        }
        // Function to toggle play/pause
        function togglePlay() {
          if (!currentSong) return;
          
          if (isPlaying) {
            audioPlayer.pause();
          } else {
            audioPlayer.play().catch(e => {
              console.log("Audio playback failed.", e);
            });
          }
          
          isPlaying = !isPlaying;
          updatePlayButton();
        }
        
        // Update the play/pause button icon
        function updatePlayButton() {
          const playIcon = document.getElementById('play-icon');
          playIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        }
        
        // Format time in minutes:seconds
        function formatTime(seconds) {
          const minutes = Math.floor(seconds / 60);
          seconds = Math.floor(seconds % 60);
          return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        // Update progress bar and time displays based on actual audio playback
        audioPlayer.addEventListener('timeupdate', function() {
          if (audioPlayer.duration && !isDraggingProgress) {
            const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            const progressBar = document.getElementById('song-progress');
            const progressHandle = document.getElementById('progress-handle');
            
            progressBar.style.width = `${percent}%`;
            progressHandle.style.right = `${100 - percent}%`;
            
            // Update time displays
            document.getElementById('current-time').textContent = formatTime(audioPlayer.currentTime);
            document.getElementById('song-duration').textContent = formatTime(audioPlayer.duration);
          }
        });
        
        // When metadata is loaded, update the duration display
        audioPlayer.addEventListener('loadedmetadata', function() {
          document.getElementById('song-duration').textContent = formatTime(audioPlayer.duration);
        });
        
        // Timeline seeking with dragging
        const playerTimeline = document.querySelector('.player-timeline');
        const progressHandle = document.getElementById('progress-handle');
        
        playerTimeline.addEventListener('mousedown', function(e) {
          if (!currentSong) return;
          
          const timeline = this;
          const rect = timeline.getBoundingClientRect();
          const percent = (e.clientX - rect.left) / rect.width;
          
          if (e.target === progressHandle) {
            // Start dragging the handle
            isDraggingProgress = true;
            document.addEventListener('mousemove', handleProgressDrag);
            document.addEventListener('mouseup', stopProgressDrag);
          } else {
            // Just a click, seek immediately
            seekToPercent(percent);
          }
        });
        
        function handleProgressDrag(e) {
          const timeline = document.querySelector('.player-timeline');
          const rect = timeline.getBoundingClientRect();
          let percent = (e.clientX - rect.left) / rect.width;
          
          // Clamp between 0 and 1
          percent = Math.max(0, Math.min(1, percent));
          
          // Update visuals but don't seek yet
          document.getElementById('song-progress').style.width = `${percent * 100}%`;
          progressHandle.style.right = `${100 - (percent * 100)}%`;
          document.getElementById('current-time').textContent = formatTime(percent * audioPlayer.duration);
        }
        
        function stopProgressDrag(e) {
          isDraggingProgress = false;
          document.removeEventListener('mousemove', handleProgressDrag);
          document.removeEventListener('mouseup', stopProgressDrag);
          
          // Now seek to the final position
          const timeline = document.querySelector('.player-timeline');
          const rect = timeline.getBoundingClientRect();
          let percent = (e.clientX - rect.left) / rect.width;
          percent = Math.max(0, Math.min(1, percent));
          
          seekToPercent(percent);
        }
        
        function seekToPercent(percent) {
          if (!audioPlayer.duration) return;
          
          audioPlayer.currentTime = percent * audioPlayer.duration;
          
          // Update displays
          document.getElementById('song-progress').style.width = `${percent * 100}%`;
          progressHandle.style.right = `${100 - (percent * 100)}%`;
          document.getElementById('current-time').textContent = formatTime(audioPlayer.currentTime);
        }
        // Volume control with dragging
        const volumeBar = document.querySelector('.volume-bar');
        const volumeHandle = document.querySelector('.volume-handle');
        const volumeProgress = document.querySelector('.volume-progress');
        
        volumeBar.addEventListener('mousedown', function(e) {
          const volumeBarRect = volumeBar.getBoundingClientRect();
          let percent = (e.clientX - volumeBarRect.left) / volumeBarRect.width;
          percent = Math.max(0, Math.min(1, percent));
          
          if (e.target === volumeHandle) {
            // Start dragging
            isDraggingVolume = true;
            document.addEventListener('mousemove', handleVolumeDrag);
            document.addEventListener('mouseup', stopVolumeDrag);
          } else {
            // Just a click
            setVolumePercent(percent);
          }
        });
        
        function handleVolumeDrag(e) {
          const volumeBarRect = volumeBar.getBoundingClientRect();
          let percent = (e.clientX - volumeBarRect.left) / volumeBarRect.width;
          percent = Math.max(0, Math.min(1, percent));
          
          setVolumePercent(percent);
        }
        
        function stopVolumeDrag() {
          isDraggingVolume = false;
          document.removeEventListener('mousemove', handleVolumeDrag);
          document.removeEventListener('mouseup', stopVolumeDrag);
        }
        
        function setVolumePercent(percent) {
          audioPlayer.volume = percent;
          volumeProgress.style.width = `${percent * 100}%`;
          volumeHandle.style.right = `${100 - (percent * 100)}%`;
          
          // Update volume icon
          const volumeIcon = document.getElementById('volume-icon');
          if (percent === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
          } else if (percent < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
          } else {
            volumeIcon.className = 'fas fa-volume-up';
          }
        }
        
        // Toggle mute on volume icon click
        document.getElementById('volume-icon').addEventListener('click', function() {
          if (audioPlayer.volume > 0) {
            // Store the current volume for unmuting
            audioPlayer.dataset.prevVolume = audioPlayer.volume;
            setVolumePercent(0);
          } else {
            // Restore previous volume or set to 70% if not stored
            const prevVolume = parseFloat(audioPlayer.dataset.prevVolume) || 0.7;
            setVolumePercent(prevVolume);
          }
        });
        
        // Handle song end
        audioPlayer.addEventListener('ended', function() {
          isPlaying = false;
          updatePlayButton();
        });
        
        // Forward and backward buttons
        document.querySelector('.fa-step-forward').addEventListener('click', function() {
          if (!currentSong || !audioPlayer.duration) return;
          audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10);
        });
        
        document.querySelector('.fa-step-backward').addEventListener('click', function() {
          if (!currentSong) return;
          audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10);
        });
        // Function to show North Korean error dialog
        function showErrorDialog() {
          const overlay = document.createElement('div');
          overlay.className = 'error-overlay';
          
          const dialog = document.createElement('div');
          dialog.className = 'error-dialog';
          
          // Title bar
          const titleBar = document.createElement('div');
          titleBar.className = 'error-title-bar';
titleBar.innerHTML = '<span>PRC System Error</span><span class="close-btn">×</span>';
          
          // Content
          const content = document.createElement('div');
          content.className = 'error-content';
          
          // Flag image
          const flagImg = document.createElement('img');
flagImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/800px-Flag_of_the_People%27s_Republic_of_China.svg.png';
flagImg.alt = 'China Flag';
          
          // Error message
          const message = document.createElement('div');
          message.className = 'error-message';
          message.innerHTML = `
            <b>CRITICAL ERROR #9458</b><br><br>
            You have attempted to access forbidden Western cultural material.<br><br>
            This violation of the People's Republic of China's laws has been recorded.<br><br>
            Your IP address and location have been forwarded to authorities.<br><br>
            <b>Penalty:</b> Re-education through labor (3-5 years on Solana blockchain)
          `;
          
          content.appendChild(flagImg);
          content.appendChild(message);
          
          // Buttons
          const buttons = document.createElement('div');
          buttons.className = 'error-buttons';
          
          const okButton = document.createElement('button');
          okButton.className = 'error-button';
          okButton.textContent = 'Accept Punishment';
          
          buttons.appendChild(okButton);
          
          // Assemble dialog
          dialog.appendChild(titleBar);
          dialog.appendChild(content);
          dialog.appendChild(buttons);
          
          overlay.appendChild(dialog);
          document.body.appendChild(overlay);
          
          // Event listeners
          titleBar.querySelector('.close-btn').addEventListener('click', function() {
            document.body.removeChild(overlay);
          });
          
          okButton.addEventListener('click', function() {
            document.body.removeChild(overlay);
          });
        }

        // Liked songs functionality
        function getLikedSongs() {
          const likedSongs = localStorage.getItem(LIKED_SONGS_KEY);
          return likedSongs ? JSON.parse(likedSongs) : [];
        }
        
        function saveLikedSongs(likedSongs) {
          localStorage.setItem(LIKED_SONGS_KEY, JSON.stringify(likedSongs));
        }
        
        function isSongLiked(songId) {
          const likedSongs = getLikedSongs();
          return likedSongs.includes(songId);
        }
        
        function toggleLikeSong() {
          if (!currentSong) return;
          
          const songId = currentSong.id;
          const likedSongs = getLikedSongs();
          
          if (isSongLiked(songId)) {
            // Unlike the song
            const index = likedSongs.indexOf(songId);
            if (index !== -1) {
              likedSongs.splice(index, 1);
            }
          } else {
            // Like the song
            likedSongs.push(songId);
          }
          
          saveLikedSongs(likedSongs);
          updateLikeButton();
          
          // If we're in the liked songs view, refresh it
          if (document.getElementById('liked-songs-view').style.display !== 'none') {
            loadLikedSongs();
          }
        }
        
        function updateLikeButton() {
          if (!currentSong) return;
          
          const likeBtn = document.getElementById('current-song-like');
          
          if (isSongLiked(currentSong.id)) {
            likeBtn.classList.add('active');
          } else {
            likeBtn.classList.remove('active');
          }
        }
        
        function loadLikedSongs() {
          const likedSongsContainer = document.getElementById('liked-songs-container');
          const emptyMessage = document.getElementById('liked-songs-empty');
          
          const likedSongIds = getLikedSongs();
          
          if (likedSongIds.length === 0) {
            likedSongsContainer.innerHTML = '';
            emptyMessage.style.display = 'block';
            return;
          }
          
          // Get the song objects
          const likedSongs = likedSongIds.map(id => songs.find(s => s.id === id)).filter(Boolean);
          
          emptyMessage.style.display = 'none';
          
          likedSongsContainer.innerHTML = `
            <table class="playlist-songs">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                ${likedSongs.map((song, index) => `
                  <tr data-song-id="${song.id}" ${song.id === 'song8' ? 'onclick="showErrorDialog()"' : `onclick="playSong('${song.id}')"`}>
                    <td class="song-number">${index + 1}</td>
                    <td>
                      <div class="song-cell">
                        <div class="song-cell-img">
                          <img src="${song.imageFile}" alt="${song.title}">
                        </div>
                        <div class="song-cell-info">
                          <div class="song-cell-title">${song.title}</div>
                          <div class="song-cell-artist">${song.artist}</div>
                        </div>
                      </div>
                    </td>
                    <td>3:45</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `;
        }
        
        // Recently played functionality
        function getRecentlyPlayed() {
          const recentlyPlayed = localStorage.getItem(RECENTLY_PLAYED_KEY);
          return recentlyPlayed ? JSON.parse(recentlyPlayed) : [];
        }
        
        function saveRecentlyPlayed(recentlyPlayed) {
          localStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(recentlyPlayed));
        }
        
        function addToRecentlyPlayed(songId) {
          const recentlyPlayed = getRecentlyPlayed();
          
          // Remove if already in the list
          const index = recentlyPlayed.indexOf(songId);
          if (index !== -1) {
            recentlyPlayed.splice(index, 1);
          }
          
          // Add to the beginning
          recentlyPlayed.unshift(songId);
          
          // Keep only the last 20 songs
          if (recentlyPlayed.length > 20) {
            recentlyPlayed.pop();
          }
          
          saveRecentlyPlayed(recentlyPlayed);
        }
        
        function loadRecentlyPlayed() {
          const recentlyPlayedContainer = document.getElementById('recently-played-container');
          const emptyMessage = document.getElementById('recently-played-empty');
          
          const recentlyPlayedIds = getRecentlyPlayed();
          
          if (recentlyPlayedIds.length === 0) {
            recentlyPlayedContainer.innerHTML = '';
            emptyMessage.style.display = 'block';
            return;
          }
          
          // Get the song objects
          const recentSongs = recentlyPlayedIds.map(id => songs.find(s => s.id === id)).filter(Boolean);
          
          emptyMessage.style.display = 'none';
          
          recentlyPlayedContainer.innerHTML = `
            <table class="playlist-songs">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                ${recentSongs.map((song, index) => `
                  <tr data-song-id="${song.id}" ${song.id === 'song8' ? 'onclick="showErrorDialog()"' : `onclick="playSong('${song.id}')"`}>
                    <td class="song-number">${index + 1}</td>
                    <td>
                      <div class="song-cell">
                        <div class="song-cell-img">
                          <img src="${song.imageFile}" alt="${song.title}">
                        </div>
                        <div class="song-cell-info">
                          <div class="song-cell-title">${song.title}</div>
                          <div class="song-cell-artist">${song.artist}</div>
                        </div>
                      </div>
                    </td>
                    <td>3:45</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          `;
        }
        // Function to show the add playlist modal
        function showAddPlaylistModal() {
          const overlay = document.createElement('div');
          overlay.className = 'modal-overlay';
          
          const content = document.createElement('div');
          content.className = 'modal-content';
          
          // Create song images for selection instead of checkboxes
          const songSelectionGrid = songs
            .filter(song => song.id !== 'song8') // Filter out BTS song
            .map(song => `
              <div class="song-selection-tile" data-song-id="${song.id}">
                <img src="${song.imageFile}" alt="${song.title}" class="song-selection-img">
                <div class="song-selection-title">${song.title}</div>
                <div class="song-selection-overlay"></div>
              </div>
            `).join('');
          
          content.innerHTML = `
            <div class="modal-header">
              <h2>Create Playlist</h2>
            </div>
            
            <div class="modal-form">
              <div class="modal-form-group">
                <label for="playlist-name">Playlist Name</label>
                <input type="text" id="playlist-name" placeholder="My Kim Playlist">
              </div>
              
              <div class="modal-form-group">
                <label for="playlist-description">Description</label>
                <textarea id="playlist-description" placeholder="Add an optional description"></textarea>
              </div>
              
              <div class="modal-form-group">
                <label>Cover Image</label>
                <input type="file" id="cover-upload" accept="image/*">
                <div class="image-preview" id="cover-preview">
                  <span>No image selected</span>
                </div>
              </div>
              
              <div class="modal-form-group">
                <label>Select Songs (At least one)</label>
                <div class="song-selection-grid">
                  ${songSelectionGrid}
                </div>
              </div>
            </div>
            
            <div class="modal-footer">
              <button class="modal-btn modal-btn-cancel" id="cancel-playlist">Cancel</button>
              <button class="modal-btn modal-btn-primary" id="create-playlist">Create</button>
            </div>
          `;

          // Add styles for the song selection grid
          const styleElement = document.createElement('style');
          styleElement.textContent = `
            .song-selection-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 12px;
              max-height: 300px;
              overflow-y: auto;
              padding: 10px;
              background-color: #333;
              border-radius: 4px;
            }
            
            .song-selection-tile {
              position: relative;
              cursor: pointer;
              border-radius: 6px;
              overflow: hidden;
              transition: transform 0.2s;
              aspect-ratio: 1;
            }
            
            .song-selection-tile:hover {
              transform: scale(1.05);
            }
            
            .song-selection-tile img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            
            .song-selection-title {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              background: rgba(0, 0, 0, 0.7);
              color: white;
              padding: 5px;
              font-size: 12px;
              text-align: center;
            }
            
            .song-selection-overlay {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(29, 185, 84, 0.6);
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0;
              transition: opacity 0.2s;
            }
            
            .song-selection-overlay::after {
              content: '✓';
              font-size: 32px;
              color: white;
              font-weight: bold;
            }
            
            .song-selection-tile.selected .song-selection-overlay {
              opacity: 1;
            }
          `;
          document.head.appendChild(styleElement);
          
          overlay.appendChild(content);
          document.body.appendChild(overlay);
          
          // Setup song selection by clicking on images
          const songTiles = content.querySelectorAll('.song-selection-tile');
          songTiles.forEach(tile => {
            tile.addEventListener('click', function() {
              this.classList.toggle('selected');
            });
          });
          
          // Setup image uploader and preview
          const fileInput = content.querySelector('#cover-upload');
          const imagePreview = content.querySelector('#cover-preview');
          let uploadedImage = null;
          
          fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
              uploadedImage = file;
              
              // Preview the image
              const reader = new FileReader();
              reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded cover">`;
              };
              reader.readAsDataURL(file);
            }
          });
          
          // Cancel button
          content.querySelector('#cancel-playlist').addEventListener('click', function() {
            document.body.removeChild(overlay);
          });
          
          // Create button
          content.querySelector('#create-playlist').addEventListener('click', async function() {
            const name = content.querySelector('#playlist-name').value.trim();
            const description = content.querySelector('#playlist-description').value.trim();
            
            // Validation
            if (!name) {
              alert('Please enter a playlist name');
              return;
            }
            
            if (!uploadedImage) {
              alert('Please upload a cover image');
              return;
            }
            
            // Get selected songs
            const selectedSongs = Array.from(content.querySelectorAll('.song-selection-tile.selected'))
              .map(tile => tile.dataset.songId);
            
            if (selectedSongs.length === 0) {
              alert('Please select at least one song');
              return;
            }
            
            // Show loading state
            const createBtn = content.querySelector('#create-playlist');
            const originalBtnText = createBtn.textContent;
            createBtn.textContent = 'Creating...';
            createBtn.disabled = true;
            
            try {
              // 1. Upload the image to Supabase Storage
              const filename = `playlist-cover-${Date.now()}-${uploadedImage.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
              
              const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('playlist-covers')
                .upload(filename, uploadedImage);
              
              if (uploadError) throw uploadError;
              
              // 2. Get the public URL for the uploaded image
              const { data: { publicUrl } } = supabase
                .storage
                .from('playlist-covers')
                .getPublicUrl(filename);
              
              // 3. Create a new playlist record
              const playlistData = {
                name: name,
                description: description || 'No description',
                image_url: publicUrl,
                songs: selectedSongs,
                is_user_created: true,
                created_at: new Date().toISOString()
              };
              
              const { data: playlist, error: insertError } = await supabase
                .from('playlists')
                .insert(playlistData)
                .select()
                .single();
              
              if (insertError) throw insertError;
              
              // 4. Reload playlists
              await loadPlaylists();
              
              // 5. Close the modal
              document.body.removeChild(overlay);
              
              // 6. Show the new playlist
              loadPlaylistView(playlist.id);
              
            } catch (error) {
              console.error('Error creating playlist:', error);
              alert('An error occurred while creating the playlist. Please try again.');
              
              // Reset button state
              createBtn.textContent = originalBtnText;
              createBtn.disabled = false;
            }
          });
        }

        // Function to animate the stats when viewing the wrapped
        function animateWrappedStats() {
          const statNumbers = document.querySelectorAll('.stat-number');
          
          statNumbers.forEach(statElement => {
            const targetValue = parseInt(statElement.textContent);
            
            // Reset to zero
            statElement.textContent = '0';
            
            // Animate to target value
            let currentValue = 0;
            const duration = 2000; // 2 seconds
            const interval = 16; // ~60fps
            const steps = duration / interval;
            const increment = targetValue / steps;
            
            const counter = setInterval(() => {
              currentValue += increment;
              
              if (currentValue >= targetValue) {
                statElement.textContent = targetValue;
                clearInterval(counter);
              } else {
                statElement.textContent = Math.floor(currentValue);
              }
            }, interval);
          });
        }

        function addMemeNavLink() {
    // Check if the link already exists first
    if (document.getElementById('meme-link')) {
        return; // Stop here if the link already exists
    }
  
    const nav = document.querySelector('nav');
    const mapLink = document.getElementById('map-link');
    
    // Create meme generator link element
    const memeLink = document.createElement('a');
    memeLink.href = "#";
    memeLink.className = "nav-link";
    memeLink.id = "meme-link";
    memeLink.innerHTML = `
      <span class="icon"><i class="fas fa-image"></i></span>
      <span>Meme Generator</span>
    `;
    
    // Check if map link exists, and insert after it or after wrapped link
    if (mapLink) {
      nav.insertBefore(memeLink, mapLink.nextSibling);
    } else {
      const wrappedLink = document.getElementById('wrapped-link');
      nav.insertBefore(memeLink, wrappedLink.nextSibling);
    }
    
    // Add event listener for meme link
    memeLink.addEventListener('click', function() {
      showMemeModal();
    });
}

// Function to show the meme generator modal
function showMemeModal() {
  document.getElementById('meme-modal').style.display = 'flex';
  initMemeGenerator();
}

// Function to close the meme generator modal
function closeMemeModal() {
  document.getElementById('meme-modal').style.display = 'none';
}

// Meme generator initialization
function initMemeGenerator() {
  // Select elements
  const templateItems = document.querySelectorAll('.template-item');
  const topTextInput = document.getElementById('top-text');
  const bottomTextInput = document.getElementById('bottom-text');
  const colorButtons = document.querySelectorAll('.color-btn');
  const strokeButtons = document.querySelectorAll('.stroke-btn');
  const bgButtons = document.querySelectorAll('.bg-btn');
  const generateBtn = document.getElementById('generate-meme');
  const downloadBtn = document.getElementById('download-meme');
  const shareBtn = document.getElementById('share-meme');
  const memeCanvas = document.getElementById('meme-canvas');
  const previewMessage = document.querySelector('.preview-message');
  
  // Skip if already initialized
  if (window.memeGeneratorInitialized) return;
  window.memeGeneratorInitialized = true;
  
  let selectedTemplate = null;
  let selectedColor = '#ffffff';
  let selectedStroke = 'thin';
  let selectedBg = 'none';
  
  // Set default selections
  colorButtons[0].classList.add('selected');
  strokeButtons[1].classList.add('selected');
  bgButtons[0].classList.add('selected');
  
  // Template selection
  templateItems.forEach(item => {
    item.addEventListener('click', function() {
      templateItems.forEach(t => t.classList.remove('selected'));
      this.classList.add('selected');
      selectedTemplate = this.getAttribute('data-template');
    });
  });
  
  // Color selection
  colorButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      colorButtons.forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      selectedColor = this.getAttribute('data-color');
    });
  });
  
  // Stroke selection
  strokeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      strokeButtons.forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      selectedStroke = this.getAttribute('data-stroke');
    });
  });
  
  // Background selection
  bgButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      bgButtons.forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      selectedBg = this.getAttribute('data-bg');
    });
  });
  
  // Generate meme button
  generateBtn.addEventListener('click', function() {
    if (!selectedTemplate) {
      alert('Please select a template image first.');
      return;
    }
    
    generateMeme();
  });
  
  // Download button
  downloadBtn.addEventListener('click', function() {
    downloadMeme();
  });
  
  // Share button
  shareBtn.addEventListener('click', function() {
    // Show error dialog when sharing
    showErrorDialog();
  });
  
  // Function to generate the meme
  function generateMeme() {
    const ctx = memeCanvas.getContext('2d');
    ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
    
    // Load the template image
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function() {
      // Set background based on selection
      if (selectedBg === 'none') {
        ctx.drawImage(img, 0, 0, memeCanvas.width, memeCanvas.height);
      } else if (selectedBg === 'red') {
        ctx.fillStyle = '#c00000';
        ctx.fillRect(0, 0, memeCanvas.width, memeCanvas.height);
        ctx.drawImage(img, 40, 40, memeCanvas.width - 80, memeCanvas.height - 80);
      } else if (selectedBg === 'stars') {
        // Draw stars background
        ctx.fillStyle = '#00205b';
        ctx.fillRect(0, 0, memeCanvas.width, memeCanvas.height);
        
        // Draw stars
        ctx.fillStyle = 'white';
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * memeCanvas.width;
          const y = Math.random() * memeCanvas.height;
          const size = Math.random() * 3 + 1;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.drawImage(img, 40, 40, memeCanvas.width - 80, memeCanvas.height - 80);
      }
      
      // Set font style
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      // Determine font size based on text length
      const topText = topTextInput.value.toUpperCase() || 'ADD TOP TEXT';
      const bottomText = bottomTextInput.value.toUpperCase() || 'ADD BOTTOM TEXT';
      
      const fontSize = Math.min(50, 400 / Math.max(topText.length, bottomText.length) * 5);
      ctx.font = `bold ${fontSize}px Impact, Arial, sans-serif`;
      
      // Set text color
      ctx.fillStyle = selectedColor;
      
      // Add text stroke based on selection
      if (selectedStroke !== 'none') {
        ctx.lineWidth = selectedStroke === 'thin' ? 2 : 4;
        ctx.strokeStyle = 'black';
      }
      
      // Draw top text
      if (selectedStroke !== 'none') {
        ctx.strokeText(topText, memeCanvas.width / 2, 15, memeCanvas.width - 15);
      }
      ctx.fillText(topText, memeCanvas.width / 2, 15, memeCanvas.width - 15);
      
      // Draw bottom text
      if (selectedStroke !== 'none') {
        ctx.strokeText(bottomText, memeCanvas.width / 2, memeCanvas.height - fontSize - 15, memeCanvas.width - 15);
      }
      ctx.fillText(bottomText, memeCanvas.width / 2, memeCanvas.height - fontSize - 15, memeCanvas.width - 15);
      
      // Show canvas and hide message
      memeCanvas.style.display = 'block';
      previewMessage.style.display = 'none';
      
      // Enable download and share buttons
      downloadBtn.disabled = false;
      shareBtn.disabled = false;
      
      // Add to recent memes
      addToRecentMemes();
    };
    
    // Set image source based on template selection
    // In a real implementation, you would have different image URLs for each template
    img.src = document.querySelector(`.template-item[data-template="${selectedTemplate}"] img`).src;
  }
  
  // Function to download the meme
  function downloadMeme() {
    const link = document.createElement('a');
    link.download = 'kimify-meme.png';
    link.href = memeCanvas.toDataURL('image/png');
    link.click();
  }
  
  // Function to add meme to recent memes section
  function addToRecentMemes() {
    const recentMemesContainer = document.getElementById('recent-memes-container');
    const emptyMessage = recentMemesContainer.querySelector('.empty-memes-message');
    
    // Remove empty message if it exists
    if (emptyMessage) {
      emptyMessage.remove();
    }
    
    // Create meme item
    const memeItem = document.createElement('div');
    memeItem.className = 'recent-meme-item';
    
    // Create image element
    const img = document.createElement('img');
    img.src = memeCanvas.toDataURL('image/png');
    memeItem.appendChild(img);
    
    // Add click event to show the meme in the canvas
    memeItem.addEventListener('click', function() {
      const tempImg = new Image();
      tempImg.src = img.src;
      tempImg.onload = function() {
        const ctx = memeCanvas.getContext('2d');
        ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height);
        ctx.drawImage(tempImg, 0, 0, memeCanvas.width, memeCanvas.height);
        
        memeCanvas.style.display = 'block';
        previewMessage.style.display = 'none';
        
        downloadBtn.disabled = false;
        shareBtn.disabled = false;
      };
    });
    
    // Add to container (at the beginning)
    if (recentMemesContainer.firstChild) {
      recentMemesContainer.insertBefore(memeItem, recentMemesContainer.firstChild);
    } else {
      recentMemesContainer.appendChild(memeItem);
    }
    
    // Limit to 8 recent memes
    const items = recentMemesContainer.querySelectorAll('.recent-meme-item');
    if (items.length > 8) {
      recentMemesContainer.removeChild(items[items.length - 1]);
    }
  }
}

function addMapNavLink() {
    // Check if the link already exists first
    if (document.getElementById('map-link')) {
        return; // Stop here if the link already exists
    }
    
    const nav = document.querySelector('nav');
    const wrappedLink = document.getElementById('wrapped-link');
    
    // Create map link element
    const mapLink = document.createElement('a');
    mapLink.href = "#";
    mapLink.className = "nav-link";
    mapLink.id = "map-link";
    mapLink.innerHTML = `
      <span class="icon"><i class="fas fa-map-marked-alt"></i></span>
      <span>Live Listeners</span>
    `;
    
    // Insert after wrapped link
    nav.insertBefore(mapLink, wrappedLink.nextSibling);
    
    // Add event listener
    mapLink.addEventListener('click', function() {
      showMapModal();
    });
}
  
  // Function to show the map modal
  function showMapModal() {
    document.getElementById('map-modal').style.display = 'flex';
    initializeMap();
  }
  
  // Function to close the map modal
  function closeMapModal() {
    document.getElementById('map-modal').style.display = 'none';
    stopMapUpdates();
  }
  
  // Map initialization and updates
  let updateInterval;
  let cityElements;
  
  function initializeMap() {
  // Clear previous interval if exists
  if (updateInterval) {
    clearInterval(updateInterval);
  }
  
  // Get all city markers
  cityElements = document.querySelectorAll('.city-marker');
  
  // Add event listeners to cities
  cityElements.forEach(city => {
    city.addEventListener('mouseenter', showTooltip);
    city.addEventListener('mouseleave', hideTooltip);
  });
  
  // Add pulse animation to random cities
  addRandomPulse();
  
  // Start updates for live listeners count
  updateListenerCount();
  
  // Add live updates to the feed
  startLiveUpdates();
}
  
function showTooltip(e) {
  const city = e.target;
  const tooltip = document.getElementById('map-tooltip');
  
  // Get city data
  const cityName = city.getAttribute('data-city');
  const listeners = city.getAttribute('data-listeners');
  
  // Update tooltip content
  tooltip.querySelector('.tooltip-city').textContent = cityName;
  tooltip.querySelector('.tooltip-listeners').textContent = `${listeners} listeners`;
  
  // Get position
  const rect = city.getBoundingClientRect();
  const mapContainer = document.getElementById('north-korea-map-container');
  const mapRect = mapContainer.getBoundingClientRect();
  
  // Position tooltip above the city
  tooltip.style.left = `${rect.left - mapRect.left + rect.width / 2}px`;
  tooltip.style.top = `${rect.top - mapRect.top - tooltip.offsetHeight - 10}px`;
  
  // Show tooltip
  tooltip.style.display = 'block';
}
  
  function hideTooltip() {
    document.getElementById('map-tooltip').style.display = 'none';
  }
  
  function addRandomPulse() {
  // Remove existing pulse animations
  cityElements.forEach(city => {
    city.classList.remove('pulse');
  });
  
  // Add pulse to 1-3 random cities
  const numPulses = Math.floor(Math.random() * 3) + 1;
  const cities = Array.from(cityElements);
  
  for (let i = 0; i < numPulses; i++) {
    if (cities.length > 0) {
      const randomIndex = Math.floor(Math.random() * cities.length);
      cities[randomIndex].classList.add('pulse');
      cities.splice(randomIndex, 1);
    }
  }
}
  
  function updateListenerCount() {
    let totalListeners = 0;
    
    // Calculate total listeners
    cityElements.forEach(city => {
      totalListeners += parseInt(city.getAttribute('data-listeners'));
    });
    
    // Update display
    document.getElementById('online-listeners').textContent = totalListeners.toLocaleString();
    
    // Randomly adjust city listeners
    updateInterval = setInterval(() => {
      let changesMade = false;
      
      cityElements.forEach(city => {
        // 20% chance to update each city
        if (Math.random() < 0.2) {
          changesMade = true;
          let listeners = parseInt(city.getAttribute('data-listeners'));
          
          // Random change between -5 and +10
          const change = Math.floor(Math.random() * 16) - 5;
          listeners = Math.max(10, listeners + change);
          
          city.setAttribute('data-listeners', listeners);
          
          // Update tooltip if visible
          const tooltip = document.getElementById('map-tooltip');
          if (tooltip.style.display === 'block') {
            const cityName = tooltip.querySelector('.tooltip-city').textContent;
            if (cityName === city.getAttribute('data-city')) {
              tooltip.querySelector('.tooltip-listeners').textContent = `${listeners} listeners`;
            }
          }
        }
      });
      
      if (changesMade) {
        // Recalculate total
        let newTotal = 0;
        cityElements.forEach(city => {
          newTotal += parseInt(city.getAttribute('data-listeners'));
        });
        
        // Update display with animation
        animateNumber(document.getElementById('online-listeners'), newTotal);
        
        // Occasionally change pulse animation
        if (Math.random() < 0.3) {
          addRandomPulse();
        }
      }
    }, 5000);
  }
  
  function animateNumber(element, newValue) {
    const oldValue = parseInt(element.textContent.replace(/,/g, ''));
    const difference = newValue - oldValue;
    const steps = 20;
    const increment = difference / steps;
    let currentStep = 0;
    
    const updateFn = () => {
      currentStep++;
      const currentValue = Math.round(oldValue + increment * currentStep);
      element.textContent = currentValue.toLocaleString();
      
      if (currentStep < steps) {
        requestAnimationFrame(updateFn);
      }
    };
    
    requestAnimationFrame(updateFn);
  }
  
  function startLiveUpdates() {
    const updates = document.getElementById('live-updates');
    const songs = [
      "Death to America (Dance Remix)",
      "Miss You Ye (Rocket Man)",
      "My Nuclear Button Is Bigger",
      "Internet? Never Heard of It",
      "Broccoli",
      "Sad Kimmy",
      "gym flow",
      "firework",
      "Hasnt started yet",
      "rapstuff"
    ];
    
    const actions = [
      "is listening to",
      "added to playlist",
      "liked",
      "shared with the State Security Department",
      "downloaded for offline listening in bunker",
      "played 10 times today"
    ];
    
    // Add new updates occasionally
    setInterval(() => {
      // Get random city
      const randomCityIndex = Math.floor(Math.random() * cityElements.length);
      const randomCity = cityElements[randomCityIndex].getAttribute('data-city');
      
      // Get random song and action
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      // Create new update item
      const newUpdate = document.createElement('div');
      newUpdate.className = 'update-item';
      
      // Decide between user action or group action
      if (Math.random() < 0.7) {
        newUpdate.textContent = `User in ${randomCity} ${randomAction} "${randomSong}"`;
      } else {
        const userCount = Math.floor(Math.random() * 10) + 2;
        newUpdate.textContent = `${userCount} users in ${randomCity} ${
          ["joined in the last hour", "are currently active", "reported for unauthorized dancing"][Math.floor(Math.random() * 3)]
        }`;
      }
      
      // Add to feed
      updates.insertBefore(newUpdate, updates.firstChild);
      
      // Remove oldest if more than 20
      if (updates.children.length > 20) {
        updates.removeChild(updates.lastChild);
      }
    }, 3000);
  }
    </script>
