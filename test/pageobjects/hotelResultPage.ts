import homePage from "./homePage";

import hotelSearchPage from "./hotelSearchPage";

export default class hotelResultPage {
    hotelWayfinderInfo: any; hotelWayfinderPreferredSearch: any; hotelResultCount: any;
    hotelNameFilter: any;
    hotelSearchLocation: any; hotelLocationInResult: any; autoSuggestList: any;
    clearHotelName: any; flashMessage: any; chooseRoom: any; fourSeasonsLasVegas: any;
    sortList: any; paginationArray: any; paginationCurrentPage: any;
    resultList: any; priceRatingSortingButton: any;
    hotelDistance: any; distanceSortingButton: any; hotelName: any; hoteNameSortingButton: any;
    starRatingSortingButton: any; chooseRoomButton: any;


    constructor() {
        this.hotelWayfinderInfo = $(`//div[@id='WayfinderWrapper']/div[@class='wayfinder-info']`);
        this.hotelWayfinderPreferredSearch = $(`//div[@id='WayfinderWrapper']//span[@class='js-wayfinder-prefered-search']`);
        this.hotelResultCount = $(`.hotel-results-pagination-count-header`);
        this.hotelNameFilter = $(`input#HotelNameFilter`);
        this.hotelLocationInResult = $(`ul#HotelSearchResults`);
        this.autoSuggestList = $(`[role='listbox']`);
        this.clearHotelName = $(`button#ClearHotelName`);
        this.flashMessage = $(`//div[@id='HotelResultsContent']//div[@class='js-no-results no-results-message']`);
        this.chooseRoom = $(`/html//ul[@id='HotelSearchResults']/li[2]/div//button[.='Choose Room']`);
        this.fourSeasonsLasVegas = $('Four Seasons Hotel Las Vegas');
        this.sortList = $(`ul[class="results-sort hotel-sort grid__col-auto grid--no-wrap grid--align-center hotel-sort-align"]`);
        this.paginationArray = $(`ul[class='js-pagination pagination-lg margin-left-1']`);
        this.paginationCurrentPage = $(`[class ='btn-link active-page js-pagination-active']`);
        this.resultList = $(`ul[class='hotelresults-list-container results-container']`);
        this.priceRatingSortingButton = $(`//*[@id="StarRating"]`);
        this.hotelDistance = $(`div[class='hotel-result-distance-address-info show-guest-summary']`);
        this.distanceSortingButton = $(`//*[@id="DistanceSort"]`);
        this.hotelName = $(`[class='hotel-results-hotel-info']`);
        this.hoteNameSortingButton = $(`//*[@id="HotelName"]`);
        this.starRatingSortingButton = $(`//*[@id="StarRating"]`);
        this.chooseRoomButton = $(`.btn margin-top-1 js-choose-room padding-left-1 padding-right-1 button-custom-one btn-primary`);

    }
    // get hotel way finder information
    getHotelWayfinderInfo() {
        return this.hotelWayfinderInfo.getText();
    }

    // get hotel result count from header
    getHotelResultCount() {
        return this.hotelResultCount.getText().split(' ')[5];
    }
    // get city name from way finder
    gethotelLocationInResult() {
        return this.hotelLocationInResult.getText().includes('Las Vegas, NV');
    }

    //set hotel name filter value
    setHotelNameFilter(hotelName: string) {
        this.hotelNameFilter.setValue(hotelName);
    }
    //select hotel name from autosuggested list
    selectAutolistedHotel() {
        this.autoSuggestList.click();
        browser.pause(3000);
    }
    //set hotel name filter value
    getHotelNameFilter() {
        return this.hotelNameFilter.getText();
    }

    // flash hotel not fount message
    flashNoHotelFoundMsg() {
        return this.flashMessage.getText();
        browser.pause(3000);
    }

    //select checkbox
    setCheckBoxRating(index: number) {
        //$(`li:nth-of-type(${index}) > .star-filter-label > .icon-checkmark`).click();
        //$(`#StarRatingFilter`+index).click();
        $(`//*[@id="MainHotelResultsFilter"]/div[2]/fieldset/div/ul/li[3]/ul/li[${6 - index}]/label/span[1]`).click();
        //*[@id="MainHotelResultsFilter"]/div[2]/fieldset/div/ul/li[3]/ul/li[1]/label/span[1]
    }

