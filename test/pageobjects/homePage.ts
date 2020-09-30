
export default class homePage {

    open(path:string =''){
        return browser.url(`http://vacationsdirect.com/${path}`);
    }

    
    // get flightTab() { return $("ul[role='tablist'] > li:nth-of-type(1) > button")};
    // get hoteltTab() { return $("ul[role='tablist'] > li:nth-of-type(2) > button") };
    // get carTab() {return $("ul[role='tablist'] > li:nth-of-type(3) > button")};

}

