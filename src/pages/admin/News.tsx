import React, { useContext, useEffect } from "react";
import NewsContext from "../../context/news/CreateNewsContext";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Switch,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  MenuItem,
  Select,
  FormLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Delete, Edit } from "lucide-react";
import { newsinputfield } from "../../services/json/news.input";
import DynamicInput from "../../components/DynamicInput";
import type { NewsPayload } from "../../typescript/interface/news.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { newsSchema } from "../../services/validation/news.validation";
import CategoryContext from "../../context/category/CategoryContext";
import { toast } from "sonner";
const News = () => {
  const newscontext = useContext(NewsContext);
  if (!newscontext) {
    throw new Error("News Context Doesn't Provided");
  }
  console.log("News Context:", newscontext);

  const categoryContext = useContext(CategoryContext);
  if (!categoryContext) {
    throw new Error("Catrgory Context don't pprovided");
  }

  // console.log("Category Context", categoryContext);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<NewsPayload>({
    resolver: yupResolver(newsSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });

  useEffect(() => {
    newscontext.fetchAdminNewsList({
      page: newscontext.newsData.page,
      limit: newscontext.newsData.limit,
    });
  }, [newscontext.newsData.page, newscontext.newsData.limit]);

  useEffect(() => {
    categoryContext.fetchAdminCategorylist();
  }, []);

  const onSubmit = async (data: NewsPayload) => {
    console.log("data", data);
     const response = await newscontext.addNews(data);
     console.log("response in news page", response)
     if(response.data){
      toast.success(response.message);
    newscontext.clearPreview();
    newscontext.closeDialog();
     }else{
      toast.error(response.message)
     }
  };
  return (
    <Container
      disableGutters
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", gap: 4 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>News List </Typography>
        <Button
          variant="contained"
          onClick={() => {
            newscontext.clearPreview();
            newscontext.openDialog();
            reset();
          }}
        >
          Add
        </Button>
        <Dialog
          open={newscontext.newsData.open}
          onClose={() => {
            newscontext.clearPreview();
            newscontext.closeDialog();
            reset();
          }}
          maxWidth="md"
        >
          <DialogTitle>Add Article</DialogTitle>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <DialogContent sx={{ width: "400px" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {newsinputfield.map((int) => (
                  <DynamicInput
                    key={int.name}
                    name={int.name}
                    label={int.label}
                    type={int.type}
                    required={int.required}
                    register={register}
                    errors={errors}
                  />
                ))}
                {/* category part */}
                <Stack>
                  <FormControl error={!!errors.category}>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Category
                    </FormLabel>
                    <Controller
                      control={control}
                      name="category"
                      render={({ field }) => (
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={field.value}
                          label="Category"
                          onChange={field.onChange}
                        >
                          <MenuItem value="">
                            <em>Select Category</em>
                          </MenuItem>
                          {categoryContext?.categoryData?.adminCategory?.data?.map(
                            (cat: any) => (
                              <MenuItem key={cat._id} value={cat._id}>
                                {cat.name}
                              </MenuItem>
                            ),
                          )}
                        </Select>
                      )}
                    />
                    <FormHelperText>{errors?.category?.message}</FormHelperText>
                  </FormControl>
                </Stack>
                <Stack>
                  {newscontext.newsData.preview && (
                    <Box
                      sx={{
                        width: "150px",
                        height: "150px",
                        border: "1px dotted #ccc",
                      }}
                    >
                      <img
                        src={newscontext.newsData.preview}
                        alt="images"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  )}
                  <Button
                    variant="outlined"
                    onClick={() => document.getElementById("upload")?.click()}
                  >
                    {newscontext.newsData.preview
                      ? "Change image"
                      : "Upload image"}
                    <input
                      id="upload"
                      type="file"
                      accept="images/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target?.files?.[0] || null;
                        setValue("image", file);
                        // const imgUrl=URL.createObjectURL(file);
                        newscontext.setPreview(URL.createObjectURL(file));
                      }}
                    />
                  </Button>
                </Stack>
              </Box>
              <DialogActions>
                <Button
                  variant="outlined"
                  onClick={() => {
                    newscontext.clearPreview();
                    newscontext.closeDialog();
                    reset();
                  }}
                >
                  close
                </Button>
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </DialogActions>
            </DialogContent>
          </Box>
        </Dialog>
      </Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell>isPublished</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            {newscontext.newsData.isLoading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <TableBody>
                {newscontext?.newsData?.adminNews?.map((row, index) => (
                  <TableRow key={row._id || index}>
                    <TableCell component="th" scope="row" padding="none">
                      <img
                        src={row?.image?.url}
                        alt={row.title}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>

                    <TableCell component="th" scope="row" padding="none">
                      {row.title}
                    </TableCell>

                    <TableCell align="right">{row.category?.name}</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Switch checked={row.isPublished} onChange={()=>newscontext.statusChange({id:row._id, isPublished:row.isPublished})} />
                        <IconButton sx={{ bgcolor: "green", color: "white" }}>
                          <Edit />
                        </IconButton>
                        <IconButton sx={{ bgcolor: "red", color: "white" }}>
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            //  onClick={() => setPage(page - 1)}
            onClick={newscontext.prevPage}
          >
            {" "}
            Previous
          </Button>
          <Box>{newscontext.newsData.page} out of {newscontext.newsData.totalPages} total news: {newscontext.newsData.totalResults}</Box>
          <Button
            variant="outlined"
            // onClick={() => setPage(page + 1)}
            onClick={newscontext.nextPage}
          >
            {" "}
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default News;
