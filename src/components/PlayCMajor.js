import React, {useState} from 'react';
import {Text, Button} from 'react-native';

import soundPlayer from '../utils/soundPlayer';
import CMAJOR from '../constants/cmajor';

const PlayCMajor: () => React$Node = () => {
  const [notePlaying, setNotePlaying] = useState('');

  const playSound = async (note) => {
    setNotePlaying(note);
    await soundPlayer(note);
    setNotePlaying();
  };

  const playCMajor = async () => {
    for (const currentNote of CMAJOR) {
      await playSound(currentNote);
    }
  };

  return (
    <>
      <Button title="Play C Major Scale" onPress={playCMajor} />

      <Text>Playing: {notePlaying || 'N/A'}</Text>
    </>
  );
};

export default PlayCMajor;
