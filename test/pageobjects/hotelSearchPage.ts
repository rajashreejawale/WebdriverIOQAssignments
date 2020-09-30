import homePage from "./homePage";

export default class hotelSearchPage extends homePage {
    hotelTab: any; destination: any;  selectDestination: any;
    checkInDate: any; checkInDateCalender: any; checkoutDateCalender: any;
    searchHotelsButton: any;
     

    //define selectors
    constructor() {
        super();
        this.hotelTab = $(`ul[role='tablist'] > li:nth-of-type(2) > button`);
        this.destination = $("/html//input[@id='inputDestination']");
        this.selectDestination = $(`ul[role='listbox']`);
        this.checkInDate = $('//*[@id="inputCheckInDate_Label"]/parent::*/div/input[2]');
        this.checkInDateCalender = $("//a[@id='jd-10-08-20']");
        this.checkoutDateCalender = $('//*[@id="jd-10-15-20"]');
        this.searchHotelsButton = $(`/html//button[@id='hotelSearchButton']`);
        // this.adults = $(`/html//select[@id='selectHotelNumberAdults']`);
        // this.children = $(`/html//select[@id='selectHotelNumberChildren']`);
    }

    open() {
        super.open();
        this.hotelTab.click();
        return browser;
    }

    setDestination(city: String) {
        this.destination.setValue(city);
    }


    setCheckinDate(date: string) {
        browser.pause(1000);
        this.checkInDate.click();
        browser.pause(1000);
        this.checkInDateCalender.click();
        browser.pause(1000);
    }

    setCheckoutDate(date: string) {
        browser.pause(1000);
        this.checkoutDateCalender.click();
        browser.pause(1000);
    }

    clickSearchHotelButton() {
        browser.pause(1000);
        this.searchHotelsButton.click();
        browser.pause(1000);
    }

}