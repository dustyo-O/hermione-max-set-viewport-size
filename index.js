'use strict';

module.exports = (hermione, maxSizes = {}) => {
    hermione.on(hermione.events.NEW_BROWSER, (browser) => {
        browser.overwriteCommand('setViewportSize', async (baseSetViewportSize, size) => {
            const browserId = await browser.getConfig().then(config => config.id);
            const maxSize = maxSizes[browserId];

            const actualSize = { ...size };

            if (maxSize) {
                actualSize.width = size.width > maxSize.maxWidth ? maxSize.maxWidth : size.width;
                actualSize.height = size.height > maxSize.maxHeight ? maxSize.maxHeight : size.height;
            }

            await baseSetViewportSize(actualSize);
        });
    });
};
