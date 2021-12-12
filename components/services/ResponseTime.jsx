import {
    FlexibleWidthXYPlot,
    HorizontalGridLines,
    LineSeries,
    XAxis,
    YAxis,
    AreaSeries,
    GradientDefs,
} from 'react-vis';

import { Service, } from './index.styled'
import Text from '../typography/Text';
import Heading from '../typography/Heading';
import { useTheme } from 'styled-components';
import { IS_SERVER } from '../../constants';


const ResponseTime = ({ monitor }) => {
    const theme = useTheme()

    const calculateResponseTime = () => {
        const length = Array.from(monitor.pings).filter(a => a.status).length;
        return Array.from(monitor.pings)
            .filter(a => a.status)
            .reduce((acc, curr) => {
                return acc + (curr.duration / length);
            }, 0) * 1000
    }

    return (
        <Service>
            <Heading variant={6} className='pb-1'>Response time</Heading>
            <Text muted className='pb-2'>{calculateResponseTime().toFixed(0)}ms</Text>
            <FlexibleWidthXYPlot
                height={100}>

                <GradientDefs>
                    <linearGradient id='fade-gradient' x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={theme.colors.green} stopOpacity={0.8} />
                        <stop offset="100%" stopColor={theme.colors.green} stopOpacity={0.0} />
                    </linearGradient>
                </GradientDefs>
                <HorizontalGridLines tickTotal={2}
                    style={{
                        stroke: theme.colors.lightGray,
                    }} />
                <XAxis tickTotal={5} tickFormat={v => new Date(v).toLocaleTimeString('en', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}
                    style={{
                        line: {
                            stroke: theme.colors.lightGray,
                        }
                    }}
                />
                <YAxis tickTotal={2}
                    // tickSize={10}
                    // tickSizeOuter={0}
                    // tickSizeInner={10}
                    style={{
                        line: {
                            // stroke: theme.colors.green,
                            strokeWidth: 0
                        },
                        ticks: {
                            // stroke: theme.colors.green,
                            // strokeWidth: 5
                        },
                        text: {
                            // fill: theme.colors.green,
                            // fontSize: '0.8rem'
                        }
                    }} />
                <AreaSeries
                    color={`url(#fade-gradient)`}
                    curve={'curveMonotoneX'}
                    style={{ strokeLinejoin: "round" }}
                    data={monitor.pings.map((activity, index) => ({
                        x: parseFloat(activity.stamp) * 1000, y: activity.duration * 1000
                    }))} />
                <LineSeries
                    color={theme.colors.green}
                    style={{ strokeLinejoin: "round", background: 'transparent' }}
                    strokeWidth={2}
                    curve={'curveMonotoneX'}
                    data={monitor.pings.map((activity, index) => ({
                        x: parseFloat(activity.stamp) * 1000, y: activity.duration * 1000
                    }))} />
            </FlexibleWidthXYPlot>
        </Service>
    )
}

export default ResponseTime;