import React from "react";
import {
  Box,
  Typography,
  Link,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useGetBlogsQuery } from "../../redux/api/blogApiSlice";

const Home = () => {
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
      <Box sx={{ padding: 4 }}>
        {data?.data?.map((blog) => (
          <Card key={blog.id} sx={{ marginBottom: 4, boxShadow: 3 }}>
            {/* Blog Title */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                padding: 2,
                borderBottom: "1px solid #ddd",
              }}
            >
              {blog.blogTitle}
            </Typography>

            {/* Blog Cover Image */}
            {blog.coverImage?.url && (
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:1337${blog.coverImage.url}`}
                alt={blog.coverImage?.alternativeText || "Blog Cover"}
                sx={{ objectFit: "cover" }}
              />
            )}

            {/* Blog Content */}
            <CardContent>
              {blog.blogContent?.map((contentBlock, index) => (
                <Typography key={index} sx={{ marginBottom: 2 }}>
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
                  borderTop: "1px solid #ddd",
                }}
              >
                {blog.carouselsImage.map((carousel, index) => (
                  <Box key={index} sx={{ flexShrink: 0 }}>
                    {carousel.mime.startsWith("image/") ? (
                      <img
                        src={`http://localhost:1337${carousel.url}`}
                        alt={carousel.alternativeText || "Carousel Image"}
                        style={{
                          width: "200px",
                          height: "auto",
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    ) : carousel.mime.startsWith("video/") ? (
                      <video
                        controls
                        src={`http://localhost:1337${carousel.url}`}
                        style={{ width: "200px", borderRadius: "8px" }}
                      />
                    ) : null}
                  </Box>
                ))}
              </Box>
            )}

            {/* Author and Published Date */}
            <Box
              sx={{
                padding: 2,
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid #ddd",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="body2">
                By <strong>{blog.author}</strong>
              </Typography>
              <Typography variant="body2">
                {new Date(blog.publishedDate).toLocaleDateString()}
              </Typography>
            </Box>

            {/* PDF Link */}
            {blog.PDF?.url && (
              <Box sx={{ padding: 2, textAlign: "center" }}>
                <Link
                  href={`http://localhost:1337${blog.PDF.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    fontWeight: "bold",
                    color: "primary.main",
                  }}
                >
                  View PDF
                </Link>
              </Box>
            )}
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Home;
