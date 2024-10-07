//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//---------------------------------- VARIABLES ----------------------------------

/*
Creating 4 carousels, 2 for the Moon and 2 for Mars. 
In each case, 1 is for training and the other is for testing. 
We also include 2 pairs of buttons: one for training carousels and the other for testing carousels.
Finally, we create 4 labels to put Image counters, and in the case of testing, their seismic activities. 
*/

//For image carousel (training).
let currentImageIndex2 = 0;
let currentImageIndex3 = 0;

//For image carousel (testing).
let currentImageIndex21 = 0;
let currentImageIndex31 = 0;

//Dictionary for moon test images with their predictions.
let test_images_moon = {
                         "xa.s12.00.mhz.1971-10-26HR00_evid00133.png": "True",
                         "xa.s12.00.mhz.1974-10-02HR00_evid00572.png": "False",
                         "xa.s12.00.mhz.1972-11-19HR00_evid00335.png": "True",
                         "xa.s12.00.mhz.1970-03-14HR00_evid00018.png": "False",
                         "xa.s12.00.mhz.1974-03-14HR00_evid00506.png": "True",
                         "xa.s12.00.mhz.1971-10-06HR00_evid00125.png": "True",
                         "xa.s12.00.mhz.1973-04-23HR00_evid00399.png": "True",
                         "xa.s12.00.mhz.1971-01-03HR00_evid00057.png": "False",
                         "xa.s12.00.mhz.1971-06-11HR00_evid00096.png": "True",
                         "xa.s12.00.mhz.1972-02-28HR00_evid00192.png": "True",
                         "xa.s12.00.mhz.1970-05-24HR00_evid00028.png": "False",
                         "xa.s12.00.mhz.1969-12-16HR00_evid00006.png": "True",
                         "xa.s12.00.mhz.1970-11-03HR00_evid00050.png": "False",
                         "xa.s12.00.mhz.1971-03-15HR00_evid00073.png": "True",
                         "xa.s12.00.mhz.1974-03-30HR00_evid00512.png": "True",
                         "xa.s12.00.mhz.1975-04-21HR00_evid00638.png": "True",
                         "xa.s12.00.mhz.1971-10-06HR00_evid00124.png": "True",
                         "xa.s12.00.mhz.1970-09-09HR00_evid00043.png": "True",
                         "xa.s12.00.mhz.1975-05-16HR00_evid00651.png": "False",
                         "xa.s12.00.mhz.1972-11-14HR00_evid00331.png": "True",
                         "xa.s12.00.mhz.1971-11-24HR00_evid00156.png": "True",
                         "xa.s12.00.mhz.1970-04-03HR00_evid00021.png": "True",
                         "xa.s12.00.mhz.1970-01-09HR00_evid00007.png": "True",
                         "xa.s12.00.mhz.1974-05-09HR00_evid00522.png": "False",
                         "xa.s12.00.mhz.1970-07-20HR00_evid00037.png": "True",
                         "xa.s12.00.mhz.1972-02-21HR00_evid00190.png": "True",
                         "xa.s12.00.mhz.1971-06-27HR00_evid00101.png": "True",
                         "xa.s12.00.mhz.1972-12-15HR00_evid00349.png": "True",
                         "xa.s12.00.mhz.1973-10-03HR03_evid00461.png": "True",
                         "xa.s12.00.mhz.1972-05-15HR00_evid00223.png": "True",
                         "xa.s12.00.mhz.1970-05-25HR00_evid00029.png": "False",
                         "xa.s12.00.mhz.1970-11-03HR00_evid00051.png": "False",
                         "xa.s12.00.mhz.1972-05-19HR00_evid00228.png": "True",
                         "xa.s12.00.mhz.1973-10-10HR00_evid00463.png": "True",
                         "xa.s12.00.mhz.1970-06-19HR00_evid00031.png": "True",
                         "xa.s12.00.mhz.1970-07-18HR00_evid00036.png": "False",
                         "xa.s12.00.mhz.1975-06-15HR00_evid00660.png": "True",
                         "xa.s12.00.mhz.1977-04-26HR00_evid00924.png": "True",
                         "xa.s12.00.mhz.1977-07-19HR00_evid00991.png": "False",
                         "xa.s12.00.mhz.1975-06-17HR00_evid00662.png": "True",
                         "xa.s12.00.mhz.1977-04-11HR00_evid00915.png": "True",
                         "xa.s12.00.mhz.1973-11-22HR00_evid00475.png": "True",
                         "xa.s12.00.mhz.1972-12-06HR00_evid00342.png": "True",
                         "xa.s12.00.mhz.1974-07-25HR05_evid00553.png": "False",
                         "xa.s12.00.mhz.1970-05-23HR00_evid00027.png": "True",
                         "xa.s12.00.mhz.1970-07-27HR00_evid00039.png": "True",
                         "xa.s12.00.mhz.1970-07-17HR00_evid00035.png": "True",
                         "xa.s12.00.mhz.1973-08-08HR00_evid00437.png": "False",
                         "xa.s12.00.mhz.1971-01-17HR00_evid00060.png": "True",
                         "xa.s12.00.mhz.1977-09-13HR00_evid01012.png": "False",
                         "xa.s12.00.mhz.1971-04-08HR01_evid00083.png": "True",
                         "xa.s12.00.mhz.1971-01-05HR00_evid00059.png": "False",
                         "xa.s12.00.mhz.1973-03-12HR00_evid00384.png": "False",
                         "xa.s12.00.mhz.1974-06-30HR00_evid00543.png": "True",
                         "xa.s12.00.mhz.1972-12-02HR00_evid00341.png": "False",
                         "xa.s12.00.mhz.1975-05-20HR00_evid00652.png": "False",
                         "xa.s12.00.mhz.1970-10-26HR00_evid00049.png": "True",
                         "xa.s12.00.mhz.1972-01-26HR00_evid00186.png": "True",
                         "xa.s12.00.mhz.1970-02-07HR00_evid00014.png": "True",
                         "xa.s12.00.mhz.1970-05-20HR00_evid00026.png": "True",
                         "xa.s12.00.mhz.1977-04-24HR00_evid00923.png": "False",
                         "xa.s12.00.mhz.1971-05-22HR00_evid00092.png": "False",
                         "xa.s12.00.mhz.1970-02-18HR00_evid00016.png": "False",
                         "xa.s12.00.mhz.1970-03-30HR00_evid00020.png": "True",
                         "xa.s15.00.mhz.1973-08-10HR00_evid00126.png": "True",
                         "xa.s15.00.mhz.1973-04-04HR00_evid00098.png": "True",
                         "xa.s15.00.mhz.1974-10-19HR00_evid00157.png": "False",
                         "xa.s15.00.mhz.1973-10-27HR00_evid00134.png": "False",
                         "xa.s15.00.mhz.1974-11-17HR00_evid00162.png": "False",
                         "xa.s15.00.mhz.1974-12-15HR00_evid00170.png": "False",
                         "xa.s15.00.mhz.1975-04-12HR00_evid00190.png": "True",
                         "xa.s15.00.mhz.1974-11-21HR00_evid00166.png": "False",
                         "xa.s15.00.mhz.1974-12-15HR00_evid00169.png": "False",
                         "xa.s15.00.mhz.1975-06-22HR00_evid00194.png": "False",
                         "xa.s15.00.mhz.1974-02-06HR00_evid00497.png": "False",
                         "xa.s15.00.mhz.1974-06-16HR00_evid00536.png": "False",
                         "xa.s15.00.mhz.1975-05-20HR00_evid00653.png": "True",
                         "xa.s15.00.mhz.1974-06-30HR00_evid00542.png": "False",
                         "xa.s15.00.mhz.1974-08-04HR00_evid00557.png": "False",
                         "xa.s16.00.mhz.1972-11-08HR00_evid00080.png": "False",
                         "xa.s16.00.mhz.1972-09-10HR00_evid00075.png": "True",
                         "xa.s16.00.mhz.1972-11-06HR00_evid00079.png": "False",
                         "xa.s16.00.mhz.1972-11-14HR00_evid00081.png": "True",
                         "xa.s16.00.mhz.1973-07-31HR00_evid00123.png": "True",
                         "xa.s16.00.mhz.1974-05-19HR00_evid00146.png": "True",
                         "xa.s16.00.mhz.1974-12-12HR02_evid00168.png": "True",
                         "xa.s16.00.mhz.1974-11-11HR00_evid00160.png": "False",
                         "xa.s16.00.mhz.1974-12-15HR00_evid00172.png": "True",
                         "xa.s16.00.mhz.1974-12-25HR00_evid00174.png": "False",
                         "xa.s16.00.mhz.1975-03-26HR00_evid00186.png": "False",
                         "xa.s16.00.mhz.1975-02-19HR00_evid00180.png": "True",
                         "xa.s16.00.mhz.1977-04-17HR00_evid00249.png": "True",
                         "xa.s16.00.mhz.1977-06-02HR00_evid00255.png": "True",
                         "xa.s16.00.mhz.1973-08-25HR00_evid00443.png": "False",
                         "xa.s16.00.mhz.1974-11-14HR00_evid00587.png": "True",
                         "xa.s16.00.mhz.1973-12-18HR00_evid00487.png": "True",	 
                       };

