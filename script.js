const WEDDING_AT = new Date("2026-10-25T08:00:00+07:00");

const cover = document.getElementById("cover");
const invitation = document.getElementById("invitation");
const openBtn = document.getElementById("openBtn");
const bgm = document.getElementById("bgm");
const record = document.getElementById("record");
const recordText = document.getElementById("recordText");
const musicToggle = document.getElementById("musicToggle");
const vinylPlay = document.getElementById("vinylPlay");

function setMusicUi(playing) {
  record?.classList.toggle("play", playing);
  musicToggle?.classList.toggle("is-playing", playing);
  musicToggle?.setAttribute("aria-pressed", playing ? "true" : "false");
  vinylPlay?.setAttribute("aria-pressed", playing ? "true" : "false");
  if (recordText) recordText.textContent = playing ? "Now Playing" : "Click to Play";
}

async function tryPlay() {
  if (!bgm) return false;
  bgm.volume = 0.6;
  try {
    await bgm.play();
    setMusicUi(true);
    return true;
  } catch {
    setMusicUi(false);
    return false;
  }
}

async function toggleMusic() {
  if (!bgm) return;
  if (bgm.paused) await tryPlay();
  else {
    bgm.pause();
    setMusicUi(false);
  }
}

function openInvitation() {
  cover.hidden = true;
  invitation.hidden = false;
  document.body.classList.add("opened");
  document.body.style.overflow = "auto";
  tryPlay();
}

function initGuestName() {
  const name = window.GuestUtils?.getGuestNameFromUrl?.();
  if (!name) return;

  const openGuest = document.getElementById("openGuest");
  const guestBlock = document.getElementById("guestBlock");
  const guestName = document.getElementById("guestName");
  const guestQr = document.getElementById("guestQr");
  const guestQrKey = document.getElementById("guestQrKey");
  const rsvpName = document.querySelector('#rsvpForm input[name="name"]');

  const uniqueKey = window.GuestUtils.makeUniqueKey(name);
  const payload = window.GuestUtils.encodePayload(uniqueKey, name);

  if (openGuest) {
    openGuest.textContent = `To: ${name}`;
    openGuest.hidden = false;
  }
  if (guestName && guestBlock) {
    guestName.textContent = name;
    guestBlock.hidden = false;
  }
  if (typeof QRCode !== "undefined" && guestQr) {
    guestQr.innerHTML = "";
    new QRCode(guestQr, {
      text: payload,
      width: 96,
      height: 96,
      colorDark: "#3b2224",
      colorLight: "#fbf6ee",
      correctLevel: QRCode.CorrectLevel.M,
    });
  }
  if (guestQrKey) guestQrKey.textContent = uniqueKey;
  if (rsvpName && !rsvpName.value) rsvpName.value = name;
  document.title = `${name} — Faiza & Galang`;
}

function tick() {
  const diff = Math.max(0, WEDDING_AT.getTime() - Date.now());
  const sec = Math.floor(diff / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  document.getElementById("d").textContent = pad(Math.floor(sec / 86400));
  document.getElementById("h").textContent = pad(Math.floor((sec % 86400) / 3600));
  document.getElementById("m").textContent = pad(Math.floor((sec % 3600) / 60));
  document.getElementById("s").textContent = pad(sec % 60);
}

openBtn?.addEventListener("click", openInvitation);
musicToggle?.addEventListener("click", toggleMusic);
vinylPlay?.addEventListener("click", toggleMusic);
bgm?.addEventListener("play", () => setMusicUi(true));
bgm?.addEventListener("pause", () => setMusicUi(false));

document.getElementById("rsvpForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  localStorage.setItem("faiza-galang-rsvp", JSON.stringify(data));
  const status = document.getElementById("rsvpStatus");
  status.hidden = false;
  status.textContent = "Thank you — your RSVP is saved on this device.";
});

initGuestName();
setMusicUi(false);
tick();
setInterval(tick, 1000);
