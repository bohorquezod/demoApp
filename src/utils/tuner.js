import PitchFinder from 'pitchfinder';
import LiveAudioStream from 'react-native-live-audio-stream';
import {Buffer} from 'buffer';

export default class Tuner {
  middleA = 440;
  semitone = 69;
  noteStrings = [
    'C',
    'C♯',
    'D',
    'D♯',
    'E',
    'F',
    'F♯',
    'G',
    'G♯',
    'A',
    'A♯',
    'B',
  ];

  options = {
    sampleRate: 44100,
    channels: 1,
    bitsPerSample: 8,
  };

  constructor(onNoteDetected) {

    this.pitchFinder = new PitchFinder.YIN({
      sampleRate: this.options.sampleRate,
    });
    this.initMic();
    this.onNoteDetected = onNoteDetected;
  }

  getNoteFromFrequency(frequency) {
    const note = this.getNote(frequency);
    return {
      name: this.noteStrings[note % 12],
      value: note,
      cents: this.getCents(frequency, note),
      octave: parseInt(note / 12, 10) - 1,
      frequency: frequency,
    };
  }

  initMic() {

    LiveAudioStream.init(this.options);
    LiveAudioStream.on('data', (data) => {
      const chunk = Buffer.from(data, 'base64');
      const frequency = this.pitchFinder(chunk);
      if (frequency && this.onNoteDetected) {
        const note = this.getNoteFromFrequency(frequency);
        this.onNoteDetected(note);
      }
    });

  }

  /**
   * Start microphone and note detector
   */
  start() {
    LiveAudioStream.start();
  }

  /**
   * Stop microphone and note detector
   */
  stop() {
    LiveAudioStream.stop();
  }

  /**
   * get musical note from frequency
   *
   * @param {number} frequency
   * @returns {number}
   */
  getNote(frequency) {

    const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2));
    return Math.round(note) + this.semitone;
  }

  /**
   * get the musical note's standard frequency
   *
   * @param note
   * @returns {number}
   */
  getStandardFrequency(note) {
    return this.middleA * Math.pow(2, (note - this.semitone) / 12);
  }

  /**
   * get cents difference between given frequency and musical note's standard frequency
   *
   * @param {float} frequency
   * @param {int} note
   * @returns {int}
   */
  getCents(frequency, note) {
    return Math.floor(
      (1200 * Math.log(frequency / this.getStandardFrequency(note))) /
        Math.log(2),
    );
  }
}
