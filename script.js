```javascript id="s9vtm1"
const playlist =
"https://raw.githubusercontent.com/zrnet888/Zrnettv/refs/heads/main/FM19JT.m3u";

const player =
document.getElementById("player");

const AudioContextClass =
window.AudioContext || window.webkitAudioContext;

const audioContext =
new AudioContextClass();

const track =
audioContext.createMediaElementSource(player);

const gainNode =
audioContext.createGain();

track.connect(gainNode);

gainNode.connect(audioContext.destination);

document.getElementById("volume")
.addEventListener("input", function(){

    gainNode.gain.value = this.value;

});

fetch(playlist)

.then(response => response.text())

.then(text => {

    const lines = text.split("\n");

    const radioList = [];

    for(let i=0;i<lines.length;i++){

        if(lines[i].startsWith("#EXTINF")){

            const name =
            lines[i].split(",")[1];

            const url =
            lines[i+1].trim();

            if(url.startsWith("https://")){

                radioList.push({

                    name:name,
                    url:url

                });

            }

        }

    }

    const container =
    document.getElementById("radioList");

    container.innerHTML = "";

    radioList.forEach(radio => {

        const button =
        document.createElement("button");

        button.innerText =
        radio.name;

        button.onclick = async () => {

            try{

                await audioContext.resume();

                player.src = radio.url;

                player.play();

            }

            catch(err){

                alert("Radio gagal diputar");

                console.log(err);

            }

        };

        container.appendChild(button);

    });

});
```
