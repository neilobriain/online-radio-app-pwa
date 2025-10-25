// Audio player
const playPauseButton = document.getElementById('playPauseBtn');
const audioStream = document.getElementById('audio-stream');
const playState = document.getElementById('play-state');

// Form
const form = document.getElementById('contactForm');

// Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const pages = document.querySelectorAll('.page');

// Add an event listener for play button clicks
playPauseButton.addEventListener('click', () => {

    // Check if the audio is currently paused
    if (audioStream.paused) {
        // If it's paused, reload the stream to get the latest content
        audioStream.load();
        // Then, play the audio
        audioStream.play();
        playState.innerText = "á sheinm";
    } else {
        // If it's playing, pause the audio
        audioStream.pause();
        playState.innerText = "múchta"
    }

    // Toggle the 'paused' class on the button
    playPauseButton.classList.toggle('paused');
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
    src: './icons/icon-512x512.png',
    sizes: '512x512',
    type: 'image/png' }]
  });
}