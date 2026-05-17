const programmeNameText = document.getElementById("programmeName");
const miniPlayerText = document.getElementById("miniPlayerText");
const nowPlayingContainer = document.querySelector(".now-playing-text");

async function loadNowPlaying() {
    try {
        const res = await fetch("/.netlify/functions/now-playing");

        if (!res.ok) {
            programmeNameText.textContent = "";
            nowPlayingContainer.hidden = true;
            miniPlayerText.textContent = "Ag éisteacht beo";
        }

        const data = await res.json();

        if (data.programmeName) {
            programmeNameText.textContent = data.programmeName;
            miniPlayerText.textContent = "Beo: " + data.programmeName;
            nowPlayingContainer.hidden = false;
        } else {
            programmeNameText.textContent = "";
            nowPlayingContainer.hidden = true;
            miniPlayerText.textContent = "Ag éisteacht beo";
        }

    } catch (err) {
        programmeNameText.textContent = "";
        nowPlayingContainer.hidden = true;
        miniPlayerText.textContent = "Ag éisteacht beo";
    }
}

loadNowPlaying();

function scheduleHourlyUpdate() {
    const now = new Date();
    const nextHour = new Date(now);

    nextHour.setHours(now.getHours() + 1, 0, 10, 0); // 10 seconds after the hour

    const delay = nextHour - now;

    setTimeout(() => {
        loadNowPlaying();
        setInterval(loadNowPlaying, 60 * 60 * 1000);
    }, delay);
}

scheduleHourlyUpdate();
