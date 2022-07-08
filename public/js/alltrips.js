const mapConfig = {
  changed: false,
  start: [60, 60],
  end: [60, 60],
  getcenter: () => [
    mapConfig.end[0] - mapConfig.end[0] + mapConfig.start[0],
    mapConfig.end[1] - mapConfig.end[1] + mapConfig.start[1],
  ],
};

let myMap;

const init = () => {
  (myMap = new ymaps.Map('map', {
    center: mapConfig.getcenter(),
    zoom: 9,
    controls: [],
  })),
  // Создадим панель маршрутизации.
  (routePanelControl = new ymaps.control.RoutePanel({
    options: {
      // Добавим заголовок панели.
      showHeader: true,
      title: 'Расчёт доставки',
    },
  })),
  (zoomControl = new ymaps.control.ZoomControl({
    options: {
      size: 'small',
      float: 'none',
      position: {
        bottom: 145,
        right: 10,
      },
    },
  }));
  // Пользователь сможет построить только автомобильный маршрут.
  routePanelControl.routePanel.options.set({
    types: { auto: true },
  });

  // Если вы хотите задать точку "откуда b relf", раскомментируйте код ниже.
  if (mapConfig.changed) {
    myMap.geoObjects.add(
      new ymaps.multiRouter.MultiRoute(
        {
          referencePoints: [mapConfig.start, mapConfig.end],
          params: {
            // Тип маршрутизации - пешеходная маршрутизация.
            routingMode: 'bicycle',
          },
        },
        {
          // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
          boundsAutoApply: true,
        },
      ),
    );
  }

  myMap.controls.add(zoomControl);

  // Получим ссылку на маршрут.
  routePanelControl.routePanel.getRouteAsync().then((route) => {
    // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
    route.model.setParams({ results: 1 }, true);

    // Повесим обработчик на событие построения маршрута.
    route.model.events.add('requestsuccess', () => {
      const activeRoute = route.getActiveRoute();
      if (activeRoute) {
        // Получим протяженность маршрута.
        const length = route.getActiveRoute().properties.get('distance');
        // Вычислим стоимость доставки.
        const price = calculate(Math.round(length.value / 1000));
        // Создадим макет содержимого балуна маршрута.
        const balloonContentLayout = ymaps.templateLayoutFactory.createClass(
          `<span>Расстояние: ${
            length.text
          }.</span><br/>`
              + `<span style="font-weight: bold; font-style: italic">Стоимость доставки: ${
                price
              } р.</span>`,
        );
        // Зададим этот макет для содержимого балуна.
        route.options.set('routeBalloonContentLayout', balloonContentLayout);
        // Откроем балун.
        activeRoute.balloon.open();
      }
    });
  });
  // Функция, вычисляющая стоимость доставки.
  function calculate(routeLength) {
    return Math.max(routeLength * DELIVERY_TARIFF, MINIMUM_COST);
  }
};

ymaps.ready(init);

document.getElementById('list').addEventListener('click', async (e) => {
  if (e.target.name == 'roteInfo') {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:3000/cycling-trips/${e.target.id}`,
    );
    if (response.ok) {
      const rout = await response.json();
      mapConfig.start = JSON.parse(rout.start);
      mapConfig.end = JSON.parse(rout.finish);
      mapConfig.changed = true;
      console.log(mapConfig);
      myMap.destroy();
      ymaps.ready(init);
    }
  }
});
