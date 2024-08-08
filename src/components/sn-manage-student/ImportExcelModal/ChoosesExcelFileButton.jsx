import { Button, Stack, Typography } from "@mui/material";
import { UploadIcon } from "src/assets/icons";
import { AppConstants } from "src/const";

const ChoosesExcelFileButton = ({
  onChangeFile,
  file,
  onUploadFile,
  ...otherProps
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center" {...otherProps}>
      <Button
        size="small"
        variant="outlined"
        component="label"
        startIcon={<UploadIcon />}
      >
        Chọn file
        <input
          style={{ fontSize: 12 }}
          type="file"
          accept={`${AppConstants.EXCEL_FILE_TYPE},${AppConstants.ACCEPT_FILE_TYPE}`}
          hidden
          onInput={onChangeFile}
        />
      </Button>
      {file && (
        <>
          <Typography>{file.name}</Typography>
          <Button size="small" variant="contained" onClick={onUploadFile}>
            Tải lên
          </Button>
        </>
      )}
    </Stack>
  );
};

export default ChoosesExcelFileButton;
