ymaps.ready(init);

const route = {};
const tripConfig = {};
function init() {
  (myMap = new ymaps.Map('map', {
    center: [55.75044262601144, 37.503714845703115],
    zoom: 9,
    controls: [],
  })),
  // Создадим панель маршрутизации.
  (routePanelControl = new ymaps.control.RoutePanel({
    options: {
      // Добавим заголовок панели.
      showHeader: false,
      title: 'Введите точки маршрута',
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
  // Пользователь сможет построить только dtkjcbgtlysq маршрут.
  routePanelControl.routePanel.options.set({
    types: { bicycle: true },
  });

  myMap.controls.add(routePanelControl).add(zoomControl);

  // Получим ссылку на маршрут.
  routePanelControl.routePanel.getRouteAsync().then((route) => {
    // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
    route.model.setParams({ results: 2 }, true);

    // Повесим обработчик на событие построения маршрута.
    route.model.events.add('requestsuccess', () => {
      const activeRoute = route.getActiveRoute();
      if (activeRoute) {
        // Получим протяженность маршрута.
        const length = route.getActiveRoute().properties.get('distance');
        const stateData = routePanelControl.routePanel.state._data;

        tripConfig.length = length.text;
        tripConfig.start = stateData.from;
        tripConfig.finish = stateData.to;
      }
    });
  });
}

const { createnewform } = document.forms;

createnewform.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(createnewform));
  console.log(data, 'createnewform', createnewform, 'tripConfig', tripConfig);
  const response = await fetch('/createnewform', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, ...tripConfig }),
  });

  if (response.ok) {

  }
});