    // deselect hotel name filter applied
    clearHotelNameFilter() {
        this.clearHotelName.click();
        browser.pause(3000);
    }

    //Generate random no from a selected page
    getRandomHotelNo() {
        // let maxPageNo =this.getHotelResultTotalPages();
        // let minPageNo =1;
        // let randomPageNo = Math.floor(Math.random() * (maxPageNo - minPageNo + 1) + minPageNo);
        // this.paginationGoToPage(randomPageNo);
        //get max no of hotels available on page
        let maxHotelNo = this.resultList.$$('.js-hotel-result').length;
        console.log("Max no:" + maxHotelNo);
        let minHotelNo = 1;
        let randomno = Math.floor(Math.random() * (maxHotelNo - minHotelNo + 1) + minHotelNo);
        console.log("Random No is: " + randomno);
        return randomno;
    }

    //get hotel name for random hotel no
    getRandomHotelName(randomHotelNo: number) {
        browser.pause(5000);
        return this.resultList.$$('.hotel-results-hotel-info')[randomHotelNo].$$('dd')[0].$('a').getAttribute('title');

    }
    //get hotel name for random hotel no
    getRandomHotelRating(randomHotelNo: number) {
        return this.resultList.$$('.hotel-results-hotel-info')[randomHotelNo].$$('dd')[1].getAttribute('title').split(' ')[0];
    }
    // click random hotel choose button
    clickRandomChooseRoomButton(randomHotelNo: number) {
        browser.pause(5000);
        let i = randomHotelNo;
        console.log("Mohit:" + i)
        this.resultList.$$(`.js-hotel-result`)[i].$(`div`).$('div').$(`.hotel-result-pricing-section-container`).$(`div`).$(`dl`).$$('dd')[4].$(`button`).click();
        browser.pause(4000);
        //this.resultList.$$(`.btn margin-top-1 js-choose-room padding-left-1 padding-right-1 button-custom-one btn-primary`)[i].click();
        //this.resultList.$(`/html//ul[@id='HotelSearchResults']/li[`+i+`]/div//button[.='Choose Room']`).click();
    }

    // //
    // goToPaginationPageElement(index: number) {
    //     return this.paginationArray.$$('li')[index];
    // }
    //from pagination array, get text of nth element
    getElementpagination(index: number) {
        return this.paginationArray.$$('li')[index].getText();
    }
    // //get paginition array length
    // getpaginationArrayLength() {
    //     return this.paginationArray.$$('li').length;
    // }

    getHotelResultTotalPages() {
        return Math.ceil(this.getHotelResultCount() / 25);
    }
    // go to specified page 
    paginationGoToPage(pageNo: any) {
        pageNo = `${pageNo}`;
        let i = 0;
        //scanning pagination array left to right
        while (pageNo !== this.paginationArray.$$(`li`)[i].getText()) {
            if (i < this.paginationArray.$$('li').length - 1) {
                i++;
            } else {
                if (parseInt(pageNo) > parseInt(this.paginationCurrentPage.getText())) { // if current page is 
                    this.paginationArray.$$('li')[this.paginationArray.$$('li').length - 2].click();
                    i = 0;
                } else {
                    this.paginationArray.$$('li')[1].click();
                    i = 0;
                }
            }
        }
        this.paginationArray.$$('li')[i].click();
        browser.pause(5000);
    }

