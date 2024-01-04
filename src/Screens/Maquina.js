import { React , useState , useEffect }from 'react';
import styles from "./Maquina.module.css";
import { firstAudio } from './datos';

const Maquina = () => {
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [power, setPower] = useState(true);
    const [name, setName] = useState("");
    const [volume, setVolume] = useState(0.5); 
    const [letras, setLetras] = useState("");
    const [colors, setColors] = useState({border: "8px solid black"})

    const handlePower = () => {
        setPower(!power);
        setName("");
        setColors({border: "8px solid black"});
    }

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        const audio = document.getElementById(letras);
        if (audio) {
        audio.volume = newVolume;
        }
        const numeroDecimal = Math.round(volume * 100);
        setName(power ? "Volumen " + numeroDecimal : "")
    };

    

    const toggleAudio = (letra, name, color) => {
    const audio = document.getElementById(letra);
        if (audio.paused && power) {
        audio.play();
        setAudioPlaying(true);
        audio.volume = volume;
        setColors(color)
        } else {
        audio.pause();
        audio.currentTime = 0;
        setAudioPlaying(false);
        
        }
    power ? setName(name) : setName("");
    setLetras(letra);
    };


    const handleKeyPress = (event) => {
        const allowedKeys = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];
        const letraMayuscula = event.key.toUpperCase();
        const names = firstAudio.filter(x => x.letra == letraMayuscula);
        if (allowedKeys.includes(event.key) && power) {
            toggleAudio(letraMayuscula, names[0].name, names[0].color); 
        }
      };
    
      useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      });

  return (
    <div id="drum-machine" className={styles.Maquina} style={colors} >
        <div className={styles.drumContainer} >
            {firstAudio.map((x) => {
                return (
                <div onClick={() => toggleAudio(x.letra, x.name, x.color)} className={styles["drum-pad"]} key={x.id} >
                    <audio id={x.letra} src={x.link} preload='auto' ></audio>
                    {x.letra}
                </div>
                )
            })}
        </div>
        <div className={styles.controls}>
            <div className={styles.power} >
                <p>Power</p>
                <div onClick={handlePower} className={styles.powerButton} >
                    <div className={styles.interruptor} style={power ? {float: "right"} : {float: "left"}} ></div>
                </div>
            </div>
            <p id="display" className={styles.pantalla} >{name}</p>
            <div className={styles.volumen} >
                <input className={styles.input} min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} type="range" />
            </div>
        </div>
    </div>
  )
}

export default Maquina