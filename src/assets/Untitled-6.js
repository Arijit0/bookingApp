


when ajax success - this.filterAirportList=this.airportlist;

stopfilter = true;
airlinefilter = true;
timefilter = true;
pricefilter = true;


ngfor - this.filterAirportList - if stopfilter = true; airlinefilter = true;timefilter = true;pricefilter = true;


stopsfilter () {

        if (!nonstop && !onestop &&!twoplusstop) {
            this.filterAirportList.forEach(eachflight => {
                eachflight.stopfilter = true;
            })
        } else {
            this.filterAirportList.forEach(eachflight => {
                eachflight.stopfilter = false;
                list.OriginDestinationOptions.forEach(element => {
                    if(this.nonstop){
                        if (element.stops==0) {
                            eachflight.stopfilter = true;
                        }
                    }
                    
                    if(this.onestop){
                        if (element.stops==1) {
                            eachflight.stopfilter = true;
                        }
                    }

                    
                    if(this.twoplusstop){
                        if (element.stops>=2) {
                            eachflight.stopfilter = true;
                        }
                    }
                });
            });
        }
        
}

selectedairlinecodes = [];

airlinefilter(event,airlinecode) {


        if (select) {
            push airlinecode in selectedairlinecodes;
            sizeofselectedairlinecodes = sizeof(selectedairlinecodes);
            this.filterAirportList.forEach(eachflight => {
                if (sizeofselectedairlinecodes==1) eachflight.airlinefilter = false;
                if (eachflight.validatinairline == airlinecode) eachflight.airlinefilter = true;
            })
        } else {
            splice airlinecode from  selectedairlinecodes

            sizeofselectedairlinecodes = sizeof(selectedairlinecodes);
            this.filterAirportList.forEach(eachflight => {
                if (sizeofselectedairlinecodes==0) eachflight.airlinefilter = true;
                if (eachflight.validatinairline == airlinecode) eachflight.airlinefilter = false;
            })
        }
        

}

sort() {
    same
}