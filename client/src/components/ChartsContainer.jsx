import { useState } from 'react';

import CSSWrapper from '../assets/wrappers/ChartsContainer';
import BarChartComponent from './BarChartComponent.jsx';
import AreaChartComponent from './AreaChartComponent.jsx';

export default function ChartsContainer ({ data }) {
  const [barChart, setBarChart] = useState(true);

  return (
    <CSSWrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(prevState=>!prevState)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
    </CSSWrapper>
  );
}