displayYandexMapContainer();

ymaps.ready(init);

function displayYandexMapContainer() {
  let yandexMapContainer = document.querySelector(".contacts__yandex-map--no-js");
  if (yandexMapContainer) {
    yandexMapContainer.classList.remove("contacts__yandex-map--no-js");
  }
}

function init() {
  const center = [59.938721, 30.319957];
  const address = [59.938635, 30.323118];

  var myMap = new ymaps.Map("map", {
    center: getMapCenter(),
    controls: [],
    zoom: 17,
  });

  var placemarkIconOptions = getPlacemarkIconOptions();
  var addressPlacemark = new ymaps.Placemark(
    address,
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/map-pin.png",
      iconImageSize: placemarkIconOptions.iconImageSize,
      iconImageOffset: placemarkIconOptions.iconImageOffset,
    }
  );

  myMap.geoObjects.add(addressPlacemark);

  function getPlacemarkIconOptions() {
    const tabletWidth = 768;
    const viewportWidth = window.innerWidth;

    return window.innerWidth < tabletWidth
      ? {
          iconImageSize: [62, 53],
          iconImageOffset: [-31, -52],
        }
      : {
          iconImageSize: [124, 106],
          iconImageOffset: [-62, -100],
        };
  }

  function getMapCenter() {
    const desktopWidth = 1440;
    const viewportWidth = window.innerWidth;

    return viewportWidth < desktopWidth ? address : center;
  }
}
