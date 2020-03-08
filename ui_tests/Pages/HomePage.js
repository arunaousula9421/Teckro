const expect = require('chai').expect;

class HomePage {
    constructor() {
        this.checkAvailabilityDateField = element(by.id("mat-input-0"));
        this.bookRoomDateField = element(by.id("mat-input-1"));
        this.numberOfDaysField = element(by.id("mat-input-2"));
        this.checkAvailabilityBtn = element(by.xpath("//span[.='Check']"));
        this.bookRoomBtn = element(by.xpath("//span[.='Book']"));
        this.checkAvailibiltyResponse = element(by.xpath("//pre[@class='response availabilty ng-star-inserted']"));
        this.bookingConfirmationResponse = element(by.xpath("//pre[@class='response booking ng-star-inserted']"));
    }

    setAvailabilityDate = async (date) => {
        this.checkAvailabilityDateField.clear();
        await this.checkAvailabilityDateField.sendKeys(date);
    };

    setBookingDate = async (date) => {
        this.bookRoomDateField.clear();
        await this.bookRoomDateField.sendKeys(date);
    };

    setNumberOfDays = (numberOfDays) => {
        return this.numberOfDaysField.sendKeys(numberOfDays);
    };

    clickCheckAvailabilityBtn = () => {
        return this.checkAvailabilityBtn.click();
    };

    clickBookingBtn = () => {
        return this.bookRoomBtn.click();
    };

    verifyCheckAvailibilityResponse = async (date) => {
        let response = await this.checkAvailibiltyResponse.getText();
        expect(response).to.contain(`"date": "${date}"`);
        expect(response).to.contain('rooms_available');
        expect(response).to.contain('price');
    }

    verifyBookingConfirmationResponse = async (date, futureDate) => {
        let response = await this.bookingConfirmationResponse.getText();
        expect(response).to.contain(`"checkInDate": "${date}"`);
        expect(response).to.contain(`"checkOutDate": "${futureDate}"`);
        expect(response).to.contain('totalPrice');
    }
}

module.exports = new HomePage();