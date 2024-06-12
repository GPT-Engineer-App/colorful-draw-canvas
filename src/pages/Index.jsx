import React, { useRef, useState, useEffect } from 'react';
import { Container, Box, Button, HStack } from '@chakra-ui/react';

const colors = ['#000000', '#FF0000', '#FFFF00', '#0000FF', '#FFFFFF'];

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext('2d');
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Container maxW="full" height="100vh" p={0} m={0} centerContent>
      <Box position="absolute" top={4} left={4}>
        <HStack spacing={2}>
          {colors.map((c) => (
            <Button
              key={c}
              bg={c}
              size="lg"
              onClick={() => setColor(c)}
              border={c === '#FFFFFF' ? '1px solid #000' : 'none'}
            />
          ))}
        </HStack>
      </Box>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: '1px solid #000' }}
      />
    </Container>
  );
};

export default Index;