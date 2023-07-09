var container = document.getElementById('stars');
var chart = echarts.init(container);

var baseUrl = 'https://oss.x-lab.info/open_digger/github/';
var repoName = getUrlParam('repo', 'X-lab2017/open-digger');
var type = getUrlParam('type', 'stars');

$.getJSON(
  `${baseUrl}${repoName}/${type}.json`,
  data => {
    var accValue = [];
    const legendData = ['Monthly', 'Accumulate'];
    const legendColors = ['#80A0D6', '#F16E2D'];
    const colors = ['#80A0D6', '#F16E2D'];
    Object.keys(data).filter(k => k.length === 7).map(k => data[k]).reduce((p, c) => {
      accValue.push(p);
      return p + c;
    });
    chart.setOption({
      color: colors,
      visualMap: [
        {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 120,
          inRange: {
            color: ['#A9BEE3', '#80A0D6', '#3566BC']
          }
        },
        {
          show: false,
          type: 'continuous',
          seriesIndex: 1,
          min: 20,
          max: 330,
          inRange: {
            color: ['#F7A678', '#F16E2D', '#BE0004']
          }
        }
      ],
      title: { 
        text: `2020-2023 ${type} for ${repoName}`, 
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        },
        bottom: '5px'
      },
      legend: {
        bottom: '10px',
        data: legendData.map((item, index) => ({
          name: item,
          itemStyle: {
            color: legendColors[index]
          }
        })),
        textStyle: {
          color: '#fff'
        }
      },
      xAxis: {
        type: 'category',
        data: Object.keys(data).filter(k => k.length === 7),
        axisLabel: {
          color: '#fff'
        }
      },
      yAxis: [
        { 
          type: 'value' , 
          name: 'Monthly',
          axisLabel: {
            color: '#fff'
          },
          nameTextStyle: {
            color: '#fff'
          }
        }, 
        { 
          type: 'value',
          name: 'Accumulate',
          axisLabel: {
            color: '#fff'
          },
          nameTextStyle: {
            color: '#fff'
          }
        }
      ],
      series: [{
        type: 'line',
        name: 'Monthly',
        data: Object.keys(data).filter(k => k.length === 7).map(k => data[k]),
      }, {
        type: 'line',
        name: 'Accumulate',
        yAxisIndex: 1,
        data: accValue,
        smooth: true,
      }],
    })
  }
);