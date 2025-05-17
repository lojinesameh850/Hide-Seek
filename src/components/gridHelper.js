import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

/**
 * Generates hideouts with random types
 * @param {number} count - Number of hideouts to generate
 * @returns {Array} - Array of hideout objects with index and type
 */
function generateHideouts(count) {
  const types = ['Easy', 'Neutral', 'Hard'];
  const hideouts = [];
  
  for (let i = 1; i <= count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    hideouts.push({ index: i, type });
  }

}

export default function generateHideoutGrid({ hideouts }) {

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: "#2A313A" }}>
            <Grid
                container
                sx={{
                    '--Grid-borderWidth': '6px',
                    borderTop: 'var(--Grid-borderWidth) solid',
                    borderLeft: 'var(--Grid-borderWidth) solid',
                    borderColor: '#3A404C',
                    borderRadius: 12,
                    overflow: 'hidden',
                    '& > div': {
                        borderRight: 'var(--Grid-borderWidth) solid',
                        borderBottom: 'var(--Grid-borderWidth) solid',
                        borderColor: '#3A404C',
                    },
                }}
            >
                {hideouts.map((location) => (
                    <Grid
                        key={location.index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: 140,
                            minWidth: 140,
                            fontFamily: 'Special Gothic Expanded One',
                            color: "#ffffff",
                        }}
                    >
                        <Typography sx={{ color: "#ffffff", fontFamily: 'Special Gothic Expanded One' }}>{`Location ${location.index }`}</Typography>
                        <Typography sx={{ color: "#ffffff", fontFamily: 'Special Gothic Expanded One' }}>{location.type}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}