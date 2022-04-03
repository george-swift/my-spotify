/* eslint-disable no-new */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js/auto';
import styled from 'styled-components/macro';
import { theme } from '../../../styles';

const metrics = [
  'acousticness',
  'danceability',
  'energy',
  'instrumentalness',
  'liveness',
  'speechiness',
  'valence'
];

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;

  #chart {
    margin: 0 auto;
    margin-top: -30px;
  }
`;

const FeatureChart = ({ audioFeatures, axis }) => {
  const average = array => array.reduce((a, b) => a + b, 0) / array.length;

  useEffect(() => {
    const createDataset = features => {
      const dataset = {};
      metrics.forEach(property => {
        dataset[property] = features.length
          ? average(features.map(feature => feature && feature[property]))
          : features[property];
      });
      return dataset;
    };

    const createChart = dataset => {
      const ctx = document.getElementById('chart');
      const labels = Object.keys(dataset);
      const data = Object.values(dataset);

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: '',
              data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 159, 64, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(104, 132, 245, 0.3)',
                'rgba(153, 102, 255, 0.3)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(104, 132, 245, 1)',
                'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          layout: {
            padding: 0
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Audio Features',
              fontSize: 18,
              fontFamily: `${theme.fonts.primary}`,
              fontColor: '#fff',
              padding: 30
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              ticks: {
                fontFamily: `${theme.fonts.primary}`,
                fontSize: 12
              }
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              ticks: {
                fontFamily: `${theme.fonts.primary}`,
                fontSize: 12
              },
              beginAtZero: true
            }
          },
          indexAxis: axis
        }
      });
    };

    const parseData = () => {
      const dataset = createDataset(audioFeatures);
      createChart(dataset);
    };

    parseData();
  }, [audioFeatures, axis]);

  return (
    <Container>
      <canvas id="chart" width="400" height="400" />
    </Container>
  );
};

FeatureChart.propTypes = {
  audioFeatures: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  axis: PropTypes.string
};

FeatureChart.defaultProps = { axis: 'x' };

export default FeatureChart;
