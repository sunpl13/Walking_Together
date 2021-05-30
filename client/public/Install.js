let deferredInstallPrompt = null;
let installButton = null;

window.addEventListener('load', () => {
    installButton = document.getElementById("install-button");
    installButton.addEventListener('click', installPWA);
});

window.addEventListener(
    'beforeinstallprompt',
    saveBeforeInstallPromptEvent
);

function saveBeforeInstallPromptEvent(evt) {
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
}

function installPWA() {
    deferredInstallPrompt.prompt();

    installButton.remove();

    deferredInstallPrompt.userChoice
    .then((choice) => {
        if(choice.outcome === 'accepted') {
            console.log("설치 승인 했을 때", choice);
        } else {
            console.log("설치 거부 했을 때", choice);
        }
        deferredInstallPrompt = null;
    })
}