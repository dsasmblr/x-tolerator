// ==UserScript==
// @name         X Tolerator
// @author       Stephen Chapman - X: @Chapman | GitHub: dsasmblr
// @version      0.1
// @description  Make X a bearable experience
// @match        *://*.twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(() => {
    const srOnly = `
        border-width: 0;
        clip: rect(0, 0, 0, 0);
        height: 1px;
        margin: -1px;
        opacity: 0;
        overflow: hidden;
        padding: 0;
        pointer-events: none;
    	position: absolute;
        white-space: nowrap;
        width: 1px;
    `;

    const trendingMrow = `
        <h2 style="
            color: white;
            font: 20px -apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Helvetica,Arial,sans-serif;
            font-weight: 800;
            padding-left: 16px;
        ">
            Trending Mrow!
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

    const HOME_PAGE = 'twitter.com/home';
    const FOR_YOU_DIV = '[role=tab] > div > div';

    const setNahDog = () => {
        const isHomePage = location.href.includes(HOME_PAGE);
        const forYouTab = document.querySelector(`${FOR_YOU_DIV} > div`);
        const forYouTabText = document.querySelector(`${FOR_YOU_DIV} > span`);

        if (!isHomePage || !forYouTab || !forYouTabText) {
            return;
        }

        const isForYouText = forYouTabText?.innerText === 'For you';
        const forYouTabIsActive = forYouTab?.className.length > 30;

        if (isForYouText) {
            forYouTabText.innerText = 'Nah, dog';
        }

        if (forYouTabIsActive) {
            const followingTab = [...document.querySelectorAll('[role=tab]')][1];
            followingTab.click();
            followingTab.focus();
        }
    }

    const noAds = () => {
        document.querySelectorAll("[data-testid*='placementTracking']").forEach((x) => {
            x.closest("[data-testid='cellInnerDiv']").style.cssText = srOnly;
        });

        const premium = document.querySelector("[aria-label='Subscribe to Premium']");

        if (premium) {
            premium.style.cssText = srOnly;
        }
    }

    const setMrow = () => {
        const trendingNow = document.querySelector('[aria-label="Timeline: Trending now"]');

        if (trendingNow) {
          trendingNow.parentElement.innerHTML = trendingMrow;
        }
    }

    const target = document.body;
    const config = {
        childList: true,
        subtree: true
    }

    const callback = (mutList, obs) => {
        if (mutList) {
            noAds();
            setMrow();
            setNahDog();
        }
    }

    const obs = new MutationObserver(callback);

    obs.observe(target, config);
})();
