import homePage from '../pageobjects/homePage';
import hotelSearchPage from '../pageobjects/hotelSearchPage';
import hotelResultPage from '../pageobjects/hotelResultPage';

describe('Hotel search page tests', () => {
    let HotelSearchPage;
    let HotelResultPage;

    before(() => {
        browser.maximizeWindow();
        HotelSearchPage = new hotelSearchPage();
        HotelSearchPage.open();
        HotelResultPage = new hotelResultPage();
    })

    it('should search Hotels', () => {
        browser.pause(5000);
        HotelSearchPage.setDestination('Las Vegas, NV');
        HotelSearchPage.setCheckinDate();
        HotelSearchPage.setCheckoutDate();
        HotelSearchPage.clickSearchHotelButton();
        browser.pause(3000);
    });

})


// Seperate Hotel Details Page --Done
// Optimize Star rating test test cases --Done
// remove seletors from test file --Done