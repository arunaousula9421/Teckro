const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha');
const date = require('../services/Date.js').getDate();
const futureDate = require('../services/Date.js').getFutureDate();
const baseUrl = supertest('http://localhost:9090');
const bookRoom = '/bookRoom'


let response;
let responseBody;

const call_bookRoom_api = async (numberOfDays, checkInDate) => {
    return await baseUrl.post(bookRoom)
    .send(`{"numOfDays":${numberOfDays}, "checkInDate":"${checkInDate}"}`);
}

/**
 * As part of this,
 * I am checking if I receive valid response
 * when valid requested data is sent
 * 
 * Note: checking price might fail as it changes day to day 
 */

describe('Positive: Book room with valid date', () => {
    before(async () => {
        response = await call_bookRoom_api(1, date);
        responseBody = response.body;
    });

    it('status code is 200', () => {
        expect(response.status).to.equal(200);
    });

    it('verify response checkInDate matches the given date', () => {
        expect(responseBody.checkInDate).to.equal(date);
    });

    it('verify response checkOutDate matches the given checkout date', () => {
        expect(responseBody.checkOutDate).to.equal(futureDate.replace('00', '0').replace('00', '0'));
    });

    it('verify room price', () => {
        expect(responseBody.totalPrice).to.exist;
    }); 
});

/**
 * As part of this negative test,
 * I have sent invalid date format which should return invalid response
 * but that didn't happen
 * 
 * Bugs Found:
 * 1. When invalid date format is sent, response data should be invalid
 * 2. When invalid date is sent it should return 400 status code instead of 200
 * 3. Valid error message should be displayed invalid request is made
 * 4. checkOutDate response is invalid when incorrect date format is sent
 * 
 * I have made the test fail as they are the bugs found
 * 
 */

describe('Negative: Room booking with invalid date format', () => {
    let invalidDate = '20-03-2020';
    before(async () => {
        response = await call_bookRoom_api(1, invalidDate);
        responseBody = response.body;
    });

    it('status code is 400', () => {
        expect(response.status).to.equal(400);
    });

    /**
     * Below test are just for coverage. But when invalid data is sent
     * these response shouldn't come back and tests are invalid
     */

    it('verify response checkInDate matches the given date', () => {
        expect(responseBody.checkInDate).to.equal(invalidDate);
    });

    it('verify response checkOutDate matches the given checkout date', () => {
        expect(responseBody.checkOutDate).to.equal('21-03-2020');
    });
});

/**
 * As part of this negative test,
 * I have sent past date which should return invalid response
 * but that didn't happen
 * 
 * Bugs Found:
 * 1. When past date is sent, valid error should be displayed in the response
 * 2. When past date is sent, it should return 400 status code instead of 200
 * 
 * I have made the test fail as they are the bugs found
 *
 */

describe('Negative: Room booking with past date', () => {
    let pastDate = '2019-03-20';
    before(async () => {
        response = await call_bookRoom_api(1, pastDate);
        responseBody = response.body;
    });

    it('status code is 400', () => {
        expect(response.status).to.equal(400);
    });

    /**
     * Below test are just for coverage. But when invalid data is sent
     * these response shouldn't come back and tests are invalid
     */

    it('verify response checkInDate matches the given date', () => {
        expect(responseBody.checkInDate).to.equal(pastDate);
    });

    it('verify response checkOutDate matches the given checkout date', () => {
        expect(responseBody.checkOutDate).to.equal('2019-03-21');
    });
});

/**
 * As part of this negative test,
 * I have sent number days as 0 which should throw error
 * 
 * Bugs Found:
 * 1. When number of days is set to 0, then it should return an error.
 *    Number of days should always be greater than 0.
 * 2. Response code should be 400 instead of 200.
 * 
 * I have made the test fail as they are the bugs found
 *
 */

describe('Negative: Room booking when number of days is set to 0', () => {
    before(async () => {
        response = await call_bookRoom_api(0, date);
        responseBody = response.body;
    });

    it('status code is 400', () => {
        expect(response.status).to.equal(400);
    });

    /**
     * Below test are just for coverage. But when invalid data is sent
     * these response shouldn't come back and tests are invalid
     */
 
    it('verify response checkInDate matches the given date', () => {
        expect(responseBody.checkInDate).to.equal(date);
    });

    it('verify response checkOutDate matches the given date', () => {
        expect(responseBody.checkOutDate).to.equal(date.replace('00', '0').replace('00', '0'));
    });
});