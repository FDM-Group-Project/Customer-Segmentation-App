$("document").ready(function () {
  load_charts()
})

function load_charts() {
  jsonObject = null
  best_cluster = document.getElementById('best_cluster').textContent
  $.getJSON('https://customersegmentationapp.herokuapp.com/your/webservice?cluster=' + best_cluster,
    function (data, textStatus, jqXHR) {
      build_chart(data)
    }
  )
}



//A method to set the selected action type in to the hidden input
function setActionType(obj) {
  attribute = obj.text;
  document.getElementById('selected_action').value = attribute;

  

  document.getElementById("selected_action_header").innerHTML = attribute;
}

function getBestCluster(object) {
  mydiv = document.getElementById('change')
  mydiv.className = 'vissible_div';
  build_chart()

}

function build_chart(json_objec) {

  const myJSON = JSON.stringify(json_objec['result']);

  object = JSON.parse(myJSON)
  lst = myJSON.split(',')
  console.log(lst)
  console.log(lst[1].split(':')[1])


  let no_of_customers = parseInt(lst[3].split(':')[1]);
  let frequent_buyers = parseInt(lst[0].split(':')[1]);
  let highly_prefer_installments = parseInt(lst[1].split(':')[1]);
  let highly_prefer_one_off = parseInt(lst[2].split(':')[1]);

  console.log('Obtained Values', frequent_buyers, no_of_customers,highly_prefer_installments,highly_prefer_one_off)

  let other = parseInt(frequent_buyers) - (parseInt(highly_prefer_installments) + parseInt(highly_prefer_one_off))
  
  //updating the chart data
  chart1_y_values = [no_of_customers, frequent_buyers]
  chart2_y_values = [highly_prefer_installments, highly_prefer_one_off, other]

  console.log(chart1_y_values)
  console.log(typeof (chart2_y_values))

  draw_charts(chart1_y_values,chart2_y_values)
  update_summary_cards(no_of_customers,frequent_buyers,highly_prefer_installments,highly_prefer_one_off)

}

function setBestCluster(obj) {
 
}

async function download_csv(Obj) {

  cluster0_link = "https://samplebucketfdm.s3.amazonaws.com/Cluster0.csv"
  cluster1_link = "https://samplebucketfdm.s3.amazonaws.com/Cluster1.csv"
  cluster4_link = "https://samplebucketfdm.s3.amazonaws.com/Cluster4.csv"
  cluster6_link = "https://samplebucketfdm.s3.amazonaws.com/Cluster6.csv"
  cluster7_link = "https://samplebucketfdm.s3.amazonaws.com/Cluster7.csv"

  cluster = document.getElementById('best_cluster').textContent
  
  download_link = ""

  if (cluster == '0') {
    download_link = cluster0_link
  } else if (cluster == '1') {
    download_link = cluster1_link
  } else if (cluster == '4') {
    download_link = cluster4_link
  } else if (cluster == '6') {
    download_link = cluster6_link
  } else if (cluster == '7') {
    download_link = cluster7_link
  }

  document.location.href = download_link;

}//end of method

function draw_charts(c1y, c2y) {
  //Drawing the 1st Chart 
  let chart_colours = ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"]
  let ctx4 = document.getElementById('chart_1').getContext('2d')
  let chart1 = new Chart(ctx4, {
    type: 'pie',
    data: {
      labels: ['Total', 'Frequent_Buyers'],
      datasets: [
        {
          label: "Fequent Buyers",
          backgroundColor: chart_colours,
          data: c1y
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Fequent Buyers'
      }
    }
  });


  //Drawing the 1st Chart 
  let ctx = document.getElementById('chart_2').getContext('2d')
  let chart2 = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Cash', 'Installments', 'Other'],
      datasets: [
        {
          label: "Peffered Payment_options",
          backgroundColor: chart_colours,
          data: c2y
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Peffered Payment_options'
      }
    }
  });

}

function update_summary_cards(total,freq,install,cash){

  document.getElementById('total_customers').innerHTML =""+total
  document.getElementById('frequent_buyers').innerHTML = ""+freq
  document.getElementById('installment-prefer').innerHTML = ""+install
  document.getElementById('cash-prefer').innerHTML = ""+cash

}






