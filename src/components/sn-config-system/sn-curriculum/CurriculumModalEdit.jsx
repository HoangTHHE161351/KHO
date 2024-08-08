import { Button, Stack } from "@mui/material";
import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AppFormTextField, AppModal } from "src/components/Common";
import useUpdateCurriculum from "./hooks/useUpdateCurriculum";
import useCreateCurriculum from "./hooks/useCreateCurriculum";

const CurriculumModalEdit = ({ open, onClose, data, onSuccess }) => {
  const [initialValue, setInitialValue] = React.useState(DEFAULT_VALUE);

  const { control, handleSubmit, reset } = useForm({
    values: initialValue,
  });

  const handleUpdateCurriculum = useUpdateCurriculum();
  const handleCreateCurriculum = useCreateCurriculum();

  const handleSubmitForm = (dataSubmit) => {
    if (data) {
      handleUpdateCurriculum({
        data: { id: data.id, ...dataSubmit },
        onSuccess,
      });
    } else {
      handleCreateCurriculum({ data: dataSubmit, onSuccess });
    }
    reset(DEFAULT_VALUE);
    onClose();
  };

  useEffect(() => {
    if (data) {
      setInitialValue({
        curriculumName: data.curriculumName,
        description: data.description,
      });
    }
  }, [data]);

  return (
    <AppModal
      open={open}
      onClose={onClose}
      component={"form"}
      onSubmit={handleSubmit(handleSubmitForm)}
      modalTitleProps={{
        title: data ? "Edit Curriculum" : "Create Curriculum",
      }}
      modalActionsProps={{
        children: (
          <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="success">
              {data ? "Update" : "Create"}
            </Button>
          </Stack>
        ),
      }}
      modalContentProps={{
        content: (
          <Stack direction={"column"} spacing={1.5} px={3}>
            <AppFormTextField
              label={"Curriculum Name"}
              name={"curriculumName"}
              required
              control={control}
            />
            <AppFormTextField
              label={"Description"}
              name={"description"}
              // required
              control={control}
            />
            {/* <Box px={3} pt={1}>
              <h2>Subjects</h2>
              {subjects && subjects.length > 0 ? (
                isFetchingSubjects ? (
                  <CircularProgress />
                ) : (
                  <Box
                    sx={{
                      maxHeight: 300,
                      overflow: "auto",
                      borderRadius: "16px",
                    }}
                  >
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ typography: "subtitle2" }}>
                            Subject Name
                          </TableCell>
                          <TableCell sx={{ typography: "subtitle2" }}>
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {subjects.map((subject, index) => (
                          <TableRow key={index}>
                            <TableCell>{subject.subjectName}</TableCell>{" "}
                            <TableCell>
                              <Button variant="contained" color="primary">
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                )
              ) : (
                <p>No subjects found.</p>
              )}
            </Box> */}
          </Stack>
        ),
      }}
    />
  );
};

export default memo(CurriculumModalEdit);

const DEFAULT_VALUE = {
  curriculumName: "",
  description: "",
};
