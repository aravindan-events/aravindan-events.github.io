// getting places from APIs
function loadPlaces(position) {}

window.onload = () => {
  const button = document.querySelector('button[data-action="change"]');
  button.innerText = "﹖";

  let places = staticLoadPlaces();

  // const scene = document.querySelector("a-scene");
  // // first get current user location
  // return navigator.geolocation.getCurrentPosition(
  //   function (position) {
  //     // than use it to load from remote APIs some places nearby
  //     places.forEach((place) => {
  //       const latitude = place.location.lat;
  //       const longitude = place.location.lng;
  //       // add place name
  //       const placeText = document.createElement("a-link");
  //       placeText.setAttribute(
  //         "gps-entity-place",
  //         `latitude: ${latitude}; longitude: ${longitude};`
  //       );
  //       placeText.setAttribute("title", place.name);
  //       placeText.setAttribute("scale", "15 15 15");
  //       placeText.addEventListener("loaded", () => {
  //         window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
  //       });
  //       scene.appendChild(placeText);
  //     });
  //   },
  //   (err) => console.error("Error in retrieving position", err),
  //   {
  //     enableHighAccuracy: true,
  //     maximumAge: 0,
  //     timeout: 27000
  //   }
  // );
  renderPlaces(places);
};

renderModelFromFromCurrentLocation = () => {
  const scene = document.querySelector("a-scene");
  const userLocation = getCurrentPosition();
  let places = [userLocation];
  renderPlaces(places);
};

/*
 */

function staticLoadPlaces() {
  return [
    {
      name: "Pokèmon",
      location: {
        // lat: <your-latitude>,
        // lng: <your-longitude>,
      }
    }
  ];
}

var models = [
  {
    url: "./assets/magnemite/scene.gltf",
    scale: "0.5 0.5 0.5",
    info: "Magnemite, Lv. 5, HP 10/10",
    rotation: "0 180 0"
  },
  {
    url: "./assets/articuno/scene.gltf",
    scale: "0.2 0.2 0.2",
    rotation: "0 180 0",
    info: "Articuno, Lv. 80, HP 100/100"
  },
  {
    url: "./assets/dragonite/scene.gltf",
    scale: "0.08 0.08 0.08",
    rotation: "0 180 0",
    info: "Dragonite, Lv. 99, HP 150/150"
  }
];

var modelIndex = 0;
var setModel = function (model, entity) {
  if (model.scale) {
    entity.setAttribute("scale", model.scale);
  }

  if (model.rotation) {
    entity.setAttribute("rotation", model.rotation);
  }

  if (model.position) {
    entity.setAttribute("position", model.position);
  }

  entity.setAttribute("gltf-model", model.url);

  const div = document.querySelector(".instructions");
  div.innerText = model.info;
};

function renderPlaces(places) {
  let scene = document.querySelector("a-scene");

  places.forEach((place) => {
    let latitude = place.location.lat;
    let longitude = place.location.lng;

    let model = document.createElement("a-entity");
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );

    setModel(models[modelIndex], model);

    model.setAttribute("animation-mixer", "");

    document
      .querySelector('button[data-action="change"]')
      .addEventListener("click", function () {
        var entity = document.querySelector("[gps-entity-place]");
        modelIndex++;
        var newIndex = modelIndex % models.length;
        setModel(models[newIndex], entity);
      });

    scene.appendChild(model);
  });
}

function getCurrentPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var currentLatitude = position.coords.latitude;
        var currentLongitude = position.coords.longitude;

        // Use these coordinates with Google Maps API
        // var mapOptions = {
        //   center: new google.maps.LatLng(currentLatitude, currentLongitude),
        //   zoom: 15
        // };
        // var map = new google.maps.Map(
        //   document.getElementById("map"),
        //   mapOptions
        // );

        // new google.maps.Marker({
        //   position: new google.maps.LatLng(currentLatitude, currentLongitude),
        //   map: map,
        //   title: "Your Location"
        // });

        return {
          name: "Current Location",
          location: {
            lat: currentLatitude,
            lng: currentLongitude
          }
        };
      },
      function (error) {
        // Handle errors, e.g., user denied location access
        console.error("Error getting location: " + error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}