    // method to check sorting functionality
    clickSortListElement(sortBy: string) {
        let resultArrayLength = this.resultList.$$(`.js-hotel-result`).length;
        let sortingOrder;
        switch (sortBy) {
            case 'Recommended':
                break;

            case 'Star Rating':
                this.sortList.$$('li')[2].click();
                let starRatingArray = [];
                // scan results from top to bottom
                for (let j = 0; j < resultArrayLength; j++) {
                    let starRating = this.resultList.$$('.hotel-results-hotel-info')[j].$$('dd')[1].getAttribute('title').split(' ')[0];
                    starRatingArray.push(parseInt(starRating));
                }
                console.log("StarArray  " + starRatingArray);
                //create sortedStarRatingArray from starRatingArray
                let sortedStarRatingArray = starRatingArray.sort((a, b) => a - b)

                // compare sortedPriceArray with priceArray as per sortingOrder
                sortingOrder = this.starRatingSortingButton.getAttribute('aria-describedby');

                if (sortingOrder === 'description-hotel-starrating-asc') {
                    //sorting ascending
                    return starRatingArray.every((val, index) => val = sortedStarRatingArray[index]);
                } else {
                    //sorting descending
                    sortedStarRatingArray = sortedStarRatingArray.reverse();
                    return starRatingArray.every((val, index) => val = sortedStarRatingArray[index]);
                }
                break;

            case 'Price Per Night':
                this.sortList.$$('li')[3].click();
                let priceArray = [];
                browser.pause(5000);

                //scanning hotel results from top to bottom on a single page
                for (let i = 0; i < resultArrayLength; i++) {
                    let price = parseFloat(this.resultList.$$(`.unit-cash`)[i].$('.cash-value').getText().split('$')[1]);
                    priceArray.push(price);
                }
                console.log('PriceArray - ' + priceArray);

                //create sortedPriceArray from priceArray
                let sortedPriceArray = priceArray.sort((a, b) => a - b);

                // compare sortedPriceArray with priceArray as per sortingOrder
                sortingOrder = this.priceRatingSortingButton.getAttribute('aria-describedby');

                if (sortingOrder === 'description-hotel-starrating-asc') {
                    // sorting ascending
                    return priceArray.every((val, index) => val = sortedPriceArray[index]);
                } else {
                    //sorting descending
                    sortedPriceArray = sortedPriceArray.reverse();
                    return priceArray.every((val, index) => val = sortedPriceArray[index]);
                }
                break;

            case 'Distance':
                this.sortList.$$('li')[4].click();
                let distanceArray = [];
                browser.pause(5000);

                //scan distance for each hotel from top to bottom
                for (let i = 0; i < resultArrayLength; i++) {
                    let distance = this.resultList.$$('.hotel-result-detail-section')[i].$('div').$('div').$('div').$$('dl')[1].$('dd').getText().split(' ')[0];
                    //     let distance = this.resultList.$$(`.hotel-result-distance-address-info show-guest-summary`)[i].$$('dl')[1].$('dd').getText()
                    distanceArray.push(parseFloat(distance));
                }
                console.log("distance array :" + distanceArray);

                //create sortedDistanceArray from distanceArray
                let sortedDistanceArray = distanceArray.sort((a, b) => a - b);

                //compare sortedDistanceArray with distanceArray as per sortingOrder
                sortingOrder = this.distanceSortingButton.getAttribute('aria-describedby');
                if (sortingOrder === 'description-hotel-distance-asc') {
                    //sorting ascending
                    return distanceArray.every((val, index) => val = sortedDistanceArray[index]);
                } else {
                    //sorting descending
                    sortedDistanceArray = sortedDistanceArray.reverse();
                    return distanceArray.every((val, index) => val = sortedDistanceArray[index]);
                }
                break;

            case 'Hotel Name':
                this.sortList.$$('li')[5].click();
                let hotelNameArray = [];
                browser.pause(3000);

                for (let i = 0; i < resultArrayLength; i++) {
                    let name = this.resultList.$$('.hotel-results-hotel-info')[i].$$('dd')[0].$('a').getAttribute('title');
                    hotelNameArray.push(name);
                }
                console.log("Hotel Name array : " + hotelNameArray);

                //create sortedHotelNameArray from hotelNameArray
                let sortedHotelNameArray = hotelNameArray.sort();

                //compare sortedHotelNameArray with hotelNameArray as per sortingOrder
                sortingOrder = this.hoteNameSortingButton.getAttribute('aria-describedby')

                if (sortingOrder === 'description-hotel-name-asc') {
                    //sorting ascending
                    return hotelNameArray.every((val, index) => val = sortedHotelNameArray[index]);
                } else {
                    //sorting descending
                    sortedHotelNameArray = sortedHotelNameArray.reverse();
                    return hotelNameArray.every((val, index) => val = sortedHotelNameArray[index]);
                }
                break;
        }
    }
}





