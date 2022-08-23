import './App.scss';
import React, {useState} from 'react';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

const KeyboardKey = ({ play, sound: { id, keyTrigger, url, keyCode }}) =>{

  const handleKeyDown = (event) => {
    if(event.keyCode === keyCode){
      play(keyTrigger, id)
    }
  }
  React.useEffect(() =>{
    document.addEventListener('keydown', handleKeyDown)
  }, [])

  return (
  <button className='drum-pad' onClick={() => play(keyTrigger, id)}>
      <audio className='clip' id={keyTrigger} src={url} />
      {keyTrigger}
    </button>
    )
}

const soundsName = {
  heaterKit: "Heater Kit",
  smoothPianoKit: "Smooth Piano Kit"
};

const soundsGroup = {
  heaterKit: bankOne,
  smoothPianoKit: bankTwo
};

const Keyboard = ({ play, sounds, power }) =>(
  <div className='keyboard'>
    {power ?
    sounds.map((sound) => <KeyboardKey play={play} sound={sound} />)
    : sounds.map((sound) => <KeyboardKey play={play} sound={{...sound, url:'#'}} />)
  }
  </div> 
)
const DrumControl = ({ name, stop, power, changeBank, volume, handleVolumeChange }) =>(
  <div className='controle'>
    <button onClick={stop}>Power: {power ? 'ON' : 'OFF'}</button>
    <h2>Volume: {Math.round(volume * 100)}%</h2>
    <input max='1' min='0' step='0.01' type='range' value={volume}
    onChange={handleVolumeChange} />
    <h2 id='display'>{name}</h2>
    <button onClick={changeBank}>Change Bank</button>
  </div>
)

function App() {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(1);
  const [soundName, setSoundName] = useState("")
  const [soundsType, setSoundsType] = useState("heaterKit");
  const [sounds, setSounds] = useState(soundsGroup[soundsType]);

  const stop = () =>{
    setPower(!power)
  }
  const handleVolumeChange = (event) => {
    setVolume(event.target.value)
  }
  const setKeyVolume = () => {
    const audios = sounds.map(sound => document.getElementById(sound.keyTrigger))
    audios.forEach(audio => {
      if (audio){
        audio.volume = volume;
      }
    })
  }
  const changeBank = () =>{
    setSoundName("")
    if(soundsType === "heaterKit"){
      setSoundsType("smoothPianoKit")
      setSounds(soundsGroup.smoothPianoKit)
    } else {
      setSoundsType("heaterKit")
      setSounds(soundsGroup.heaterKit)
    }
  }


  const play = (key, sound) =>{
    setSoundName(sound);
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play()
  }
  return (<>
   <div id='drum-machine'>
    {setKeyVolume()}
    <div className='wrapper'>
    <div className='first-menu'>
    <Keyboard className='keyboard'
    power={power}
    play={play} 
    sounds={sounds} />
    </div>
    <div className='second-menu'>
    <DrumControl 
    stop={stop}
    power={power}
    handleVolumeChange={handleVolumeChange} volume={volume}
    changeBank={changeBank} name={ soundName || soundsName[soundsType]} />
    </div>
    </div>
    </div>

    <nav className='nav-bar'>
      <div>Start</div>
    </nav>
    </>
  );
}

export default App;
