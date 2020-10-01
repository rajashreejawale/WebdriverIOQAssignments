import homePage from '../pageobjects/homePage';
import hotelSearchPage from '../pageobjects/hotelSearchPage';
import hotelResultPage from '../pageobjects/hotelResultPage';

describe('Hotel result page tests', () => {
    let HotelSearchPage;
    let HotelResultPage;

    before(() => {
        browser.maximizeWindow();
        HotelSearchPage = new hotelSearchPage();
        HotelSearchPage.open();

        browser.pause(5000);
        HotelSearchPage.setDestination('Las Vegas, NV');
        HotelSearchPage.setCheckinDate();
        HotelSearchPage.setCheckoutDate();
        HotelSearchPage.clickSearchHotelButton();
        browser.pause(3000);
        HotelResultPage = new hotelResultPage();
    })

 it('verify Search result hotel name filter when hotel does not exists', () => {
        browser.pause(3000);
        HotelResultPage.setCheckBoxRating(5);
        browser.pause(3000);
        HotelResultPage.setHotelNameFilter('Tahiti Village');
        HotelResultPage.selectAutolistedHotel();
        browser.pause(3000);
        let message = HotelResultPage.flashNoHotelFoundMsg();
        expect(message).toContain("We couldn’t find any hotels that match your filter selections. Your filter selections have been removed. View all hotels below.");  
        expect(HotelResultPage.getHotelNameFilter()).toBe('');
        browser.pause(3000);
    });

})