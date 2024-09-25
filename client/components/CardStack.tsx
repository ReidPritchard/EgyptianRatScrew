import { Box } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import { config } from '../config';
import { Card } from '../types';
import { PlayingCard } from './PlayingCard';

interface CardStackProps {
  pile: Card[] | null;
}

export const CardStack = forwardRef<HTMLDivElement, CardStackProps>(({ pile }, ref) => {
  if (!pile) return null;

  return (
    <Box style={{ position: 'relative', width: '60px', height: '90px' }}>
      <AnimatePresence>
        {pile.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: (index * 10) % 360,
              zIndex: index,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: config.animation.cardPlayedAnimationDuration }}
            style={{
              position: 'absolute',
              width: '60px',
              height: '90px',
            }}
          >
            <PlayingCard ref={ref} suit={card.suit} value={card.rank} faceUp={true} />
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
});

CardStack.displayName = 'CardStack';
