import React from 'react';
import { Router } from '@reach/router';

import TableChart from './Containers/TableChartContainer';
import PlotChart from './Containers/PlotChartContainer';

const MainRouter = () => {
  return (
    <Router primarty={true}>
      <PlotChart path="/plot" />
      <TableChart path="/table" />
      <TableChart path="/*" />
    </Router>
  );
};

export default MainRouter;
