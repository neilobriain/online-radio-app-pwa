// Audio player
const playPauseButton = document.getElementById('playPauseBtn');
const audioStream = document.getElementById('audio-stream');
const playState = document.getElementById('play-state');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

// Form
const form = document.getElementById('contactForm');

// Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const pages = document.querySelectorAll('.page');

// Audio Player
// Add an event listener for play button clicks
playPauseButton.addEventListener('click', () => {
    if (audioStream.paused) {
        // Play the audio
        audioStream.load();
        audioStream.play();
        playState.innerText = "á sheinm";
        
        // Show pause icon, hide play icon
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        // Pause the audio
        audioStream.pause();
        playState.innerText = "múchta";
        
        // Show play icon, hide pause icon
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
});
// Sync UI with changes in media controls
audioStream.addEventListener('play', () => {
        playState.innerText = "á sheinm";
        // Show pause icon, hide play icon
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
});
audioStream.addEventListener('pause', () => {
        playState.innerText = "múchta";
        // Show play icon, hide pause icon
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
});

// Contact Form
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
        alert('Ní mór ainm agus teachtaireacht a líonadh.');
        return;
    }

    const emailMessage = `Ainm: ${name}\nUimhir: ${phone}\n\nTeachtaireacht: ${message}`;
    const subject = 'Teachtaireacht ón Aip';
    const mailto = `mailto:eolas@raidiofailte.com?cc=bainisteoir@raidiofailte.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailMessage)}`;

    window.location.href = mailto;
});

// Tabs
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetPage = button.getAttribute('data-page');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(targetPage).classList.add('active');
    });
});

// Media Session
if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Éist Beo',
        artist: 'Raidió Fáilte',
        artwork: [{
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
        }]
    });
}