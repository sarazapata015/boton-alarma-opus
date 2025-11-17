// CONFIG PUSHER
Pusher.logToConsole = false;

const pusher = new Pusher("9d107dfd6c6872f19922", {
  cluster: "mt1",
});

const channel = pusher.subscribe("alarma-channel");

const alarmaAudio = document.getElementById("alarmaAudio");
const modal = document.getElementById("modal");
const stopBtn = document.getElementById("stopBtn");

let soyQuienPresiono = false;

// CUANDO SE RECIBE UNA ALERTA
channel.bind("alarma-event", function () {
  if (!soyQuienPresiono) {
    modal.classList.remove("hidden");
    alarmaAudio.play();
  }
});

// BOTON PARA ENVIAR ALERTA
document.getElementById("alarmaBtn").onclick = async () => {
  soyQuienPresiono = true;

  await fetch("/api/alert", {
    method: "POST",
  });

  alert("🚨 Alarma enviada");
  setTimeout(() => (soyQuienPresiono = false), 1500);
};

// BOTON PARA APAGAR ALARMA
stopBtn.onclick = () => {
  alarmaAudio.pause();
  alarmaAudio.currentTime = 0;
  modal.classList.add("hidden");
};
