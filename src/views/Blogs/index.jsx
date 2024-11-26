import React from "react";
import {
  Box,
  Typography,
  Link,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useGetBlogsQuery } from "../../redux/api/blogApiSlice";

const Blogs = () => {
  const { data, isLoading } = useGetBlogsQuery({});

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 4, maxWidth: "1200px", margin: "auto" }}>
        {data?.data?.map((blog) => (
          <Card
            key={blog.id}
            sx={{
              marginBottom: 4,
              boxShadow: 3,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {/* Blog Title */}
            <Box sx={{ backgroundColor: "#f5f5f5", padding: 2 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "primary.main" }}
              >
                {blog.blogTitle}
              </Typography>
            </Box>

            {/* Blog Cover Image */}
            {blog.coverImage?.url && (
              <CardMedia
                component="img"
                image={`http://localhost:1337${blog.coverImage.url}`}
                alt={blog.coverImage?.alternativeText || "Blog Cover"}
                sx={{
                  borderBottom: "1px solid #ddd",
                  height: "300px",
                  objectFit: "contain",
                  width: "100%",
                }}
              />
            )}

            {/* Blog Content */}
            <CardContent sx={{ padding: 3 }}>
              {blog.blogContent?.map((contentBlock, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{ marginBottom: 2, color: "text.secondary" }}
                >
                  {contentBlock.children[0]?.text}
                </Typography>
              ))}
            </CardContent>

            {/* Carousels */}
            {blog.carouselsImage?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  overflowX: "auto",
                  padding: 2,
                  backgroundColor: "#f9f9f9",
                  borderTop: "1px solid #ddd",
                }}
              >
                {blog.carouselsImage.map((carousel, index) => (
                  <Box
                    key={index}
                    sx={{
                      flexShrink: 0,
                      width: "250px",
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: 1,
                    }}
                  >
                    {carousel.mime.startsWith("image/") ? (
                      <img
                        src={`http://localhost:1337${carousel.url}`}
                        alt={carousel.alternativeText || "Carousel Image"}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    ) : carousel.mime.startsWith("video/") ? (
                      <video
                        controls
                        src={`http://localhost:1337${carousel.url}`}
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    ) : null}
                  </Box>
                ))}
              </Box>
            )}

            {/* Author and Published Date */}
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                By <strong>{blog.author}</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {new Date(blog.publishedDate).toLocaleDateString()}
              </Typography>
            </Box>

            {/* PDF Link */}
            {blog.PDF?.url && (
              <CardActions sx={{ justifyContent: "center", padding: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  href={`http://localhost:1337${blog.PDF.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View PDF
                </Button>
              </CardActions>
            )}
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Blogs;
