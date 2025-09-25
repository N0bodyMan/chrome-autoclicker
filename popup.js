let intervalId;

document.getElementById('start').addEventListener('click', async () => {
    const interval = parseInt(document.getElementById('interval').value);

    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: startClicking,
        args: [interval]
    });
});

document.getElementById('stop').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: stopClicking
    });
});

function startClicking(interval) {
    window.autoClickerInterval = setInterval(() => {
        const clickEvent = new MouseEvent('click', {bubbles: true});
        document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2).dispatchEvent(clickEvent);
    }, interval);
}

function stopClicking() {
    clearInterval(window.autoClickerInterval);
}
