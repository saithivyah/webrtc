export default {
  'It should transfer a file over a datachannel': (browser) => {
    const path = '/src/content/datachannel/filetransfer/index.html';
    const url = 'file://' + process.cwd() + path;

    // Disable this until https://github.com/webrtc/samples/pull/1110 is merged
    if (browser.options.desiredCapabilities.browserName === 'chrome') {
      browser.end();
      return;
    }

    browser.url(url).waitForElementVisible('#fileInput', 1000);
    browser.waitForElementNotVisible('#download', 100, 'File download link is not visible');
    browser.expect.element('#sendFile').to.not.be.enabled.before(1000);
    browser.setValue('#fileInput', process.cwd() + '/src/content/devices/multi/images/poster.jpg');
    browser.expect.element('#sendFile').to.be.enabled.before(1000);
    browser.click('#sendFile');
    browser.waitForElementVisible('#download', 10000, 'File download link is visible');
    browser.end();
  }
};
