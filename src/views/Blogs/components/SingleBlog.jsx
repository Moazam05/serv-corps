import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleBlogQuery } from "../../../redux/api/blogApiSlice";
import { Box, Typography, CardMedia } from "@mui/material";

const SingleBlog = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBlogQuery(id);

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  const blog = data?.data;

  if (!blog) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h6">Blog not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, maxWidth: "800px", margin: "0 auto" }}>
      {/* Blog Title */}
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center" }}
      >
        {blog?.blogTitle}
      </Typography>

      {/* Blog Cover Image */}
      {blog?.coverImage?.url && (
        <CardMedia
          component="img"
          image={`http://localhost:1337${blog?.coverImage.url}`}
          alt={blog?.coverImage?.alternativeText || "Blog Cover"}
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            marginBottom: 4,
            maxHeight: 400,
            objectFit: "cover",
          }}
        />
      )}

      {/* Blog Content */}
      <Box sx={{ marginBottom: 4 }}>
        {blog?.blogContent?.map((contentBlock, index) => (
          <Typography key={index} variant="body1" sx={{ marginBottom: 2 }}>
            {contentBlock.children[0]?.text}
          </Typography>
        ))}
      </Box>

      {/* Carousels */}
      {blog?.carouselsImage?.length > 0 && (
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Gallery
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
            }}
          >
            {blog?.carouselsImage.map((carousel, index) => (
              <>
                {" "}
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
                    style={{
                      width: "200px",
                      height: "auto",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                ) : null}
              </>
            ))}
          </Box>
        </Box>
      )}

      {/* Author and Date */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
          padding: 2,
          borderTop: "1px solid #ddd",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="body1">
          <strong>Author:</strong> {blog?.author}
        </Typography>
        <Typography variant="body1">
          <strong>Published:</strong>{" "}
          {new Date(blog?.publishedDate).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default SingleBlog;
