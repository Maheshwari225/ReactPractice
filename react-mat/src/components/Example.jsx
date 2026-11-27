import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormLabel } from '@mui/material';

export default function Example() {
  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}> 
        <Typography variant="h6" gutterBottom>  
            Example Component
        </Typography>
        <FormLabel component="legend">This is an example of a Material UI component.</FormLabel>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Click Me
        </Button>
    </Box>
  );
}