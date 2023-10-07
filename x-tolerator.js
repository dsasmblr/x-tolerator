// ==UserScript==
// @name         X Tolerator
// @author       Stephen Chapman - X: @Chapman | GitHub: dsasmblr
// @version      0.1
// @description  Make X a bearable experience
// @match        *://*.twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const srOnly = `
    	position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
        pointer-events: none;
        opacity: 0;
    `;

    const HOME_PAGE = 'twitter.com/home';
    const FOR_YOU_DIV = '[role=tab] > div > div';

    const setNahDog = () => {
        const isHomePage = location.href.includes(HOME_PAGE);
        const forYouTabText = document.querySelector(`${FOR_YOU_DIV} > span`);

        if (!forYouTabText) {
            return;
        }

        const isForYouText = forYouTabText.innerText === 'For you';

        if (isHomePage && isForYouText) {
            forYouTabText.innerText = 'Nah, dog';
        }
    }

    const setFollowing = () => {
        const isHomePage = location.href.includes(HOME_PAGE);
        const forYouTab = document.querySelector(`${FOR_YOU_DIV} > div`);

        if (!forYouTab) {
            return;
        }

        const forYouTabIsActive = forYouTab.className.length > 30;

        if (isHomePage && forYouTabIsActive) {
            const followingTab = [...document.querySelectorAll('[role=tab]')][1];
            followingTab.click();
            followingTab.focus();
        }
    }

    const noAds = () => {
        document.querySelectorAll("[data-testid*='placementTracking']").forEach((x) => {
            x.closest("[data-testid='cellInnerDiv']").style.cssText = srOnly;
        });

        document.querySelector("[aria-label='Subscribe to Premium']").style.cssText = srOnly;
    }

    const setMrow = () => {
        const trendingNow = document.querySelector('[aria-label="Timeline: Trending now"]');

        if (trendingNow) {
          trendingNow.parentElement.innerHTML = `
            <h2 style="
              color: white;
              font: 20px -apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Helvetica,Arial,sans-serif;
              font-weight: 800;
              padding-left: 16px;
            ">
              Trending mrow
            </h2>
            <div style="
              align-items: center;
              display: flex;
              height: 205px;
              justify-content: center;
            ">
              <a href="https://twitter.com/Chapman/status/1617296455584346113" style="padding-right: 15px;" target="_blank">
                <img src="https://pbs.twimg.com/media/FnHK89PWQAABUOH.png" style="max-width: 100%;" />
              </a>
            </div>
          `;
        }
    }

    const t = document.body;
    const c = { childList: true, subtree: true };

    const cb = (mutList, obs) => {
        mutList.forEach((mut) => {
            noAds();
            setMrow();
            setNahDog();
            mut.type === 'childList' ? setFollowing() : null;
        });
    };

    const obs = new MutationObserver(cb);

    obs.observe(t, c);
})();
