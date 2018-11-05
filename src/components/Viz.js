import React, { Component } from 'react';
import { connect } from 'react-redux'
import { INIT_API_CALL } from '../store/actions';

import GoogleMapReact from 'google-map-react'
import Marker from '../components/Marker'

import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '127vh'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    marginTop: 20
  },
  dataPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    marginTop: 20,
    height: 400,
    marginLeft: 20
  },
  list: {
    overflow: 'scroll',
    maxHeight: 150,
    paddingLeft: 20
  },
  mapHolder: {
    width: '50vw',
    height: '75vh',
    'marginLeft': 'auto',
    'marginRight': 'auto'
  },
  map: {
    height: 400,
    width: 'auto',
    padding: theme.spacing.unit * 2,
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    marginTop: 20,
    marginRight: 20
  },
  ul: {
    backgroundColor: '#f7f7f7',
    padding: 0,
    color: '#fff',
    listStyle: 'none',
    overflow: 'scroll',
    maxHeight: 320
  },
  li: {
    paddingLeft: 20
  },
  dataBox: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    marginTop: 20,
    paddingTop: 20,
    marginLeft: 20,
    height: 75
  },
  currentData: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    marginTop: 20,
    marginRight: 20,
    paddingTop: 20,
    height: 75
  },
  chart: {
    padding: theme.spacing.unit * 2,
    textAlign: 'flex-start',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    marginTop: 20,
    marginRight: 20,
    height: '100%',
    paddingBottom: 70
  },
  fluff: {
    paddingTop: 40,
    paddingBottom: 40
  }
})


class App extends Component {

  render() {
    const {
      fetching,
      requestData,
      data,
      error,
      stream,
      dataDump
    } = this.props

    let center = {
      lat: 29.7604,
      lng: -95.3698
    }

    return (
      <div className={this.props.classes.root}>
        {fetching ? (<LinearProgress />) : (<p> {error}</p>)}
        <Grid container spacing={24}>
          <Grid item xs={4}>
            <Paper
            className={this.props.classes.dataPaper}>
              <Typography
                component="h4"
                variant="h6">
                Incoming Data Stream
              </Typography>
              <ul className={this.props.classes.ul}>
                {stream.map((point, i) => (
                  <li key={i}>
                    <Typography
                      color="primary"
                      className={this.props.li}
                      component="p">Lat: {point.latitude} | Lng: {point.longitude}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={this.props.classes.map}>
              <GoogleMapReact
                className={this.props.mapHolder}
                center={center}
                zoom={5}
                apiKey={'AIzaSyBB-eTXmLxdTP6AVJ_4dN0SWbkqbeWB6jc'}>
                <Marker
                  key={data.latitude}
                  lat={data.latitude}
                  lng={data.longitude}
                  text={'EOG Drone'}>
                </Marker>
              </GoogleMapReact>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={this.props.classes.dataBox}>
              <Typography component="p">
                Current Lat/Lng: {data.latitude} / {data.longitude}
              </Typography>
            </Paper>
            <Paper className={this.props.classes.dataBox}>
              <Button
                variant="contained"
                color="primary"
                onClick={requestData}>
                Request Data
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={this.props.classes.chart}>
              <ResponsiveContainer width="99%" height={400} className={this.props.classes.fluff}>
                <LineChart data={dataDump.data}>
                  {/* <XAxis dataKey="timestamp" /> */}
                  <YAxis dataKey="metric" domain={[220, 330]}/>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" name="Temp" dataKey="metric" dot={false} stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.viz.fetching,
    data: state.viz.data,
    error: state.viz.error,
    stream: state.viz.stream,
    dataDump: state.viz.dataDump
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestData: () => dispatch({ type: INIT_API_CALL }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))