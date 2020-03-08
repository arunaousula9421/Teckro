exports.config = {
    framework: 'jasmine',
    directConnect: true,
    specs: ['./Specs/*.js'],
    onPrepare: () => {
        browser.driver.manage().window().maximize();
        browser.get('http://localhost:4200/');
      }
  }