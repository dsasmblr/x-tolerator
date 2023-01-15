// ==UserScript==
// @author       Stephen Chapman - Twitter: @Chapman | GitHub: dsasmblr
// @name         No "For You" Tab on Twitter
// @version      0.1
// @description  Always force the "Following" tab to be selected on the home page
// @match        *://*.twitter.com/home
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const setFollowing = () => {
        const forYouTab = document.querySelector('[role=tab] > div > div > div');
        const forYouTabIsActive = forYouTab.className.length > 30;

        if (forYouTabIsActive) {
            const followingTab = [...document.querySelectorAll('[role=tab]')][1];
            followingTab.click();
            followingTab.focus();
        }
    }

    const t = document.body;
    const c = { childList: true, subtree: true };

    const cb = (mutList, obs) => {
        mutList.forEach((mut) => {
            mut.type === 'childList' ? setFollowing() : null;
        });
    };

    const obs = new MutationObserver(cb);

    obs.observe(t, c);

    setTimeout(() => { document.querySelector('[role=tab] > div > div > span').innerText = 'Nah, dog' }, 2000);
})();
