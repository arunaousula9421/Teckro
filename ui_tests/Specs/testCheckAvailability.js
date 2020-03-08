let homePage = require('../Pages/HomePage');
const date = require('../../services/Date');

describe('Check Availability', () => {
    it('verify room availability for a specific date', () => {
        let currentDate = date.getDate();
        homePage.setAvailabilityDate(currentDate);
        homePage.clickCheckAvailabilityBtn();
        homePage.verifyCheckAvailibilityResponse(currentDate.replace('00', '0').replace('00', '0'));
    });
});