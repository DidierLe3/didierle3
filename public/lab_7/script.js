function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  // reduce function goes here
  return list;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  // pass something from convertRestaurant to categories
  return canvasJSConfigObject;
} 

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function getRandomIntInclusive(min, max) {
  min1 = Math.ceil(min);
  max1 = Math.floor(max);
  return Math.floor(Math.random() * (max1 - min1 + 1) + min1); //The maximum is inclusive and the minimum is inclusive 
}

async function loadData(){
  const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const jsonData = await data.json();
/*end loadData() */
  const arrayOfTenItems = range(10);
  const randomRestaurants = arrayOfTenItems.map((item) =>{
    const which = getRandomIntInclusive(0, json.length);
    const restautant = json[which];
    return restaurant;
});

console.table(randomRestaurants);

const div = document.createElement('div');
div.innerHTML = `<h2>What we have</h2> <br />${JSON.stringify(randomRestaurants[0])}<br /><br />`;
$('body').append(div);

//the way we want the output
const newDataShape = randomRestaurants.reduce((collection, item, i) => {
  //check category in each item
  const findCategory = collection.find((itemFound) => itemFound.label === item.category);
    if(!findCategory){
      collection.push({
        label:item.category,
        y:1
      });
    } else{
      findCategory.y += 1;
    }
    return collection;
}, []); /* the '[]' means an array will be returned*/

console.table(newDataShape);
const div2 = document.createElement('div');
const obj = {
  label = randomRestaurants[0].category,
  y: randomRestaurants.length
};

div2.innerHTML = `<h2>What we want</h2> <br /> 
                  <h4>A category, how many are in the category?</h4>
                  <pre><code class="language=javascript">
                        ${JSON.stringify(obj)}
                      </code>
                  </pre>`;

$('body').append(div2);

}

window.onload = loadData;

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const rearrangedData = convertRestaurantsToCategories(jsonFromServer);
  const choices = makeYourOptionsObject(rearrangedData);
  var chart = new CanvasGradient.Chart("chartContainer", choices);
  chart.render()
}

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



/**************************************************************
window.onload = function () {
	
  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    
    title:{
      text:"Fortune 500 Companies by Country"
    },
    axisX:{
      interval: 1
    },
    axisY2:{
      interlacedColor: "rgba(1,77,101,.2)",
      gridColor: "rgba(1,77,101,.1)",
      title: "Number of Companies"
    },
    data: [{
      type: "bar",
      name: "companies",
      axisYType: "secondary",
      color: "#014D65",
      dataPoints: [
        { y: 3, label: "Sweden" },
        { y: 7, label: "Taiwan" },
        { y: 5, label: "Russia" },
        { y: 9, label: "Spain" },
        { y: 7, label: "Brazil" },
        { y: 7, label: "India" },
        { y: 9, label: "Italy" },
        { y: 8, label: "Australia" },
        { y: 11, label: "Canada" },
        { y: 15, label: "South Korea" },
        { y: 12, label: "Netherlands" },
        { y: 15, label: "Switzerland" },
        { y: 25, label: "Britain" },
        { y: 28, label: "Germany" },
        { y: 29, label: "France" },
        { y: 52, label: "Japan" },
        { y: 103, label: "China" },
        { y: 134, label: "US" } 
      ]
    }]
  });
**************************************************************/