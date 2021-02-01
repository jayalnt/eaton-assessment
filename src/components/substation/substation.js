import React from 'react';
import { Hero, HeroBanner, ScoreCard, InfoListItem } from '@pxblue/react-components/core';
import { Grid, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { MoreVert, ChevronRight, NotificationsActive, Notifications, Info, CloudCircle } from '@material-ui/icons';
import { Temp, Moisture as Humidity, Flow, GasCylinder } from '@pxblue/icons-mui';
import * as Colors from '@pxblue/colors';
import bannerImage from '../../assets/images/topology_40.png';
import SubStationData from '../../data/data-source.json';

const UNITS_CONFIG = {
  temperature: {
    icon: <Temp fontSize={'inherit'} htmlColor={Colors.black[500]} />,
    unit: '°F'
  },
  humidity: {
    icon: <Humidity fontSize={'inherit'} htmlColor={Colors.blue[200]} />,
    unit: '%'
  },
  flow: {
    icon: <Flow fontSize={'inherit'} htmlColor={Colors.black[100]} />,
    unit: 'KSCFF'
  },
  volume: {
    icon: <GasCylinder fontSize={'inherit'} htmlColor={Colors.black[500]} />,
    unit: ''
  }
};

const substation = () => {
  const initCapText = text => {
    if (text === null || text.length === 0) return '';
    if (text.length === 1) return text.toUpperCase();
    return text[0].toUpperCase() + text.slice(1);
  };
  /* Constructing HeroView to display temperature, humidity, volume, flow values */
  const heroBanner = subStation => {
    let heroView = [];
    for (let val in subStation.values) {
      if (subStation.values[val] != null) {
        heroView.push(
          <Hero
            key={val}
            icon={UNITS_CONFIG[val].icon ? UNITS_CONFIG[val].icon : null}
            label={initCapText(val)}
            iconSize={48}
            value={subStation.values[val]}
            units={UNITS_CONFIG[val].unit ? UNITS_CONFIG[val].unit : null}
            fontSize={'normal'}
          />
        );
      }
    }
    return heroView;
  };

  const viewLocation = () => {
    return (
      <List style={{ margin: 0 }}>
        <ListItem>
          <ListItemText primary="View Location" />
          <ListItemSecondaryAction>
            <ChevronRight />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  };
  return SubStationData
    ? SubStationData.map(subStation => {
        return (
          <Grid item key={subStation.title} xl={4} lg={4} md={6} sm={12} xs={12}>
            <ScoreCard
              headerColor={subStation.alarmCount > 0 ? Colors.red[500] : Colors.blue[500]}
              headerBackgroundImage={bannerImage}
              headerTitle={subStation.title}
              headerSubtitle={subStation.subtitle}
              headerInfo={(subStation.deviceCount || 0) + ' Devices'}
              headerFontColor={Colors.white[50]}
              actionItems={[<MoreVert onClick={() => {}} />]}
              badge={<HeroBanner style={{ minWidth: 230, minHeight: 132 }}>{heroBanner(subStation)}</HeroBanner>}
              actionRow={viewLocation()}
            >
              <List>
                {/* Alarm */}
                <InfoListItem
                  dense
                  style={{ height: 36 }}
                  fontColor={subStation.alarmCount > 0 ? Colors.red[500] : Colors.black[500]}
                  iconColor={subStation.alarmCount > 0 ? Colors.red[500] : Colors.black[500]}
                  title={subStation.alarmCount != null ? subStation.alarmCount + ' Alarm' : ''}
                  icon={
                    subStation.alarmCount != null ? (
                      subStation.alarmCount > 0 ? (
                        <NotificationsActive color={'inherit'} />
                      ) : (
                        <Notifications color={'inherit'} />
                      )
                    ) : (
                      <span></span>
                    )
                  }
                />
                {/* Event */}
                <InfoListItem
                  dense
                  style={{ height: 36 }}
                  fontColor={Colors.blue[500]}
                  iconColor={Colors.blue[500]}
                  title={subStation.eventCount != null ? subStation.eventCount + ' Event' : ''}
                  icon={subStation.eventCount != null ? <Info color={'inherit'} /> : <span></span>}
                />
                {/* Device Status : Online/Offline*/}
                <InfoListItem
                  dense
                  style={{ height: 36 }}
                  title={subStation.commStatus}
                  icon={<CloudCircle color={'inherit'} />}
                />
              </List>
            </ScoreCard>
          </Grid>
        );
      })
    : null;
};

export default substation;
