import homePage from './homePage';
import hotelSearchPage from "./hotelSearchPage";
import hotelResultPage from "./hotelResultPage"

export default class hotelDetailsPage {
    hotelDetails: any; availableRoomCount: any; hotelName: any; hotelRating: any;

    constructor() {
        this.hotelDetails = $(`.hotel-redesign-detail-header-main card-layout-leftwrapper  hotel-guest-summary `);
        this.availableRoomCount = $(`h3#hotel-rooms-count > strong`);
        this.hotelName = $(`/html//div[@id='HotelResultContent']/div[2]//span[@class='margin-right-1']`);
        this.hotelRating = $(`//*[@id="HotelResultContent"]/div[2]/div[2]/div[1]/h2/div`)
    }
    
    // get hotel name for selected hotel
    getHotelName() {
        return this.hotelName.getText();
        }

    // get hotel rating for selected hotel
    getHotelRating() {
        return this.hotelRating.getAttribute('title').split(' ')[0];
    }

    // get room availability for selected hotel
    checkRoomAvailability() {
        return parseFloat(this.availableRoomCount.getText().split(' ')[0]);
    }

}
