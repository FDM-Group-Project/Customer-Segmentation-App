// Obtaining values ftom the pieChart.html
let x_values = document.getElementById('x_values').textContent;
let y_values_c0 = document.getElementById('y_values_c0').textContent;
let y_values_c1 = document.getElementById('y_values_c1').textContent;
let y_values_c2 = document.getElementById('y_values_c2').textContent;
let y_values_c3 = document.getElementById('y_values_c3').textContent;
let y_values_c4 = document.getElementById('y_values_c4').textContent;
let attribute = document.getElementById('attribute').textContent;

//let chart_type = document.getElementById('chart_type').textContent;


function chartChange(selectObj) {
  mychart0.config.type = selectObj.text;
  mychart1.config.type = selectObj.text;
  mychart2.config.type = selectObj.text;
  mychart3.config.type = selectObj.text;
  mychart4.config.type = selectObj.text;

  mychart0.update();
  mychart1.update();
  mychart2.update();
  mychart3.update();
  mychart4.update();

}

function attributeChange(obj){
  form = document.getElementById('myform')
  attribute = obj.text;
  document.getElementById('selected_attribute').value = attribute;
  form.submit();

}


console.log('Cluster 2 Y values - ', y_values_c2)

//-----------Pre - process the data (remove [,]) ------------------------
x_values = x_values.toString();
x_values = x_values.replace('[', '')
x_values = x_values.replace(']', '')

y_values_c0 = y_values_c0.toString();
y_values_c0 = y_values_c0.replace('[', '')
y_values_c0 = y_values_c0.replace(']', '')

y_values_c1 = y_values_c1.toString();
y_values_c1 = y_values_c1.replace('[', '')
y_values_c1 = y_values_c1.replace(']', '')

y_values_c2 = y_values_c2.toString();
y_values_c2 = y_values_c2.replace('[', '')
y_values_c2 = y_values_c2.replace(']', '')

y_values_c3 = y_values_c3.toString();
y_values_c3 = y_values_c3.replace('[', '')
y_values_c3 = y_values_c3.replace(']', '')

y_values_c4 = y_values_c4.toString();
y_values_c4 = y_values_c4.replace('[', '')
y_values_c4 = y_values_c4.replace(']', '')

console.log('Cluster 0 y - ', y_values_c0)
console.log('Cluster 1 y - ', y_values_c1)
console.log('Cluster 2 y - ', y_values_c2)
console.log('Cluster 3 y - ', y_values_c3)
console.log('Cluster 4 y - ', y_values_c4)

let chart_colours = ["#003f5c","#58508d","#bc5090","#ff6361","#ffa600"]
//Drawing the Chart for cluster 0
let ctx0 = document.getElementById('myChart_c0').getContext('2d')
let mychart0 = new Chart(ctx0, {
  type: 'bar',
  fill: true,
  
  data: {
    labels: x_values.split(','),
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: chart_colours,
        data: y_values_c0.split(',')
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Cluster 1 - ' + attribute
    }
  }
});

//Drawing the Chart for cluster 1
let ctx1 = document.getElementById('myChart_c1').getContext('2d')
let mychart1 = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: x_values.split(','),
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: chart_colours,
        data: y_values_c1.split(',')
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Cluster 2 - ' + attribute
    }
  }
});

//Drawing the Chart for cluster 2
let ctx2 = document.getElementById('myChart_c2').getContext('2d')
let mychart2 = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: x_values.split(','),
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: chart_colours,
        data: y_values_c2.split(',')
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Cluster 3 -' + attribute
    }
  }
});

//Drawing the Chart for cluster 3
let ctx3 = document.getElementById('myChart_c3').getContext('2d')
let mychart3 = new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: x_values.split(','),
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: chart_colours,
        data: y_values_c3.split(',')
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Cluster 4 - ' + attribute
    }
  }
});

//Drawing the Chart for cluster 4
let ctx4 = document.getElementById('myChart_c4').getContext('2d')
let mychart4 = new Chart(ctx4, {
  type: 'bar',
  data: {
    labels: x_values.split(','),
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: chart_colours,
        data: y_values_c4.split(',')
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Cluster 5 -' + attribute
    }
  }
});

