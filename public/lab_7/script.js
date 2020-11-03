function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  const newDataShape = restaurantList.reduce((collection, item, i) => {
    const findCat = collection.find((findItem) => findItem.label === item.category);

    if (!findCat) {
      collection.push({
        label: item.category,
        y: 1
      });
    } else {
      findCat.y += 1;
    }

    return collection;
  }, []); /* the '[]' means an array will be returned*/
  return newDataShape;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  console.log(datapointsFromRestaurantsList);
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [
    "#B08BEB", "#8FAABB", "#B08BEB", "#F5A52A", "#23BFAA",
    "#FAA586", "#EB8CC6", "#3EA0DD", "#D95B25", "#AA1DF0"
  ]);
  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Restaurants By Category',
      labelFontSize: 12,
      scaleBreaks: {customBreaks: [
        {
          startValue: 40,
          endValue: 50,
          color: "green",
          type: "zigzag"
        },

        {startValue: 85,
        endValue: 100,
        color: "black",
        type: "zigzag"},

        {startValue: 140,
        endValue: 175,
        color: "orange",
        type: "zigzag"},
      
      ]}
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}
// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form) /*remember to use this for assignment 2*/
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});
