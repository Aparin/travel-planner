const yaMap = {
  map: {},
  ymaps: {},
  geoObjects: [],
  GeoObjectCollection: {},
  mapCenterCoord: [],

  mapInit(refEl, center, onError) {
    const loadAPI = url => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.onload = resolve;
      script.onerror = reject;
      script.src = url;
      script.type = 'text/javascript';
      script.async = 'true';
      document.head.appendChild(script);
    });

    loadAPI(
      'https://api-maps.yandex.ru/2.1.72/?apikey=0299c42e-268e-4337-9740-e158b72d29fd&lang=ru_RU',
    ).then(() => {
      const { ymaps } = window;
      this.mapCenterCoord = center;
      ymaps.ready(() => {
        this.map = new ymaps.Map(refEl, { center, zoom: 11 });
        this.GeoObjectCollection = new ymaps.GeoObjectCollection();
        this.map.geoObjects.add(this.GeoObjectCollection);

        this.GeoObjectCollection.events.add(['add', 'remove'], () => {
          if (this.GeoObjectCollection.getLength() <= 0) return;

          // Установим карте центр и масштаб так, чтобы охватить коллекцию целиком.
          this.map.setBounds(this.GeoObjectCollection.getBounds(), {
            // Ассинхронно выставляем подходящий масштаб
            checkZoomRange: true,
          });
        });

        this.map.action.events.add('tick', (e) => {
          const tick = e.get('tick');
          const currentCoordOfMapCenter = this.map.options
            .get('projection')
            .fromGlobalPixels(tick.globalPixelCenter, tick.zoom);
          this.mapCenterCoord = currentCoordOfMapCenter;
        });

        this.ymaps = ymaps;
      });
    })
      .catch(() => {
        onError();
      });
    this.onError = onError;
    return undefined;
  },
};

export default yaMap;
