import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

import InteractiveForm from './Interactive';
import SimulationForm from './Simulation';

export default function TabsVertical() {
  const [value, setValue] = React.useState(0);
  
  return (
    <Tabs
      aria-label="Vertical tabs"
      orientation="vertical"
      sx={{ minWidth: 300, height: '100vh', color: '#ffffff', padding: '0px' }}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      fontFamily='Special Gothic' 
    >
      <TabList sx={{ backgroundColor: "#2A313A" }}>
        <Tab sx={{ fontFamily: 'Special Gothic Expanded One', padding: '15px', color: "#ffffff", '&.Mui-selected': { color: '#ffffff', backgroundColor: '#3A404C' } }}>
          Interactive Mode
        </Tab>
        <Tab sx={{ fontFamily: 'Special Gothic Expanded One', padding: '15px', color: "#ffffff", '&.Mui-selected': { color: '#ffffff', backgroundColor: '#3A404C' } }}>
          Simulation Mode
        </Tab>
      </TabList>
      <TabPanel value={0} sx={{ padding: '0px' }}>
        <InteractiveForm />
      </TabPanel>
      <TabPanel value={1} sx={{ padding: '0px' }}>
        <SimulationForm />
      </TabPanel>
    </Tabs>
  );
}