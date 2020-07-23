
import SoundPlayer from 'react-native-sound-player';
import log from './log';

const soundPlayer = (fileName: string, pauseAt: number = 0) => {  
  // var sound = new Sound(require('../sound/ring.mp3') 
  return new Promise((resolve, reject) => {
    try {
      // let sound =new SoundPlayer(fileName)
      SoundPlayer.setVolume(1.0);
      SoundPlayer.setSpeaker(true);
     
      // alert(reject)
       SoundPlayer.onFinishedPlaying((success : boolean) => {
        SoundPlayer.unmount();
        resolve();
     // alert(JSON.stringify(success))
        log('play Sound success', success);
      });
    } catch (err) {
      log('playSound error', err);
      reject(err);
    }
    
    SoundPlayer.playSoundFile(fileName, 'mp3');

  });

};

export default soundPlayer;