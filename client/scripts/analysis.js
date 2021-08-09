window.onload = function () {
    if(window.location.pathname.includes('analysis')){
        console.log('Chart Page');
        getData();
    }
}

let color = Chart.helpers.color;
const chartColors = {
	white: 'rgb(255, 255, 255)',
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(231,233,237)'
};

async function drawChart(id, dataSet){
    var canvas = document.getElementById(id).getContext('2d');

    var data = {
        datasets: [{
            label: dataSet.question,
            color: 'white',
            data: Object.values(dataSet.answers),
            backgroundColor: [
                color(chartColors.red).alpha(0.2).rgbString(),
                color(chartColors.orange).alpha(0.2).rgbString(),
                color(chartColors.yellow).alpha(0.2).rgbString(),
                color(chartColors.blue).alpha(0.2).rgbString(),
                color(chartColors.green).alpha(0.2).rgbString()
              ],
              borderColor: [
                chartColors.red,
                chartColors.orange,
                chartColors.yellow,
                chartColors.blue,
                chartColors.green
              ],
              borderWidth: 1
        }],
        labels: Object.keys(dataSet.answers)
    };

    let options = {
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: { 
            x: {
                ticks: {
                    precision: 0,
                    color: "white",
                },
                grid: {
                    color: 'white'
                }
            },
            y: {
                ticks: {
                    color: "white",
                }
            },
        },
        plugins: {
            legend: false,
            title: {
                display: true,
                text: dataSet.question,
                color: 'white',
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
        }
    }

    let responseChart = new Chart(canvas, {
        type: 'bar',
        data: data,
        options: options
    });
}

async function getData(){
    const url = window.location.pathname;
    const surveyId = url.substring(url.lastIndexOf("/") + 1);

    let http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
        let completeAnalysis = JSON.parse(http.response);
        let data = completeAnalysis.analysis;

        //Insert Response Count
        let chartsDiv = document.getElementById('charts');
        let div = document.createElement('div');
        let titleHeader = document.createElement('h3');
        titleHeader.innerHTML = 'Title: ' + completeAnalysis.title;
        let responseHeader = document.createElement('h4');
        responseHeader.innerHTML = 'Response Count: ' + completeAnalysis.responseCount;
        div.append(titleHeader);
        div.append(responseHeader);
        chartsDiv.append(div);

        for(let i = 0; i < data.length; i++){
            let chartId = `chartContainer-${i}`;
            let responseAnalysis = data[i];

            if(data[i].type == 'Short Answer'){
                addShortAnswers(responseAnalysis);
            }else{
                addChart(chartId, responseAnalysis);
            }
        }
        // const url = window.URL.createObjectURL(new Blob([data]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'analysis.csv');
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        }
    };

    http.send(JSON.stringify({surveyId: surveyId}));
}

function addChart(chartId, data){
    let chartsDiv = document.getElementById("charts");
    let div = document.createElement('div');
    div.className = 'container mt-3';
    div.style = 'height: 200px;';
    let newChart = document.createElement('canvas');
    newChart.id = chartId;
    div.append(newChart);
    chartsDiv.append(div);

    drawChart(chartId, data);
}

function addShortAnswers(data){
    let chartsDiv = document.getElementById('charts');
    let shortAnswersDiv = document.createElement('div');
    shortAnswersDiv.className = 'container border rounded mt-3';
    let ul = document.createElement('ul');

    let questionLabel = document.createElement('h6');
    questionLabel.innerHTML = data.question;
    shortAnswersDiv.append(questionLabel);

    if(data.answers.length == 0){
        let p = document.createElement('p');
        p.innerHTML = 'No Answers Yet'
        shortAnswersDiv.append(p);
        chartsDiv.append(shortAnswersDiv);
        return;
    }

    data.answers.forEach(answer => {
        let li = document.createElement('li');
        li.innerHTML = answer;
        ul.append(li);
    });

    shortAnswersDiv.append(ul);
    chartsDiv.append(shortAnswersDiv);
}

function generatePDF() {
    const path = window.location.pathname;
    const surveyId = path.substring(path.lastIndexOf("/") + 1);
    const url = '/survey/download/' + surveyId;

    let chartsHTML = document.documentElement.innerHTML;
    let http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            console.log('download response', http.response);
        // data = JSON.parse(http.response);

        // const url = window.URL.createObjectURL(new Blob([data]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'analysis.csv');
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        }
    };

    // http.send(chartsHTML);
    http.send(JSON.stringify({'analysis': chartsHTML}));
    // http.send();
}