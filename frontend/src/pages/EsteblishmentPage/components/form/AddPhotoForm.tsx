import { useRef, useState, type FC } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useEstablishmentStore } from '@/features/place/usePlaceStore';

interface Props {
  establishmentId: string;
}

const AddPhotoForm: FC<Props> = ({ establishmentId }) => {
  const { addImage, imageLoading } = useEstablishmentStore((state) => state);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;
    await addImage(establishmentId, file);
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: orange[900],
          marginBottom: 1.5,
        }}
      >
        Upload new photo:
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          component="label"
          sx={{
            textTransform: 'none',
            borderColor: orange[300],
            color: orange[700],
          }}
        >
          Choose file
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </Button>
        <Typography variant="body2" color="text.secondary">
          {file ? file.name : 'No file chosen'}
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={imageLoading || !file}
        sx={{
          mt: 1.5,
          backgroundColor: orange[500],
          '&:hover': { backgroundColor: orange[700] },
          textTransform: 'none',
        }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default AddPhotoForm;
