var container = document.getElementById('activity');
var chart = echarts.init(container);

var baseUrl = 'https://oss.x-lab.info/open_digger/github/';
var repoName = getUrlParam('repo', 'X-lab2017/open-digger');
var type = getUrlParam('type', 'activity');

$.getJSON(
  `${baseUrl}${repoName}/${type}.json`,
  data => {
    var accValue = [];
    Object.keys(data).filter(k => k.length === 7).map(k => data[k]).reduce((p, c) => {
      accValue.push(p);
      return p + c;
    });
    chart.setOption({
      visualMap: [
        {
            show: true,
            left: '3%',
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 200,
            inRange: {
                color: ['#CCFFFF', '#99CCFF', '#003399']
            }
        },
        {
            show: true,
            left: "0%",
            type: 'continuous',
            seriesIndex: 1,
            dimension: 1,
            min: 0,
            max: 1000
        }
    ],
      tooltip: {
        trigger: 'axis'
      },
      title: { text: `2020-2023 ${type} for ${repoName}`,
               left: 'center' ,
               textStyle: {
                color:'#808080'
                 }
            }, 
      xAxis: {
        type: 'category',
        data: Object.keys(data).filter(k => k.length === 7),
      },
      yAxis: [{ type: 'value' }, { type: 'value' }],
      series: [{
        type: 'bar',
        data: Object.keys(data).filter(k => k.length === 7).map(k => data[k]),
      }, {
        type: 'line',
        yAxisIndex: 1,
        data: accValue,
        smooth: true,
      }],
    })
  }
);