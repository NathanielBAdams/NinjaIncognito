chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.set({ color: '#3aa757' }, function() {
    console.log('The color is green.');
  });
});

chrome.cookies.getAll({}, (cookies) => {
  console.log(cookies);
});
let newTabURL;
chrome.windows.getAll({}, (windows) => {
  windows.forEach((window) => {
    if (window.focused === true) {
      chrome.tabs.query({ windowId: window.id }, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.active) {
            newTabURL = tab.url;
          }
        });
      });
    }
  });
});

const ninja = document.querySelector('.ninja');
const info = document.querySelector('.info');
const mainPopup = document.querySelector('#mainPopup');

ninja.addEventListener('click', () => {
  setTimeout(() => incognitoWindow(), 1000);
  // change classes,
  info.innerHTML = 'You have gone ninja.';
  button.classList.add('img-ninja-mode');
  // mainPopup.style.backgroundColor = '#292a2d';
  mainPopup.classList.add('ninja-mode');
});

function incognitoWindow() {
  chrome.windows.create({ url: newTabURL, incognito: true });
}
