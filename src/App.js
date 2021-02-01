import React from 'react';
import Grid from '@material-ui/core/Grid';
import SubStation from './components/substation/substation';
import * as classes from './App.module.css';

const App = () => {
  return (
    <Grid container spacing={1} className={classes['parent-grid']}>
      <SubStation />
    </Grid>
  );
};

export default App;
