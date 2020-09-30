import homePage from '../pageobjects/homePage';
import hotelSearchPage from '../pageobjects/hotelSearchPage';
import hotelResultPage from '../pageobjects/hotelResultPage';
import hotelDetailsPage from '../pageobjects/hotelDetailsPage';

describe('Hotel Details page Test', () => {
    let HotelSearchPage;
    let HotelResultPage;
    let HotelDetailsPage;

    before(() => {
        browser.maximizeWindow();
        HotelSearchPage = new hotelSearchPage();
        HotelSearchPage.open();

        browser.pause(5000);
        HotelSearchPage.setDestination('Boston, MA');
        HotelSearchPage.setCheckinDate();
        HotelSearchPage.setCheckoutDate();
        HotelSearchPage.clickSearchHotelButton();
        browser.pause(3000);
        HotelResultPage = new hotelResultPage();
        HotelDetailsPage = new hotelDetailsPage();

    })

    it('Verify HotelName,Rating,Room Availability', () => {
        let hotelNumber = HotelResultPage.getRandomHotelNo();
        console.log("Hotel No " + hotelNumber);
        let hotenName = HotelResultPage.getRandomHotelName(hotelNumber);
        console.log("Hotel Name: " + hotenName)
        let hotelRating = HotelResultPage.getRandomHotelRating(hotelNumber);
        console.log("Hotel Rating: " + hotelRating)
        HotelResultPage.clickRandomChooseRoomButton(hotelNumber);
        browser.pause(3000);
        let hotelNameFromDetails = HotelDetailsPage.getHotelName();
        let hotelRatingFromDetails = HotelDetailsPage.getHotelRating();
        console.log("Rating from Details page: " + hotelRatingFromDetails);
        let roomAvailability = HotelDetailsPage.checkRoomAvailability();
        console.log("Rooms available: " + roomAvailability);

        expect(roomAvailability).toBeGreaterThan(0);
        expect(hotelNameFromDetails).toBe(hotenName);
        expect(hotelRatingFromDetails).toBe(hotelRating);
    });
})