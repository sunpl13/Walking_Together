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
            alert("설치를 시작하겠습니다.")
            console.log("설치 승인 했을 때", choice);
        } else {
            alert("설치를 하지 않고 실행 시 앱 사용의 제한을 받을 수 있습니다.")
            console.log("설치 거부 했을 때", choice);
        }
        deferredInstallPrompt = null;
    })
}