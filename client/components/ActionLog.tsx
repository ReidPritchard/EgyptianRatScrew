import React from 'react';
import { Paper, Group, Title, Button, Collapse, Stack, Text } from '@mantine/core';
import { GameState, PlayerAction, PlayerActionResult } from '../types';

interface ActionLogProps {
  playerActionLog: (PlayerAction | PlayerActionResult)[];
  isActionLogExpanded: boolean;
  toggleActionLog: () => void;
  gameState: GameState;
}

export const ActionLog: React.FC<ActionLogProps> = ({
  playerActionLog,
  isActionLogExpanded,
  toggleActionLog,
  gameState,
}) => {
  const getPlayerName = (playerId: string): string => {
    return gameState.playerNames[playerId];
  };

  return (
    <Paper withBorder p="xs" mt="md">
      <Group>
        <Title order={6}>Actions</Title>
        <Button variant="subtle" onClick={toggleActionLog}>
          {isActionLogExpanded ? 'Hide' : 'Show'}
        </Button>
      </Group>
      <Collapse in={isActionLogExpanded}>
        <Stack>
          {playerActionLog
            .filter((action): action is PlayerAction => 'timestamp' in action)
            .slice(0, 10)
            .map((action, index) => {
              const playerName = getPlayerName(action.playerId);
              let message = '';
              let color = 'blue';

              switch (action.actionType) {
                case 'playCard':
                  message = `${playerName} played a card`;
                  break;
                case 'slap':
                  message = `${playerName} made a valid slap`;
                  color = 'green';
                  break;
                case 'invalidSlap':
                  message = `${playerName} made an invalid slap`;
                  color = 'red';
                  break;
              }
              return (
                <Group key={index}>
                  <Text size="xs" c="dimmed">
                    {new Date(action.timestamp).toLocaleTimeString()}
                  </Text>
                  <Text c={color} size="sm">
                    {message}
                  </Text>
                </Group>
              );
            })}
        </Stack>
      </Collapse>
    </Paper>
  );
};