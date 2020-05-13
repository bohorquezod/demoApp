import SoundPlayer from 'react-native-sound-player';
import log from './log';

const soundPlayer = (fileName: string, pauseAt: number = 0) => {
  return new Promise((resolve, reject) => {
    try {
      SoundPlayer.setVolume(1);
      SoundPlayer.playSoundFile(fileName, 'mp3');
      SoundPlayer.onFinishedPlaying((success) => {
        SoundPlayer.unmount();
        resolve();
        log('playSound success', success);
      });
    } catch (err) {
      log('playSound error', err);
      reject(err);
    }
  });
};

export default soundPlayer;