//Dictionary for mars test images with their predictions.
let test_images_mars = {
	                 "XB.ELYSE.02.BHV.2021-05-02HR01_evid0017.png": "True",
	                 "XB.ELYSE.02.BHV.2019-07-26HR12_evid0033.png": "True",
	                 "XB.ELYSE.02.BHV.2021-10-11HR23_evid0011.png": "True",
	                 "XB.ELYSE.02.BHV.2022-04-09HR22_evid0002.png": "True",
	                 "XB.ELYSE.02.BHV.2019-07-26HR12_evid0034.png": "True",
	                 "XB.ELYSE.02.BHV.2019-05-23HR02_evid0041.png": "True",
	                 "XB.ELYSE.02.BHV.2022-05-04HR23_evid0001.png": "True",
	                 "XB.ELYSE.02.BHV.2021-12-24HR22_evid0007.png": "True",
	                 "XB.ELYSE.02.BHV.2019-09-21HR03_evid0032.png": "True"
                       };

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//---------------------------------- FUNCTIONS ----------------------------------

//Event when a tab is opened.
function openTab(tabName) {
	
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';	
		content.style.opacity = 0;
		content.style.transition = "opacity 0.999999s";

    });


    document.getElementById(tabName).style.display = 'block';

    /*
    if (tabName === 'tab2' && !chart2) {	
        createChart2();
		
  
		
    } else if (tabName === 'tab3' && !chart3) {
        createChart3();
    }
    */
   
    document.getElementById(tabName).style.opacity = 1;
	
}

