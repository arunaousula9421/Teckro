let homePage = require('../Pages/HomePage');
const date = require('../../services/Date').getDate();
const furtureDate = require('../../services/Date').getFutureDate();

describe('Check Availability', () => {
    it('verify room availability for a specific date', () => {
        homePage.setBookingDate(date);
        homePage.setNumberOfDays(1);
        homePage.clickBookingBtn();
        homePage.verifyBookingConfirmationResponse(date, furtureDate);
    });
});