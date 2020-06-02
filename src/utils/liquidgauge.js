import * as d3 from "d3";


export function renderChart(wrapper, curData) {
    if (!wrapper) {
        return
    }
    const {
        select: d3Select, scaleLinear: d3ScaleLinear,
        arc: d3Arc, area: d3Area, active: d3Active,
        interpolate: d3Interpolate, easeLinear: d3EaseLinear,
    } = d3

    const width = 300
    const height = 300
    const minValue = 0
    const maxValue = 100
    const initialWaveHeight = 0.3
    const textSize = 1
    const initialCircleThickness = 0.1
    const initialCircleFillGap = 0.2
    const waveCount = 1
    const circleColor = '#accbea'
    const textColor = '#5a98d5'
    const waveColor = '#5a98d5'
    const waveTextColor = '#ffffff'
    const textVertPosition = 0.8
    const waveRiseTime = 2000
    const waveAnimateTime = 2000
    const waveOffset = 0
    const fillPercent = Math.max(minValue, Math.min(maxValue, curData)) / maxValue
    const textRounder = (value) => String(parseFloat(value).toFixed(2))

    const svgData = d3Select(wrapper).selectAll('svg').data([curData])
    const svgEnter = svgData.enter().append('svg') // append only on enter
    const radius = Math.min(width, height) / 2
    const locationX = width / 2 - radius
    const locationY = height / 2 - radius

    svgEnter.attr('width', width)
    svgEnter.attr('height', height)

    const gEnter = svgEnter.append('g')
        .attr('transform', 'translate(' + locationX + ',' + locationY + ')')
        .attr('class', 'liquid-gauge')

    const svgMerge = svgData.merge(svgEnter)

    const waveHeightScale = d3ScaleLinear()
        .range([0, initialWaveHeight, 0])
        .domain([minValue, minValue + (maxValue - minValue) / 2, maxValue])

    const textPixels = (textSize * radius / 2)
    const startValue = 0
    const percentText = '%'
    const circleThickness = initialCircleThickness * radius
    const circleFillGap = initialCircleFillGap * radius
    const fillCircleMargin = circleThickness + circleFillGap
    const fillCircleRadius = radius - fillCircleMargin
    const waveHeight = fillCircleRadius * waveHeightScale(fillPercent * 100)

    const waveLength = fillCircleRadius * 2 / waveCount
    const waveClipCount = 1 + waveCount
    const waveClipWidth = waveLength * waveClipCount

    // Scales for drawing the outer circle.
    const gaugeCircleX = d3ScaleLinear().range([0, 2 * Math.PI]).domain([0, 1])
    const gaugeCircleY = d3ScaleLinear().range([0, radius]).domain([0, radius])

    // Scales for controlling the size of the clipping path.
    const waveScaleX = d3ScaleLinear().range([0, waveClipWidth]).domain([0, 1])
    const waveScaleY = d3ScaleLinear().range([0, waveHeight]).domain([0, 1])

    // Scales for controlling the position of the clipping path.
    const waveRiseScale = d3ScaleLinear()
        .range([(fillCircleMargin + fillCircleRadius * 2 + waveHeight), (fillCircleMargin - waveHeight)])
        .domain([0, 1])
    const waveAnimateScale = d3ScaleLinear()
        .range([0, waveClipWidth - fillCircleRadius * 2]) // Push the clip area one full wave then snap back.
        .domain([0, 1])

    // Scale for controlling the position of the text within the gauge.
    const textRiseScaleY = d3ScaleLinear()
        .range([fillCircleMargin + fillCircleRadius * 2, (fillCircleMargin + textPixels * 0.7)])
        .domain([0, 1])

    // Draw the outer circle.
    const gaugeCircleArc = d3Arc()
        .startAngle(gaugeCircleX(0))
        .endAngle(gaugeCircleX(1))
        .outerRadius(gaugeCircleY(radius))
        .innerRadius(gaugeCircleY(radius - circleThickness))

    gEnter
        .append('path')
        .attr('d', gaugeCircleArc)
        .style('fill', circleColor)
        .attr('transform', 'translate(' + radius + ',' + radius + ')')

    // Text below the wave
    gEnter
        .append('text')
        .attr('class', 'below-wave-text')
        .attr('text-anchor', 'middle')
        .attr('font-size', textPixels + 'px')
        .style('fill', textColor)
        .text(textRounder(startValue) + percentText)
        .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(textVertPosition) + ')')

    svgMerge
        .select('.below-wave-text')
        .transition()
        .duration(waveRiseTime)
        .on('start', (d, i, group) => {
            const element = group[i]
            d3Active(element).tween('text', () => {
                const textI = d3Interpolate(element.textContent, textRounder(d))
                return (t) => {
                    element.textContent = textRounder(textI(t)) + percentText
                }
            })
        })

    // The clipping wave area.
    const clipArea = d3Area()
        .x((d) => waveScaleX(d.x))
        .y0((d) => waveScaleY(Math.sin(Math.PI * 2 * waveOffset * -1 + Math.PI * 2 * (1 - waveCount) + d.y * 2 * Math.PI)))
        .y1(() => fillCircleRadius * 2 + waveHeight)

    const elementId = 'elementId'
    // Data for building the clip wave area.
    let data = []
    for (let i = 0; i <= 40 * waveClipCount; i++) {
        data.push({ x: i / (40 * waveClipCount), y: (i / (40)) })
    }

    const waveGroupXPosition = fillCircleMargin + fillCircleRadius * 2 - waveClipWidth

    const waveGroupEnter = gEnter.append('defs')
        .append('clipPath')
        .attr('id', 'clipWave' + elementId)
        .attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(startValue) + ')')
    waveGroupEnter
        .append('path')
        .attr('class', 'wave-clip-path')
        .attr('d', clipArea(data))
        .attr('T', 0)

    svgMerge
        .select('clipPath')
        .transition()
        .duration(waveRiseTime)
        .attr('transform', 'translate(' + waveGroupXPosition + ',' + waveRiseScale(fillPercent) + ')')

    // The inner circle with the clipping wave attached.
    const ggEnter = gEnter.append('g')
        .attr('clip-path', 'url(#clipWave' + elementId + ')')
    ggEnter.append('circle')
        .attr('cx', radius)
        .attr('cy', radius)
        .attr('r', fillCircleRadius)
        .style('fill', waveColor)

    // Text above the wave
    ggEnter
        .append('text')
        .attr('class', 'above-wave-text')
        .attr('text-anchor', 'middle')
        .attr('font-size', textPixels + 'px')
        .style('fill', waveTextColor)
        .text(textRounder(startValue) + percentText)
        .attr('transform', 'translate(' + radius + ',' + textRiseScaleY(textVertPosition) + ')')

    svgMerge
        .select('.above-wave-text')
        .transition()
        .duration(waveRiseTime)
        .on('start', (d, i, group) => {
            const element = group[i]
            d3Active(element).tween('text', () => {
                const textI = d3Interpolate(element.textContent, textRounder(d))
                return (t) => {
                    element.textContent = textRounder(textI(t)) + percentText
                }
            })
        })

    function animateWave() {
        if (!wrapper) {
            return
        }
        const wave = svgMerge.select('.wave-clip-path');
        const T = wave.attr('T')
        wave
            .attr('transform', 'translate(' + waveAnimateScale(T) + ',0)')
        wave.transition()
            .duration(waveAnimateTime * (1 - T))
            .ease(d3EaseLinear)
            .attr('transform', 'translate(' + waveAnimateScale(1) + ',0)')
            .attr('T', 1)
            .on('end', () => {
                wave.attr('T', 0)
                animateWave(waveAnimateTime)
            })
    }

    animateWave()
}

export function  destroyChart(wrapper) {
    const { select: d3Select } = d3
    d3Select(wrapper).selectAll('*').remove()
}
