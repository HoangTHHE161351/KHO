import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { AppCheckbox } from "src/components/Common";

const FacialCard = ({ data, onSelect }) => {
  return (
    <Grid item xs={3}>
      <Card
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 2px 0px",
          mb: "4px",
        }}
      >
        <Box
          position={"relative"}
          width={"100%"}
          sx={{
            aspectRatio: "1/1",
          }}
        >
          <AppCheckbox
            onChange={() => onSelect(data.id)}
            color="success"
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          />
          <img
            src={data?.image}
            alt={data?.lastName}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "fill",
            }}
          />
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography
            color="inherit"
            underline="hover"
            variant="subtitle2"
            noWrap
          >
            {data?.lastName + " " + data?.firstName}
          </Typography>
          <Button
            variant="contained"
            color={data?.status === "DELETED" ? "error" : "success"}
          >
            <Typography textAlign={"center"} fontWeight={"500"}>
              {data?.status}
            </Typography>
          </Button>
        </Stack>
      </Card>
    </Grid>
  );
};

export default FacialCard;
