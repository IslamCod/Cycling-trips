ymaps.ready(init);

let route = {}
let tripConfig = {};
function init() {
  (myMap = new ymaps.Map("map", {
    center: [55.75044262601144, 37.503714845703115],
    zoom: 9,
    controls: [],
  })),
    // Создадим панель маршрутизации.
    (routePanelControl = new ymaps.control.RoutePanel({
      options: {
        // Добавим заголовок панели.
        showHeader: false,
        title: "Введите точки маршрута",
      },
    })),
    (zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "small",
        float: "none",
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
  routePanelControl.routePanel.getRouteAsync().then(function (route) {
    // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
    route.model.setParams({ results: 2 }, true);

    // Повесим обработчик на событие построения маршрута.
    route.model.events.add("requestsuccess", function () {
      var activeRoute = route.getActiveRoute();
      if (activeRoute) {
        // Получим протяженность маршрута.
        var length = route.getActiveRoute().properties.get("distance");
        var stateData = routePanelControl.routePanel.state._data;

        tripConfig.length = length.text;
        tripConfig.start = stateData.from;
        tripConfig.finish = stateData.to;

        // console.log(tripConfig);
        // // console.log(length);
        // console.log(stateData.to);
        // const start = tripConfig.start;
        // const { text } = length;
        // const finish = tripConfig.finish;
        // console.log(tripConfig);

        // route = {length:text, start, finish}
        console.log(tripConfig);
        

       
      }
    });
  });
}
const { createnewform } = document.forms;

// console.log(createnewform);
// console.log(tripConfig);
createnewform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(createnewform))
  console.log({...data, createnewform, tripConfig});
  const response = await fetch ('/cycling-trips/createnewform', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...data, tripConfig})
  })

  if(response.ok){
    
    

  }
});


