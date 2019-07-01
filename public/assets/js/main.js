var siteHeader = document.querySelector('.site__header');
var headerHeight = 0;


var stickyHeader = function () {

  var siteWrapper = document.querySelector('.site__wrapper');
  var siteWrapperStyle = window.getComputedStyle(siteWrapper, null);
  var siteWrapperStyleRowGap = siteWrapperStyle.getPropertyValue('row-gap');
  //IE11
  var siteWrapperStyleRowGapValue = 0;
  if (siteWrapperStyleRowGap !== 'normal' && siteWrapperStyleRowGap !== '') {
    siteWrapperStyleRowGapValue = parseInt(siteWrapperStyleRowGap.match(/\d+/)[0]);
  }


  headerHeight = siteHeader.offsetHeight;
  var limitHeight = headerHeight + siteWrapperStyleRowGapValue;

  //console.log(headerHeight, siteWrapperStyleRowGapValue, limitHeight, window.pageYOffset);

  if (window.pageYOffset >= limitHeight) {
    document.querySelector('.site__wrapper').style.marginTop = (limitHeight * 2 + siteWrapperStyleRowGapValue * 2) + 'px';
    document.querySelector('body').classList.add('site__header--sticky');
  } else {
    document.querySelector('.site__wrapper').style.marginTop = '0';
    document.querySelector('body').classList.remove('site__header--sticky');
  }

};

window.onscroll = function () {
  stickyHeader();
}
window.onresize = function () {
  stickyHeader();
}

// window.addEventListener("scroll", stickyHeader());
// window.addEventListener("resize", stickyHeader());


// event click navigation
document.querySelector(".header__btn-navigation")
  .addEventListener("click", function (event) {
    //classList.add multiple args not IE11
    document.querySelector("body").classList.add('site__nav--is-visible', 'overlay--is-visible');
  });


// Popover overlay
var popover = document.querySelectorAll('.popover-overlay');
for (var i = 0; i < popover.length; i++) {
  popover[i].addEventListener('mouseenter', function (event) {
    //event.preventDefault();
    this.classList.add('popover-overlay--is-visible');
    document.querySelector("body").classList.remove('site__nav--is-visible', 'site__nav--is-active');
    document.querySelector("body").classList.add('overlay--is-visible');
  }, false);

  popover[i].addEventListener('mouseleave', function (event) {
    this.classList.remove('popover-overlay--is-visible');
    document.querySelector("body").classList.remove('overlay--is-visible');
  }, false);
}

//dropdown-menu
var dropdownMenu = document.querySelectorAll('.dropdown-menu__item');

for (var j = 0; j < dropdownMenu.length; j++) {
  dropdownMenu[j].addEventListener('mouseenter', function(event){
    this.classList.add('dropdown-menu__item--is-active');
    document.querySelector("body").classList.add('site__nav--is-active', 'overlay--is-visible');

  }, false);

  // TODO
  // only medium-up
  dropdownMenu[j].addEventListener('mouseleave', function(event){
    this.classList.remove('dropdown-menu__item--is-active');
    document.querySelector("body").classList.remove('site__nav--is-active', 'overlay--is-visible');
  }, false);
}






// Click overlay
document.querySelector('.overlay')
  .addEventListener("click", function (event) {
    //classList.add multiple args not IE11
    document.querySelector("body").classList.remove('site__nav--is-visible', 'site__nav--is-active', 'overlay--is-visible');
  }, false);

