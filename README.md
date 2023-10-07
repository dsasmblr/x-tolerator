# X Tolerator
This [Tampermonkey](https://www.tampermonkey.net/) script does the following things:

1. Gets rid of the "For You" tab functionality and renames it to "Nah, dog".
2. Gets rid of the "Trending Now" section and replaces it with "Trending Mrow".
3. Rids your feed of ads.
4. Gets rid of the "Subscribe to Premium" aside in the sidebar.

I've made it simple to remove any features you don't want from this script. Simply comment out any of the function calls for features you're not interested in!

Currently, those are:

    noAds();
    setMrow();
    setNahDog();

For example, if you comment out `setMrow()` (ex. `// setMrow()`), then you'll see the "Trending Now" section as you normally would.

This script will surely break at some point, but I'll sporadically keep it updated so long as I personally use X on the desktop!
