import React, { useRef, useState, useEffect } from "react";
import { Container, Box, Button, HStack } from "@chakra-ui/react";

const colors = ["#000000", "#FF0000", "#FFFF00", "#0000FF", "#FFFFFF"];

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let painting = false;

    const startPosition = (e) => {
      painting = true;
      draw(e);
    };

    const endPosition = () => {
      painting = false;
      context.beginPath();
    };

    const draw = (e) => {
      if (!painting) return;

      context.lineWidth = 5;
      context.lineCap = "round";
      context.strokeStyle = color;

      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    };

    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", startPosition);
      canvas.removeEventListener("mouseup", endPosition);
      canvas.removeEventListener("mousemove", draw);
    };
  }, [color]);

  return (
    <Container maxW="full" height="100vh" p={0} m={0}>
      <Box position="absolute" top={0} left={0} width="100%" height="100%">
        <canvas ref={canvasRef} style={{ display: "block" }} />
      </Box>
      <HStack position="absolute" top={4} left={4} spacing={2}>
        {colors.map((c) => (
          <Button
            key={c}
            bg={c}
            size="sm"
            onClick={() => setColor(c)}
            border={c === "#FFFFFF" ? "1px solid #000" : "none"}
          />
        ))}
      </HStack>
    </Container>
  );
};

export default Index;