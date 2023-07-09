var container = document.getElementById('attention');
var chart = echarts.init(container);

var baseUrl = 'https://oss.x-lab.info/open_digger/github/';
var repoName = getUrlParam('repo', 'X-lab2017/open-digger');
var type = getUrlParam('type', 'attention');


$.getJSON(
    `${baseUrl}${repoName}/${type}.json`,
    data => {
        var accValue = [];
        Object.keys(data).filter(k => k.length === 7).map(k => data[k]).reduce((p, c) => {
        accValue.push(p);
        return p + c;
        });
        chart.setOption({
        title: { text: `Index/metric ${type} for ${repoName}`, left: 'center' },
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
            }
        },
        legend: {
            data: ['Monthly', 'Accumulate'],
            bottom: '10px'
        },
        xAxis: {
            type: 'category',
            data: Object.keys(data).filter(k => k.length === 7),
        },
        yAxis: [{ type: 'value', name: 'Monthly'}, 
                { type: 'value', name: 'Accumulate'}],
        series: [{
            type: 'bar',
            name: 'Monthly',
            data: Object.keys(data).filter(k => k.length === 7).map(k => data[k]),
            itemStyle: {
                color: 'orange'
            }
        }, {
            type: 'line',
            name: 'Accumulate',
            yAxisIndex: 1,
            data: accValue,
            itemStyle: {
                color: 'purple'
            },
            smooth: true,
            }],
        })
    }
);
