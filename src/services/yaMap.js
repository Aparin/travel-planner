const yaMap = {
  map: {},
  ymaps: {},
  geoObjects: [],
  GeoObjectCollection: {},
  mapCenterCoord: [],
  pLine: null,

  // public method
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

  // public method
  addGeoObject(name, id) {
    try {
      const { ymaps } = this;
      const coord = this.mapCenterCoord;
      this.getAdress(coord).then((adress) => {
        ymaps.ready(() => {
          const myGeoObject = new ymaps.GeoObject(
            {
              // Описание геометрии.
              geometry: {
                type: 'Point',
                coordinates: coord,
              },
              // Свойства.
              properties: {
                // Контент метки.
                balloonContent: `Название места: ${name}<br> Адрес: ${adress}.`,
              },
            },
            {
              // Опции.
              preset: 'islands#icon',
              iconColor: '#0000ff',
              // Метку можно перемещать.
              draggable: true,
            },
          );
          this.GeoObjectCollection.add(myGeoObject);
          this.geoObjects.push({ id, myGeoObject });
          this.polyline();

          myGeoObject.events.add('drag', (e) => {
            const target = e.get('target');
            myGeoObject.geometry.setCoordinates(target.geometry.getCoordinates());
            this.polyline();
          });

          myGeoObject.events.add('dragend', (e) => {
            const target = e.get('target');
            const coordOfGeoObj = target.geometry.getCoordinates();

            this.getAdress(coordOfGeoObj).then((adrs) => {
              myGeoObject.properties.set(
                'balloonContent',
                `Название места: ${name}<br> Адрес: ${adrs}`,
              );
            });
          });
        });
      });
    } catch {
      this.onError();
    }
    return this.GeoObjectCollection;
  },

  // private method
  getAdress(coord) {
    const { ymaps } = this;
    const adress = ymaps
      .geocode(coord)
      .then(res => res.geoObjects.get(0).getAddressLine());
    return adress;
  },

  deleteGeoObject(id) {
    this.geoObjects.filter((obj, index) => {
      if (obj.id === id) {
        this.GeoObjectCollection.remove(obj.myGeoObject);
        this.geoObjects.splice(index, 1);
      }
      return undefined;
    });
    this.polyline();
  },

  polyline() {
    if (this.geoObjects.length <= 1) {
      if (this.pLine) {
        this.GeoObjectCollection.remove(this.pLine);
        this.pLine = null;
      }
      return undefined;
    }
    const coords = this.geoObjects.map(obj => obj.myGeoObject.geometry.getCoordinates());

    if (!this.pLine) {
      this.pLine = new this.ymaps.Polyline(
        coords,
        {},
        {
          strokeWidth: 3,
          strokeColor: '0000ff',
        },
      );
      this.GeoObjectCollection.add(this.pLine);
    } else this.pLine.geometry.setCoordinates(coords);

    return undefined;
  },

};

export default yaMap;
