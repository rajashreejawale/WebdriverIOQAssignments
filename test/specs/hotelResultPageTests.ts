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

    it('verify result wayfinder information', () => {
        let str = HotelResultPage.getHotelWayfinderInfo();
        expect(str).toContain('Las Vegas, NV (LAS)');
    });

    it('verify result hotel count', () => {
        let str = HotelResultPage.getHotelResultCount();
        expect(str).toBe(HotelResultPage.getHotelResultCount());
    });

    it('verify hotel location', () => {
        expect(HotelResultPage.gethotelLocationInResult()).toBe(true);
    });

    it('verify hotels are filtered when searched hotel exists', () => {
        HotelResultPage.setHotelNameFilter('Four Seasons Hotel Las Vegas');
        HotelResultPage.selectAutolistedHotel();
        let hotelName = $(`.hotel-name-titleshow-guest-summary`);
        expect(hotelName.getText()).toContain('Four Seasons Hotel Las Vegas');
        HotelResultPage.clearHotelNameFilter();
        browser.pause(5000);
    });

    // it('verify Search result hotel name filter when hotel does not exists', () => {
    //     HotelResultPage.setHotelNameFilter('Tahiti Village');
    //     HotelResultPage.selectAutolistedHotel();
    //     expect(HotelResultPage.flashNoHotelFoundMsg()).toContain("We couldn’t find any hotels that match your filter selections. Your filter selections have been removed. View all hotels below.");  
    //     expect(HotelResultPage.getHotelNameFilter).toBeNull();
    //     browser.pause(3000);
    // });

    it(' verify star Rating filter', () => {
        browser.pause(3000);
        HotelResultPage.setCheckBoxRating(5);
        browser.pause(3000);
        let hotelNumber = HotelResultPage.getRandomHotelNo();
        console.log("Hotel No " + hotelNumber);
        let starRating = HotelResultPage.getRandomHotelRating(hotelNumber);
        expect(starRating).toBe('5');
    });
})


describe('Hotel Result pagination tests', () => {
    let HotelSearchPage;
    let HotelResultPage;

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
    })

    it('pagination click test', () => {
        let pageNumber = 11;
        HotelResultPage.paginationGoToPage(pageNumber);
        browser.pause(3000);
        let currentPage = HotelResultPage.paginationCurrentPage.getText();
        expect(currentPage).toBe(`${pageNumber}`);
        browser.pause(3000);
        //Reset to page 1
        HotelResultPage.paginationGoToPage(1);
        browser.pause(3000);
    });

    it('should hide previous button on first page', () => {
        HotelResultPage.paginationGoToPage(1);
        browser.pause(3000);
        expect(HotelResultPage.getElementpagination(0)).toBe('1');
        browser.pause(3000);
    });

    it('should hide next button on last page', () => {
        let totalPageCount = HotelResultPage.getHotelResultTotalPages();
        HotelResultPage.paginationGoToPage(totalPageCount);
        browser.pause(3000);
        expect(HotelResultPage.getElementpagination(HotelResultPage.paginationArray.$$('li').length - 1)).toBe(`${HotelResultPage.getHotelResultTotalPages()}`);
        HotelResultPage.paginationGoToPage(1);
        browser.pause(3000);
    });

    it('previous button should take you to previous page', () => {
        HotelResultPage.paginationGoToPage(4);
        browser.pause(3000);
        HotelResultPage.paginationArray.$$('li')[0].click();
        browser.pause(3000);
        expect(HotelResultPage.paginationCurrentPage.getText()).toBe('3');
        browser.pause(3000);
    });

    it('next button should take you to next page', () => {
        HotelResultPage.paginationGoToPage(4);
        browser.pause(3000);
        HotelResultPage.paginationArray.$$('li')[HotelResultPage.paginationArray.$$('li').length - 1].click();
        browser.pause(3000);
        expect(HotelResultPage.paginationCurrentPage.getText()).toBe('5');
        browser.pause(3000);
    });
})

describe('Hotel Result sorting tests', () => {
        let HotelSearchPage;
        let HotelResultPage;

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
    })

    it('sort for Price per Night', () => {
        HotelResultPage.paginationGoToPage(4);
        expect(HotelResultPage.clickSortListElement('Price Per Night')).toBe(true);
        browser.pause(3000);
    });

    it('sort for Hotel Name', () => {
        expect(HotelResultPage.clickSortListElement('Hotel Name')).toBe(true);
        browser.pause(3000);
    });

    it('sort for Distance', () => {
        expect(HotelResultPage.clickSortListElement('Distance')).toBe(true);
        browser.pause(3000);
    });

    it('sort for Star Rating', () => {
        expect(HotelResultPage.clickSortListElement('Star Rating')).toBe(true);
        browser.pause(3000);
    });
})



//write seperate describe statement for groups