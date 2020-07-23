import React, {useState} from 'react';
import {Text, Button, View} from 'react-native';
import PlayCMajor from './components/PlayCMajor';
import Tuner from './utils/tuner';
import CMAJOR from './constants/cmajor';

const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0.2,
  },
};

console.disableYellowBox = true;
const SoundApp: () => React$Node = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [detectedNote, setDetectedNote] = useState({});
  const [targetNote, setTargetNote] = useState(CMAJOR[0]);

  const onNoteDetected = (note) => {
    setDetectedNote(note);
    if (getNoteName() === targetNote) {
      onNoteDetectedIsCorrect();
    }
  };

  const onNoteDetectedIsCorrect = () => {
    const indexOf = CMAJOR.indexOf(targetNote);
    if (indexOf < CMAJOR.length - 1) {
      setTargetNote(CMAJOR[indexOf + 1]);
    } else {
      setTargetNote(CMAJOR[0]);
    }
  };

  const getOnOrOffByBoolean = (bool) => (bool ? 'on' : 'off');

  const toogleNoteDetector = () => {
    if (isRecording) {
      tuner.stop();
      setIsRecording(false);
      setDetectedNote({});
    } else {
      tuner.start();
      setIsRecording(true);
    }
  };

  const getNoteName = () =>
    (detectedNote.name || '') + (detectedNote.octave || '');

  const noteDetectorTitle = `Turn note detector ${getOnOrOffByBoolean(
    !isRecording,
  )}`;

  const tuner = new Tuner(onNoteDetected);

  return (
    <>
      <View>
        <PlayCMajor />
      </View>
      <Button title={noteDetectorTitle} onPress={toogleNoteDetector} />
      <Text>Note detector status: {getOnOrOffByBoolean(isRecording)}</Text>
      <Text>Note detected: {getNoteName() || 'N/A'}</Text>
      <View style={styles.row}>
        {CMAJOR.map((note) => {
          const isActive = targetNote === note;
          const noteStyle = isActive ? styles.active : styles.inactive;
          return (
            <Text key={note} style={noteStyle}>
              {note}
            </Text>
          );
        })}
      </View>
    </>
  );
};

export default SoundApp;
