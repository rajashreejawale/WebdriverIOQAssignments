import homePage from '../pageobjects/homePage';
import hotelSearchPage from '../pageobjects/hotelSearchPage';

before(() => {
    let page = new homePage();
    page.open();
})

describe('Home Page Tests', () => {

    it('1. Verify Vacation Direct title', () => {
        expect(browser).toHaveTitle("Home");
    });

})