//Changing image from moon training carousel. 
function changeImageCarousel2(direction) {

    const images = document.querySelectorAll('.carousel-image2');

    images[currentImageIndex2].classList.remove('active');

    currentImageIndex2 = (currentImageIndex2 + direction + images.length) % images.length;

    images[currentImageIndex2].classList.add('active');
	
    const labelElement = document.getElementById('image-label2');

    labelElement.textContent = `Image: ${currentImageIndex2 + 1}/${images.length}`;

}


//Changing image from moon testing carousel. 
function changeImageCarousel21(direction) {

    const images = document.querySelectorAll('.carousel-image21');

    var currentImage = images[currentImageIndex21].src.split("/").pop();

    var result = test_images_moon[currentImage]; 
		
    images[currentImageIndex21].classList.remove('active');

    currentImageIndex21 = (currentImageIndex21 + direction + images.length) % images.length;

    images[currentImageIndex21].classList.add('active');
	
    const labelElement = document.getElementById('image-label21');

    labelElement.textContent = `Image: ${currentImageIndex21 + 1}/${images.length}. Seismic activity detected: ${result}`;
	
}

//Changing image from mars training carousel. 
function changeImageCarousel3(direction) {

    const images = document.querySelectorAll('.carousel-image3');

    images[currentImageIndex3].classList.remove('active');

    currentImageIndex3 = (currentImageIndex3 + direction + images.length) % images.length;

    images[currentImageIndex3].classList.add('active');
	
    const labelElement = document.getElementById('image-label3');

    labelElement.textContent = `Image: ${currentImageIndex3 + 1}/${images.length}`;

}

//Changing image from mars testing carousel. 
function changeImageCarousel31(direction) {

    const images = document.querySelectorAll('.carousel-image31');

    var currentImage = images[currentImageIndex31].src.split("/").pop();

    var result = test_images_mars[currentImage]; 
	
    images[currentImageIndex31].classList.remove('active');

    currentImageIndex31 = (currentImageIndex31 + direction + images.length) % images.length;

    images[currentImageIndex31].classList.add('active');
	
    const labelElement = document.getElementById('image-label31');

    labelElement.textContent = `Image: ${currentImageIndex31 + 1}/${images.length}. Seismic activity detected: ${result}`;
	
}
