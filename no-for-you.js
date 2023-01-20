// ==UserScript==
// @name         No "For You" Tab on Twitter
// @author       Stephen Chapman - Twitter: @Chapman | GitHub: dsasmblr
// @version      0.1
// @description  Always force the "Following" tab to be selected on the home page
// @match        *://*.twitter.com/home
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const setNahDog = () => {
        const isHomePage = location.href.includes('twitter.com/home');
        const forYouTabText = document.querySelector('[role=tab] > div > div > span');
        const isForYouText = forYouTabText.innerText === 'For you';

        if (isHomePage && isForYouText) {
            forYouTabText.innerText = 'Nah, dog';
        }
    }

    const setFollowing = () => {
        const isHomePage = location.href.includes('twitter.com/home');
        const forYouTab = document.querySelector('[role=tab] > div > div > div');
        const forYouTabIsActive = forYouTab.className.length > 30;

        if (isHomePage && forYouTabIsActive) {
            const followingTab = [...document.querySelectorAll('[role=tab]')][1];
            followingTab.click();
            followingTab.focus();
        }
    }

    const t = document.body;
    const c = { childList: true, subtree: true };

    const cb = (mutList, obs) => {
        mutList.forEach((mut) => {
            setNahDog();
            mut.type === 'childList' ? setFollowing() : null;
        });
    };

    const obs = new MutationObserver(cb);

    obs.observe(t, c);
})();
